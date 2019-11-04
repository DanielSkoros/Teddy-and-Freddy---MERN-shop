const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const async = require('async');

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
    cloud_name: process.env.CLOUD,
    api_key: process.env.API,
    api_secret: process.env.API_SECRET,
});

//MODELS
const { User } = require('./models/User');
const { Brand } = require('./models/Brand');
const { Type } = require('./models/Type');
const { Material } = require('./models/Material');
const { Product } = require('./models/Product');
const { Order } = require('./models/Orders');


//MIDDLEWARES
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');


//=================================
//              USERS
//=================================

app.get('/api/users/auth',auth, (req, res) => {
    res.status(200).json({
        userId: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
});

app.post('/api/users/register', (req,res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if(err) return res.json({success: false});
        res.status(200).json({success: true});
    })
});

app.post('/api/users/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({loginSuccess:false,message:'Auth failed, email not found'});

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false,message:'Wrong password'});

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('w_auth',user.token).status(200).json({
                    loginSuccess: true
                })
            })
        })
    })
});

app.get('/api/users/logout', auth, (req,res) => {
    const cookie = req.cookies;
    for (let prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }
        res.cookie(prop, '', {expires: new Date(0)});
    }
    res.redirect('/');
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.body._id },
        { token: '' },
        (err, doc) => {
            if (err) return res.json({success: false, err});
            return res.status(200).send({
                success: true,
            })
        }
    )
});

app.post('/api/product/brand', auth, admin, (req, res) => {
    const brand = new Brand(req.body);

    brand.save((err, doc) => {
        if (err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            brand: doc
        })
    })
});

app.get('/api/product/brands', (req,res) => {
    Brand.find({}, (err, brands) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(brands);
    })
});

app.post('/api/product/type', auth, admin, (req,res) => {
    const type = new Type(req.body);

    type.save((err, doc) => {
        if (err) return res.json({
            success: false,
            err
        });
        res.status(200).json({
            success: true,
            type: doc
        })
    })
});

app.get('/api/product/types', (req,res) => {
   Type.find({}, (err, types) => {
       if(err) return res.status(400).send(err);
       res.status(200).send(types)
   })
});

app.get('/api/product/materials', (req,res) => {
    Material.find({}, (err, materials) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(materials)
    })
});

app.post('/api/product/material', auth, admin, (req,res) => {
    const material = new Material(req.body);

    material.save((err, doc) => {
        if (err) return res.json({
            success: false,
            err
        });
        res.status(200).json({
            success: true,
            material: doc
        })
    })
});

app.get('/api/product/articles_by_id/:id', (req, res) => {
    const id = req.params.id;
    Product.
    findById(id).
    populate('brand').
    populate('material').
    exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        return res.status(200).send(docs)
    })
});

app.get('/api/product/articles/:type',(req,res)=>{

    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let type = req.body.type ? req.body.type : '';
    Product.
    find({'type': {type}}).
    populate('material').
    populate('brand').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.send(articles)
    })
});

app.post('/api/product/shop',(req,res)=>{

    let order = req.body.order ? req.body.order : "-1";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'priceFrom' || key === 'priceTo'){
                findArgs['price'] = {
                    $gt: req.body.filters['priceFrom'] || 0,
                    $lt: req.body.filters['priceTo'] || 99999
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    findArgs['publish'] = true;
    Product.
    find(findArgs).
    populate('brand').
    populate('material').
    sort([[sortBy,order]]).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})

app.post('/api/product/article',auth,admin,(req,res)=>{
    const product = new Product(req.body);

    product.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            article: doc
        })
    })
});

app.post('/api/product/shop',(req,res)=>{

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    findArgs['publish'] = true;

    Product.
    find(findArgs).
    populate('brand').
    populate('material').
    populate('type').
    sort([[sortBy,order]]).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
});

app.post('/api/users/uploadimage',auth,admin,formidable(),(req,res)=>{
    cloudinary.uploader.upload(req.files.file.path,(result)=>{
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    },{
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    })
});

app.get('/api/users/removeimage',auth,admin,(req,res)=>{
    let image_id = req.query.public_id;

    cloudinary.uploader.destroy(image_id,(error,result)=>{
        if(error) return res.json({success:false,error});
        res.status(200).send('ok');
    })
});

app.post('/api/users/address', auth, (req,res) => {

});

app.post('/api/users/orders', auth, (req, res) => {
    const order = new Order(req.body);
    order.save((err, doc) => {
        if (err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            order: doc
        })
    })
});

app.post('/api/users/updateHistory', auth, (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        { $push:{ history:{
                    id: req.body.id,
                    date: Date.now()
                } }},
        { new: true },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            res.status(200).json(doc.history)
        }
    )
});

app.post('/api/users/addToCart',auth,(req,res)=>{

    User.findOne({_id: req.user._id},(err,doc)=>{
        let duplicate = false;

        doc.cart.forEach((item)=>{
            if(item.id == req.query.productId){
                duplicate = true;
            }
        })

        if(duplicate){
            User.findOneAndUpdate(
                {_id: req.user._id, "cart.id":mongoose.Types.ObjectId(req.query.productId)},
                { $inc: { "cart.$.quantity":1 } },
                { new:true },
                ()=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json(doc.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                {_id: req.user._id},
                { $push:{ cart:{
                            id: mongoose.Types.ObjectId(req.query.productId),
                            quantity:1,
                            date: Date.now()
                        } }},
                { new: true },
                (err,doc)=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json(doc.cart)
                }
            )
        }
    })
});


app.get('/api/users/removeFromCart',auth,(req,res)=>{

    User.findOneAndUpdate(
        {_id: req.user._id },
        { "$pull":
                { "cart": {"id":mongoose.Types.ObjectId(req.query._id)} }
        },
        { new: true },
        (err,doc)=>{
            let cart = doc.cart;
            let array = cart.map(item=>{
                return mongoose.Types.ObjectId(item.id)
            });

            Product.
            find({'_id':{ $in: array }}).
            populate('brand').
            populate('wood').
            exec((err,cartDetail)=>{
                return res.status(200).json({
                    cartDetail,
                    cart
                })
            })
        }
    );
});

app.post('/api/users/successBuy',auth,(req,res)=>{
    let history = [];
    let transactionData = {};

    // user history
    req.body.cartDetail.forEach((item)=>{
        history.push({
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID,
        })
    });

    // PAYMENTS DASH
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    };
    transactionData.data = req.body.paymentData;
    transactionData.product = history;

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push:{ history:history }, $set:{ cart:[] } },
        { new: true },
        (err,user)=>{
            if(err) return res.json({success:false,err});

            const payment = new Payment(transactionData);
            payment.save((err,doc)=>{
                if(err) return res.json({success:false,err});
                let products = [];
                doc.product.forEach(item=>{
                    products.push({id:item.id,quantity:item.quantity})
                })

                async.eachSeries(products,(item,callback)=>{
                    Product.update(
                        {_id: item.id},
                        { $inc:{
                                "sold": item.quantity
                            }},
                        {new:false},
                        callback
                    )
                },(err)=>{
                    if(err) return res.json({success:false,err});
                    res.status(200).json({
                        success:true,
                        cart: user.cart,
                        cartDetail:[]
                    })
                })
            });
        }
    )
});

app.post('/api/users/purchaseSuccess', auth, (req,res) => {
    const id = req.body.id;
    Order.findOneAndUpdate(
        {_id: id},
        {$set: {status: 'payed'}},
        (err, doc) => {
            if(err) return res.json({success:false,err});
            res.status(200).json({
                success:true,
            })
        }
        )
});


app.post('/api/users/orderInfo', auth, (req, res) => {
    Order.findById(req.body.id).
    exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        return res.status(200).json({
            success: true,
            orderInfo: docs,
        })
    })
});

app.get('/api/admin/usersCount', auth, admin, (req, res) => {
    User.count({}, (err, doc) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({
            usersCount: doc
        })
    })
});

app.get('/api/admin/ordersCount', auth, admin, (req, res) => {
    Order.count({}, (err, doc) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({
            ordersCount: doc
        })
    })
});

app.get('/api/admin/usersList', auth, admin, (req,res) => {
    User.find({}, (err, doc) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({
            usersList: doc
        })
    })
});

app.get('/api/admin/ordersList', auth, admin, (req,res) => {
    Order.find({}, (err, doc) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({
            ordersList: doc
        })
    })
});

app.post('/api/admin/getUserInfo', auth, admin, (req, res) => {
    const id = req.body.id;
    User.findById(id).
    exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        return res.status(200).send(docs)
    })
});

app.post('/api/admin/getUserOrders', auth, admin, (req,res) => {
    const id = req.body.userId;
    Order.find(
        {userId: id},
        (err, doc) => {
            if (err) return res.status(400).send(err);
            return res.status(200).send(doc);
        }

    )
});


const port = process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`Server Running at ${port}`)
});