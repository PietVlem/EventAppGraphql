import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { XSquare } from 'react-feather';

const GET_LOCATIONS = gql`
  {
    locations {
        id
        name
        address
        zipcode
        city
    }
  }
`;

const DELETE_LOCATION = gql`
    mutation DeleteLocation($id: String!){
        deleteLocation(id: $id){
            id
            name
            address
            zipcode
            city
        }
    }
`;

const LocationsData: React.FC = () => {
    const { loading, error, data } = useQuery(GET_LOCATIONS);
    const [deleteLocationMutation] = useMutation(DELETE_LOCATION);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! {error.message}</p>;

    const deleteItem = async (locationId: String) => {
        await deleteLocationMutation({ variables: { id: locationId } });
        window.location.reload();
    }

    return (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Adres</th>
                        <th>Acties</th>
                    </tr>
                </thead>
                <tbody>
                    {data.locations.map((location: any) => (
                        <tr key={location.id}>
                            <td>{location.name}</td>
                            <td>{`${location.address}, ${location.zipcode} ${location.city}`}</td>
                            <td>
                                <XSquare className="pointer" onClick={()=>deleteItem(location.id)}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default LocationsData
