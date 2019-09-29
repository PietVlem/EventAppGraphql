import React from 'react';
import {Link} from 'react-router-dom';

const sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="wrapper">
                <ul>
                    <Link className="link" to="/admin/products/">
                        <li>Products</li>
                    </Link>
                    <Link className="link" to="/admin/events">
                        <li>Events</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default sidebar
