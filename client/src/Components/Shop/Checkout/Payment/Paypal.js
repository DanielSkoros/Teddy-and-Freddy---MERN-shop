import React, {Component} from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';


class Paypal extends Component {
    render() {
        const client = {
            sandbox:    'AfnNsJttRle-jQjn3_Z-0wqND1cX7BOPdKlJ0lQomB9m6vy2aQBj7yWALjW7eKgPw4U1yeaTEg8IBqJc',
            production: '',
        };

        const onSuccess = (payment) => {
            this.props.onSuccess(payment);
        };

        const onCancel = (data) => {
            this.props.transactionCancelled(data)
        };

        const onError = (err) => {
            this.props.transactionError(err)
        };

        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'PLN'; // or you can set this value from your props or state
        let total = this.props.toPay;
        return (
            <div>
                <PaypalExpressBtn style={{
                    size: 'medium',
                    color: 'black'
                }} env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
            </div>
        );
    }
}

export default Paypal;