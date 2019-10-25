import React from 'react';

/*
Components
*/
import AdminLayout from '../../../layouts/adminLayout';
import PostData from '../../../components/admin/posts/postDataTest';

/*
Typevars
*/
import typeVars from './typeVars';

const posts: React.FC = () => {
    return (
        <AdminLayout typeVars={typeVars}>
            <PostData/>
        </AdminLayout>
    )
}

export default posts;
