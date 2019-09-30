import React from 'react';

/*
Components
*/
import AdminLayout from '../../../layouts/adminLayout';
import ProductData from '../../../components/admin/product/productData';

/*
Typevars
*/
import typeVars from './typeVars';

const products: React.FC = () => {
    return (
        <AdminLayout typeVars={typeVars}>
            <ProductData />
        </AdminLayout>
    )
}

export default products;
