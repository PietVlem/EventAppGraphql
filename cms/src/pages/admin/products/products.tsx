import React from 'react';

/*
Components
*/
import AdminLayout from '../../../layouts/adminLayout';
import ProductsData from '../../../components/admin/products/productsData';

/*
Typevars
*/
import typeVars from './typeVars';

const products: React.FC = () => {
    return (
        <AdminLayout typeVars={typeVars}>
            <ProductsData />
        </AdminLayout>
    )
}

export default products;
