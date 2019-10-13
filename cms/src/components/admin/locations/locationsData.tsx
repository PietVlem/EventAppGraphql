import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { XSquare } from 'react-feather';


const LocationsData: React.FC = () => {


    return (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Stad</th>
                        <th>Adres</th>
                        <th>Acties</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default LocationsData
