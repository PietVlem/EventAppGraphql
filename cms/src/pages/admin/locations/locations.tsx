import React from 'react';

/*
Components
*/
import AdminLayout from '../../../layouts/adminLayout';
import LocationsData from '../../../components/admin/locations/locationsData';

/*
Typevars
*/
import typeVars from './typeVars';

const events: React.FC = () => {
    return (
        <AdminLayout typeVars={typeVars}>
            <LocationsData />
        </AdminLayout>
    )
}

export default events;
