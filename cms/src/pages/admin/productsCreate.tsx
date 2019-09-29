import React from 'react';

/*
Components
*/
import Sidebar from '../../components/admin/sidebar/sidebar';
import HeaderBar from '../../components/admin/header/headerBar';
import SubHeaderBar from '../../components/admin/header/subHeaderBar';
import ProductForm from '../../components/admin/product/productForm';

const productsCreate = () => {
    return (
        <div className="admin-container">
            {/* Sidebar */}
            <Sidebar />
            {/* Content */}
            <div className="admin-content">
                <HeaderBar />
                <SubHeaderBar />
                <div className="data-body">
                    <ProductForm />
                </div>
            </div>
        </div>
    )
}

export default productsCreate;