import React, {Component} from 'react';
import AdminLayout from "../Layout/Layout";
import {connect} from "react-redux";
import {getOrdersList, getUsersList} from "../../../actions/Admin/adminActions";
import Loading from "../../../helpers/Loading/Loading";
import AdminBlock from "./AdminBlock/AdminBlock";
import {faDollarSign, faPlus, faTags, faUser} from "@fortawesome/free-solid-svg-icons";
import classes from "./Dashboard.module.css";
import Table from "./AdminTable/AdminTable";
import Charts from "./Charts/Charts";

class AdminDashboard extends Component {

    state = {
        loading: true,
        orders: null,
        users: null,
        usersCount: 0,
        ordersCount: 0,
        total: 0,
        revenue: null,
        ordersColumns: [
            {
                id: "_id",
                label: "Order ID",
                colSize: "80px",
                dataType: "text"
            },
            {
                id: "name",
                label: "First name",
                colSize: "50px"
            },
            {
                id: "lastName",
                label: "Last name",
                colSize: "50px",
            },
            {
                id: "createdAt",
                label: "Date",
                colSize: "100px",
                dataType: "date"
            },
            {
                id: "status",
                label: "Status",
                colSize: "80px"
            },
        ],
        userColumns: [
            {
                id: "_id",
                label: "User ID",
                colSize: "80px",
                dataType: "text"
            },
            {
                id: "name",
                label: "First name",
                colSize: "50px"
            },
            {
                id: "lastName",
                label: "Last name",
                colSize: "50px",
            },
        ]
    };

    componentDidMount() {
        this.componentMounted = true;

        const users = this.props.dispatch(getOrdersList()).then(res => {
            if(this.componentMounted){
                this.setState({
                    orders: res.payload.ordersList.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
                })
            }
        });

        const orders = this.props.dispatch(getUsersList()).then(res => {
            if(this.componentMounted){
                this.setState({
                    users: res.payload.usersList
                })
            }
        });

        Promise.all([users, orders])
            .then(() => this.setState({
                ordersCount: this.state.orders.length,
                usersCount: this.state.users.length,
                total: this.state.orders.reduce((a, b) => ({total: a.total + b.total})),
                loading: false,
            }, () => this.calculateMonthlyRevenue()))
    }

    componentWillUnmount() {
        this.componentMounted = false;
    }

    calculateMonthlyRevenue = () => {
        const { orders } = this.state;
        const result = orders.reduce((r, { createdAt, total }) => {
            const [year, month] = createdAt.split('-', 2);
            r[year] = r[year] || { total: 0 };
            r[year][month -1 ] = (r[year][month - 1] || 0) + total;
            r[year].total = null;
            return r;
        }, {});

        this.setState({
            revenue: result,
        })

    };


    render() {
        return (
            this.state.loading ? <Loading /> :
               this.props.user.userData.isAdmin ?
                   <AdminLayout>
                       <div className={classes.container}>
                           <AdminBlock description={'Users'} count={this.state.usersCount} icon={faUser} linkto={`/account/admin/users`} data={this.state.users}/>
                           <AdminBlock description={'Orders'} count={this.state.ordersCount} icon={faTags} linkto={`/account/admin/orders`} data={this.state.orders}/>
                           <AdminBlock description={'Total sales'} icon={faDollarSign} linkto={`/account/admin`} count={this.state.total.total}/>
                           <AdminBlock description={'Add product'} icon={faPlus} linkto={`/account/admin/add_product`} />
                       </div>
                       <div className={classes.chartContainer}>
                           <Charts
                               revenue={this.state.revenue}
                               labels={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                               type={'line'}
                               title={'Monthly revenue'}
                           />
                       </div>
                           <div className={classes.container}>
                               {/*<div className={classes.ordersContainer}>*/}
                               {/*    { this.state.users ?*/}
                               {/*        <Table data={this.state.users}*/}
                               {/*               columns={this.state.userColumns}*/}
                               {/*               keyColumn={"id"} prefix={'account/admin/user'}*/}
                               {/*               title={'User list'} dtKey={'users'}/> : null*/}
                               {/*    }*/}
                               {/*</div>*/}
                               <div className={classes.ordersContainer}>
                                   {
                                       this.state.orders ?
                                           <Table
                                               data={this.state.orders.slice(0, 5)}
                                               columns={this.state.ordersColumns}
                                               prefix={'account/admin/order'} keyColumn={"id"}
                                               title={"Newest orders"} dtKey={'orders'}/> : null
                                   }
                               </div>
                           </div>
                   </AdminLayout>

                   : null
        );
    }
}

export default connect()(AdminDashboard);