import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Trash, Edit2 } from 'react-feather';

const GET_EVENTS = gql`
    {
        events {
            id
            name
            date
            start
            end
            facebook
            details
            image
                location {
                    name
                    address
                    city
                    zipcode
                    country
                }
        }
    }
`;

const DELETE_EVENT = gql`
    mutation DeleteEvent($id: String!){
        deleteEvent(id: $id)
    }
`;

const EventsData: React.FC = () => {
    const { loading, error, data } = useQuery(GET_EVENTS);
    const [deleteEventMutation] = useMutation(DELETE_EVENT);

    const deleteItem = async (eventId: String) => {
        await deleteEventMutation({ variables: { id: eventId } });
        window.location.reload();
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! {error.message}</p>;

    return (
        <table>
            <thead>
                <tr>
                    <th>Naam</th>
                    <th>Datum</th>
                    <th>Locatie</th>
                    <th>Acties</th>
                </tr>
            </thead>
            <tbody>
                {data.events.map((event: any) => (
                    <tr key={event.id}>
                        <td>{event.name}</td>
                        <td>{event.date}</td>
                        <td>{event.location.name}</td>
                        <td className="clearfix">
                            <Edit2 className="actionIcon"/>
                            <Trash className="actionIcon" onClick={() => deleteItem(event.id)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default EventsData;
