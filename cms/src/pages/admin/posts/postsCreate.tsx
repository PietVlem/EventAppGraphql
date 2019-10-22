import React from 'react';

/*
Components
*/
import AdminLayout from '../../../layouts/adminLayout';
import PostsForm from '../../../components/admin/posts/postsFrom';

/*
Typevars
*/
import typeVars from './typeVars';

const postsCreate: React.FC = () => {
    return (
        <AdminLayout typeVars={typeVars}>
            <PostsForm />
        </AdminLayout>
    )
}

export default postsCreate;