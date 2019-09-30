import React from 'react';
import { PlusSquare } from 'react-feather';

interface SubHeaderProps {
    type: String
}

const subHeaderBar: React.FC<SubHeaderProps> = ({ type }) => {
    return (
        <div className="sub-header-bar">
            <div className="grid">
                <div className="grid__item medium--one-half">
                    <h2>{type}</h2>
                </div>
                <div className="grid__item medium--one-half">
                    <button className="button button--primary">
                        <PlusSquare />
                        <span>Product toevoegen</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default subHeaderBar;