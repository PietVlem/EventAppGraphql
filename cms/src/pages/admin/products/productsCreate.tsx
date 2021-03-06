import React from 'react';

/*
Components
*/
import AdminLayout from '../../../layouts/adminLayout';
import ProductsForm from '../../../components/admin/products/productsForm';

/*
Typevars
*/
import typeVars from './typeVars';

const productsCreate: React.FC = () => {
    return (
        <AdminLayout typeVars={typeVars}>
            <ProductsForm />
        </AdminLayout>
    )
}

export default productsCreate;