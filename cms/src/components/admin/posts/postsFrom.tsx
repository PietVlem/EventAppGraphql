import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_Post = gql`    
    mutation CreatePost($body: String) {
        createPost(input: {body: $body}){
            id
            body
            postedAt
        }
    }
`;

const PostsForm: React.FC = () => {
    const [createLocationMutation, { error }] = useMutation(ADD_Post);
    const [PostBody, setPostBody] = useState<string>('')
    const [status, setSatus] = useState<string>('Vul de onderstaande velden in:');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(PostBody);
        await createLocationMutation({ variables: { body: PostBody }})
        setPostBody('')
        setSatus(`Bericht is toegevoegd!`);
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
                <div className="form-fields">
                    <label htmlFor="">Bericht</label>
                    <textarea
                        value={PostBody}
                        onChange={e => setPostBody(e.target.value)}
                    />
                </div>
                <button className="button button--primary">
                    <span>Aanmaken</span>
                </button>
            </div>
        </form>
    )
}

export default PostsForm
