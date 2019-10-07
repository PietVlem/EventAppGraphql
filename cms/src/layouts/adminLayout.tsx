import React from 'react';

/*
Components
*/
import Sidebar from '../components/admin/sidebar/sidebar';
import HeaderBar from '../components/admin/header/headerBar';
import SubHeaderBar from '../components/admin/header/subHeaderBar';

interface TypeVars{
    type: String,
    buttonText: String,
    urlVar: String,
}

interface AdminLayoutProps{
    typeVars: TypeVars
}

const adminLayout: React.FC<AdminLayoutProps> = ({ typeVars, children }) => {
    return (
        <div className="admin-container">
            <Sidebar type={typeVars.type}/>
            <div className="admin-content">
                <HeaderBar />
                <SubHeaderBar urlVar={typeVars.urlVar} type={typeVars.type} buttonText={typeVars.buttonText}/>
                <div className="data-body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default adminLayout