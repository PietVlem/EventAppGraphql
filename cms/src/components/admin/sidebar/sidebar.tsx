import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Calendar, Home } from 'react-feather';

interface SidebarProps {
    type: String
}

const sidebar: React.FC<SidebarProps> = ({ type }) => {
    return (
        <div className="sidebar">
            <div className="wrapper">
                <ul>
                    <Link className={type === "Producten" ? "link--highlighted" : "link"} to="/admin/products/">
                        <li>
                            <Coffee/>
                            <span>Producten</span>
                        </li>
                    </Link>
                    <Link className={type === "Evenementen" ? "link--highlighted" : "link"} to="/admin/events/">
                        <li>
                            <Calendar/>
                            <span>Evenementen</span>
                        </li>
                    </Link>
                    <Link className={type === "Locaties" ? "link--highlighted" : "link"} to="/admin/locations/">
                        <li>
                            <Home/>
                            <span>Locaties</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default sidebar
