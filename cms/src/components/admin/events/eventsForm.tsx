import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';

/* Components */
import ReactDropzone from '../../utils/reactDropzone';

/* Functions */
import uplaodImage from '../../../functions/uploadImage';

const GET_LOCATIONS = gql`
    {
        locations{
            id
            name
        }
    }
`;

const ADD_EVENT = gql`
    mutation CreateEvent($name: String!, $date: String!, $start: String, $end: String, $facebook: String, $details: String, $locationId: String, $image: String) {
        createEvent(input: {name: $name, date: $date, start: $start, end: $end, facebook: $facebook, details: $details, locationId: $locationId, image: $image}){
            name
        }
    }
`;

const EventsForm: React.FC = () => {
    const [status, setSatus] = useState<string>('Vul de onderstaande velden in:');
    const [ImageFiles, setImageFiles] = useState<Array<File>>([]);
    const [eventData, setEventData] = useState<{ [key: string]: string }>({
        name: "",
        date: "",
        start: "",
        end: "",
        facebook: "",
        details: "",
        locationid: "",
    });
    const { data } = useQuery(GET_LOCATIONS);
    const [createEventMutation, { error }] = useMutation(ADD_EVENT);

    const onChangeData = (key: string, value: string) => {
        setEventData(event => ({
            ...event,
            [key]: value
        }))
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setSatus('Saving data to database...');
        uplaodImage(ImageFiles, "EventImages", setSatus).then(async (imageUrl) => {
            if (imageUrl !== null)
            await createEventMutation({ variables: { 
                name: eventData.name,
                date: eventData.date,
                start: eventData.start,
                end: eventData.end,
                facebook: eventData.facebook,
                details: eventData.details,
                locationId: "zpfvOR8nYE3dDaaQr44W",
                image: imageUrl,
            }});
            setEventData({
                name: "",
                date: "",
                start: "",
                end: "",
                facebook: "",
                details: "",
                location: "",
                image: "",
            })
            setImageFiles([]);
            setSatus(`${eventData.name} is toegevoegd!`);
        });
        setTimeout(() => {
            setSatus('Vul de onderstaande velden in:')
        }, 5000);
    }

    /* if (loading) console.log('Getting locations...');
    if (error) console.log(error); */

    return (
        <form onSubmit={handleSubmit}>

            <div className="form-status">
                <span>{status}</span>
            </div>
            <div className="form-fields">
                <div className="form-group">
                    <label htmlFor="email">Naam evenement</label>
                    <input
                        type="text"
                        value={eventData.name}
                        onChange={e => onChangeData("name", e.target.value)}
                    />
                </div>
                <div className="grid grid--form">
                    <div className="grid__item medium--one-third">
                        <div className="form-group">
                            <label >Datum evenement</label>
                            <input
                                type="text"
                                value={eventData.date}
                                onChange={e => onChangeData("date", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid__item medium--one-third">
                        <div className="form-group">
                            <label >Start</label>
                            <input
                                type="text"
                                value={eventData.start}
                                onChange={e => onChangeData("start", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid__item medium--one-third">
                        <div className="form-group">
                            <label>Einde</label>
                            <input
                                type="text"
                                value={eventData.end}
                                onChange={e => onChangeData("end", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label >Facebook link evenement</label>
                    <input
                        type="text"
                        value={eventData.facebook}
                        onChange={e => onChangeData("facebook", e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Details evenement</label>
                    <textarea
                        value={eventData.details}
                        onChange={e => onChangeData("details", e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Locatie evenement</label>
                    <select name="" id="">
                        <option value="1" disabled>Locatie Kiezen</option>
                        {data && data.locations.map((location: any) => (
                            <option key={location.id} value={location.id}>{location.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label >Foto evenement</label>
                    <ReactDropzone files={ImageFiles} setImageFiles={setImageFiles} />
                </div>
                <button className="button button--primary">
                    <span>Aanmaken</span>
                </button>
            </div>
        </form>
    )
}

export default EventsForm;
