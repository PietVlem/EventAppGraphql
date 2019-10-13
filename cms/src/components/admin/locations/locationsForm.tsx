import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_LOCATION = gql`    
    mutation CreateLocation($name: String!, $address: String!, $zipcode: String, $city: String, $country: String) {
        createLocation(input: {name: $name, address: $address, zipcode: $zipcode, city: $city, country: $country}){
            name
        }
    }
`;

const LocationsForm: React.FC = () => {
    const [createLocationMutation, { error }] = useMutation(ADD_LOCATION);
    const [locationData, setLocationData] = useState<{ [key: string]: string }>({
        name: "",
        address: "",
        zipcode: "",
        city: "",
        country: ""
    });
    const [status, setSatus] = useState<string>('Vul de onderstaande velden in:');

    const onChangeData = (key: string, value: string) => {
        setLocationData(location => ({
            ...location,
            [key]: value
        }))
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log({
            name: locationData.name, 
            address: locationData.address,
            zipcode: locationData.zipcode,
            city: locationData.city,
            country: locationData.country
        });
        await createLocationMutation({ variables: { 
            name: locationData.name, 
            address: locationData.address,
            zipcode: locationData.zipcode,
            city: locationData.city,
            country: locationData.country
        }})
        setLocationData({
            name: "",
            address: "",
            zipcode: "",
            city: "",
            country: ""
        })
        setSatus(`${locationData.name} is toegevoegd!`);
        setTimeout(() => {
            setSatus('Vul de onderstaande velden in:')
        }, 5000);
    }

    return(
        <form onSubmit={handleSubmit}>
            {error ? <p>Oh no! {error.message}</p> : null}
            <div className="form-status">
                <span>{status}</span>
            </div>
            <div className="form-fields">
                <div className="form-group">
                    <label htmlFor="">Naam locatie</label>
                    <input 
                        type="text"
                        value={locationData.name}
                        onChange={e => onChangeData("name", e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Adres locatie</label>
                    <input 
                        type="text"
                        value={locationData.address}
                        onChange={e => onChangeData("address", e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Zipcode locatie</label>
                    <input 
                        type="text"
                        value={locationData.zipcode}
                        onChange={e => onChangeData("zipcode", e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Stad locatie</label>
                    <input 
                        type="text"
                        value={locationData.city}
                        onChange={e => onChangeData("city", e.target.value)}    
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Land locatie</label>
                    <input 
                        type="text"
                        value={locationData.country}
                        onChange={e => onChangeData("country", e.target.value)}    
                    />
                </div>
                <button className="button button--primary">
                    <span>Aanmaken</span>
                </button>
            </div>
        </form>
    )
}

export default LocationsForm
