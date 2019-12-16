import React, {Component} from 'react';
import axios from 'axios';
import Loading from "../../../../helpers/Loading/Loading";
import Table from "../../../Admin/Dashboard/AdminTable/AdminTable";
import Layout from "../../../../hoc/Layout";
import AdminLayout from "../../../Admin/Layout/Layout";
import detailsClasses from './Details.module.css';
import classes from "../../../Shop/ShoppingCart/ShoppingCart.module.css";
import {Link} from "react-router-dom";
import StyledButton from "../../../../helpers/Button/Button";
import {successBuy} from "../../../../actions/User/userActions";
class Details extends Component {

    state = {
      id: this.props.match.params.id,
      items: [],
        city: '',
        country: '',
        state: '',
        name: '',
        lastName: '',
        street: '',
        unit: '',
        zip: '',
        phone: '',
        total: 0,
        ordersColumns: [
            {
                id: "id",
                label: "Product ID",
                colSize: "80px",
                dataType: "text"
            },
            {
                id: "name",
                label: "Name",
                colSize: "50px"
            },
            {
                id: "price",
                label: "Price",
                colSize: "50px",
            },
            {
                id: "count",
                label: "Quantity",
                colSize: "100px",
            },
        ],
      loading: true,
    };

    componentDidMount() {
        const data = {
            id: this.state.id
        };
        axios.post(`/api/users/orderInfo`, data)
            .then(res => {
                const {city, country, lastName, name, phone, state, street, total, unit, zip, products} = res.data.orderInfo;
                this.setState({
                    loading: false,
                    items: products,
                    city, country, lastName, name, phone, state, street, total, unit, zip,
                }, () => console.log(this.state))
            })
    }

    changeStatus = status => {
        const data = {
            id: this.state.id,
            status
        };
        axios.post(`/api/users/purchaseSuccess`, data)
            .then(res => console.log(res))
    };

    render() {
        const {city, country, lastName, name, phone, state, street, total, unit, zip} = this.state;
        return (
            this.state.loading ? <Loading/> :
                this.props.user.userData.isAdmin ?
                    <AdminLayout>
                        <div className={detailsClasses.container}>
                            <div>
                                <Table data={this.state.items}
                                       columns={this.state.ordersColumns}
                                       keyColumn={"id"}
                                       title={"Order details"} dtKey={'orderDetails'}/>
                            </div>
                             <div className={detailsClasses.shipTo}>
                                 <div className={classes.summary}>
                                     <div className={classes.basketTotal}>
                                         <h5>Shipping informations</h5>
                                         <hr />
                                         <p>Total price: ${total}</p>
                                         <hr className={classes.lightLine}/>
                                         <p>{name}</p>
                                         <hr className={classes.lightLine}/>
                                         <p>{lastName}</p>
                                         <hr className={classes.lightLine}/>
                                         <p>{country}</p>
                                         <hr className={classes.lightLine}/>
                                         <p>{state}</p>
                                         <hr className={classes.lightLine}/>
                                         <p>{city}</p>
                                         <hr className={classes.lightLine}/>
                                         <p>{street}</p>
                                         <hr className={classes.lightLine}/>
                                         <p>{unit}</p>
                                         <hr className={classes.lightLine}/>
                                         <p>{zip}</p>
                                         <hr className={classes.lightLine}/>
                                         <p>{phone}</p>
                                         <hr className={classes.lightLine}/>
                                     </div>
                                 </div>
                                 <div className={detailsClasses.buttons}>
                                     <StyledButton content={'Mark as sent'} clicked={() => this.changeStatus('SENT')}/>
                                 </div>
                                 <div className={detailsClasses.buttons}>
                                     <StyledButton content={'Order cancelled'} clicked={() => this.changeStatus('canceled')}/>
                                 </div>
                             </div>
                        </div>
                    </AdminLayout> :
                    <Layout>
                        <div className={detailsClasses.container}>
                            <div>
                                <Table data={this.state.items}
                                       columns={this.state.ordersColumns}
                                       keyColumn={"id"}
                                       title={"Order details"} dtKey={'orderDetails'}/>
                            </div>
                            <div className={detailsClasses.shipTo}>
                                <div className={detailsClasses.summary}>
                                    <div className={classes.basketTotal}>
                                        <h5>Shipping informations</h5>
                                        <hr />
                                        <p>Total price: ${total}</p>
                                        <hr className={classes.lightLine}/>
                                        <p>{name}</p>
                                        <hr className={classes.lightLine}/>
                                        <p>{lastName}</p>
                                        <hr className={classes.lightLine}/>
                                        <p>{country}</p>
                                        <hr className={classes.lightLine}/>
                                        <p>{state}</p>
                                        <hr className={classes.lightLine}/>
                                        <p>{city}</p>
                                        <hr className={classes.lightLine}/>
                                        <p>{street}</p>
                                        <hr className={classes.lightLine}/>
                                        <p>{unit}</p>
                                        <hr className={classes.lightLine}/>
                                        <p>{zip}</p>
                                        <hr className={classes.lightLine}/>
                                        <p>{phone}</p>
                                        <hr className={classes.lightLine}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Layout>
        );
    }
}

export default Details;