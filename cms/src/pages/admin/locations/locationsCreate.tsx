import React from 'react';

/*
Components
*/
import AdminLayout from '../../../layouts/adminLayout';
import LocationsForm from '../../../components/admin/locations/locationsForm';

/*
Typevars
*/
import typeVars from './typeVars';

const productsCreate: React.FC = () => {
    return (
        <AdminLayout typeVars={typeVars}>
            <LocationsForm />
        </AdminLayout>
    )
}

export default productsCreate;