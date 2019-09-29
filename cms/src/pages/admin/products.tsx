import React from 'react';

/*
Components
*/
import Sidebar from '../../components/admin/sidebar/sidebar';
import HeaderBar from '../../components/admin/header/headerBar';
import SubHeaderBar from '../../components/admin/header/subHeaderBar';
import ProductData from '../../components/admin/product/productData';

const products: React.FC = () => {
    return (
        <div className="admin-container">
            {/* Sidebar */}
            <Sidebar />
            {/* Content */}
            <div className="admin-content">
                <HeaderBar />
                <SubHeaderBar />
                <div className="data-body">
                    <ProductData />
                </div>
            </div>
        </div>
    )
}

export default products;
