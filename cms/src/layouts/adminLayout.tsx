import React from 'react';

/*
Components
*/
import Sidebar from '../components/admin/sidebar/sidebar';
import HeaderBar from '../components/admin/header/headerBar';
import SubHeaderBar from '../components/admin/header/subHeaderBar';

interface TypeVars{
    type: String
}

interface AdminLayoutProps{
    typeVars: TypeVars
}

const adminLayout: React.FC<AdminLayoutProps> = ({ typeVars, children }) => {
    return (
        <div className="admin-container">
            <Sidebar />
            <div className="admin-content">
                <HeaderBar />
                <SubHeaderBar type={typeVars.type}/>
                <div className="data-body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default adminLayout