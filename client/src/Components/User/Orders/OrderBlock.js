import classes from './OrderBlock.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faCog} from "@fortawesome/free-solid-svg-icons";

import React, {Component} from 'react';
import ProductInfo from "../Dashboard/ProductInfo/ProductInfo";
import {getOrderProducts} from "../../../actions/User/userActions";
import connect from "react-redux/es/connect/connect";
import Loading from "../../../helpers/Loading/Loading";
import StyledButton from "../../../helpers/Button/Button";
import {Link} from "react-router-dom";

class OrderBlock extends Component {

    state = {
        active: false,
        loading: true,
        status: null,
        products: [],
        sum: null,
    };

    componentDidMount() {
        this.componentMounted = true;
        this.props.dispatch(getOrderProducts(this.props.id))
            .then(res => {
                    if(this.componentMounted){
                        this.setState({
                            loading: false,
                            status: res.payload.orderInfo.status,
                            products: res.payload.orderInfo.products
                        }, () => {
                            this.calculateTotalPrice(this.state.products)
                        })
                    }
                }
            )
    }

    calculateTotalPrice = (products) => {
        let sum = 0;
        if(products){
            products.forEach(item => {
                sum += item.price * item.count
            });
            this.setState({
                sum,
            })
        }
    };

    componentWillUnmount() {
        this.componentMounted = false;
    }

    toggleDropdown = (id) => {
        const active = !this.state.active;
        this.setState({
            active
        });
    };

    renderProductInfo = () => (
        this.state.products.map(product => (
            <ProductInfo name={product.name} price={product.price} quantity={product.count} key={product.id}/>
        ))
    );

    render() {
        const {id} = this.props;
        const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return (
                this.state.loading && !this.props.user.userData.isAdmin ? <Loading/> :
                    <div className={classes.orderBlock} onClick={() => this.toggleDropdown(id)}>
                        <div className={classes.top}>
                            <span>{(new Date(this.props.date)).toLocaleDateString('en-US', DATE_OPTIONS)}</span>
                            <span>{
                                this.props.order ? <span>{this.state.status}</span> : null
                            }</span>
                            {
                                this.props.user.userData.isAdmin ?
                                    <Link to={{
                                        pathname: `/account/admin/user/order/${id}`
                                    }}>
                                        <FontAwesomeIcon icon={faCog} />
                                    </Link>
                                    : null
                            }
                        </div>
                        <div className={`${this.state.active ? classes.active : classes.bottom}`}>
                            {
                                this.props.order ? this.renderProductInfo() : null
                            }
                            Total: {this.state.sum}$
                            {
                                !this.props.user.userData.isAdmin && this.state.status === 'ordered' ?
                                    <Link to={{
                                        pathname: '/user/checkout/payment',
                                        state: {
                                            id,
                                            total: this.state.sum,
                                        }
                                    }}>
                                        <StyledButton content={'Payment'} />
                                    </Link>
                                    : null
                            }

                        </div>
                    </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        order: state.user.orderInfo,
        user: state.user
    }
};

export default connect(mapStateToProps)(OrderBlock);
