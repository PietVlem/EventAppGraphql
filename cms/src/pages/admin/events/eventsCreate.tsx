import React from 'react';

/*
Components
*/
import AdminLayout from '../../../layouts/adminLayout';
import EventsForm from '../../../components/admin/events/eventsForm';

/*
Typevars
*/
import typeVars from './typeVars';

const eventsCreate: React.FC = () => {
    return (
        <AdminLayout typeVars={typeVars}>
            <EventsForm />
        </AdminLayout>
    )
}

export default eventsCreate;