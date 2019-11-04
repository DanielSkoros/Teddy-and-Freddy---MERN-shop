import React, {Component} from 'react';
import Header from "../Components/Header_footer/header/header";
import Footer from "../Components/Header_footer/footer/footer";


class Layout extends Component {
    render() {
        return (
            <>
                <Header />
                   {this.props.children}
                   {this.props.no ? null : <Footer />}

            </>
        );
    }
}

export default Layout;