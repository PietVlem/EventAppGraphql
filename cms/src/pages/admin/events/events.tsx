import React from 'react';

/*
Components
*/
import AdminLayout from '../../../layouts/adminLayout';
import EventsData from '../../../components/admin/events/eventsData';

/*
Typevars
*/
import typeVars from './typeVars';

const events: React.FC = () => {
    return (
        <AdminLayout typeVars={typeVars}>
            <EventsData />
        </AdminLayout>
    )
}

export default events;
