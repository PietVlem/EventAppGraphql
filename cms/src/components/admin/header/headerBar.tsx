import React from 'react';
import { Power } from 'react-feather';

const headerBar: React.FC = () => {
    const logout = async () => {
        console.log('logging out...')
    }
    return (
        <div className="header-bar">
            <div className="grid">
                <div className="grid__item medium--one-half left">
                    <span>Welcome, John Doe</span>
                </div>
                <div className="grid__item medium--one-half right">
                    <span onClick={logout}>
                        <Power /> Logout
                    </span>
                </div>
            </div>
        </div>
    )
}

export default headerBar;
