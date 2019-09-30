import React from 'react';
import { Power } from 'react-feather';

const headerBar: React.FC = () => {
    const logout = async () => {
        localStorage.removeItem('graphqlApp_signedIn');
    }

    return (
        <div className="header-bar">
            <div className="grid">
                <div className="grid__item medium--one-half left">
                    <span>Welcome, John Doe</span>
                </div>
                <div className="grid__item medium--one-half right">
                    <div className="logout" onClick={logout}>
                        <Power size="20" /> 
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default headerBar;
