import React from 'react';
import Header from "../../Header_footer/header/header";

const AdminLayout = (props) => {
    return (
        <div>
            <Header admin/>
            {props.children}
        </div>
    );
};

export default AdminLayout;
