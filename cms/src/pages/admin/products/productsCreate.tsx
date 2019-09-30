import React from 'react';

/*
Components
*/
import AdminLayout from '../../../layouts/adminLayout';
import ProductForm from '../../../components/admin/product/productForm';

/*
Typevars
*/
import typeVars from './typeVars';

const productsCreate: React.FC = () => {
    return (
        <AdminLayout typeVars={typeVars}>
            <ProductForm />
        </AdminLayout>
    )
}

export default productsCreate;