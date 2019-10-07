import React from 'react';
import { Link } from 'react-router-dom';
import { PlusSquare } from 'react-feather';

interface SubHeaderProps {
    type: String,
    buttonText: String
    urlVar: String
}

const subHeaderBar: React.FC<SubHeaderProps> = ({ type, buttonText, urlVar }) => {
    return (
        <div className="sub-header-bar">
            <div className="grid">
                <div className="grid__item medium--one-half">
                    <h2>{type}</h2>
                </div>
                <div className="grid__item medium--one-half">
                    <Link to={`/admin/${urlVar}/create`}>
                        <button className="button button--primary">
                            <PlusSquare />
                            <span>{buttonText}</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default subHeaderBar;