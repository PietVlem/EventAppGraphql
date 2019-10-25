import React from 'react';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';

const SUBSCRIPTION_POSTS = gql`
    subscription{
        newPost{
            id
            body
            postedAt
        }
    }
`;

const PostSubscription = () => {
    const { loading, error, data } = useSubscription(SUBSCRIPTION_POSTS);
    if (error)
        return <p>{`Error! ${error.message}`}</p>;
    return(
        <React.Fragment>
            {!loading && 
                <tr key={data.newPost.id}>
                    <td>{data.newPost.body}</td>
                    <td>{data.newPost.postedAt}</td>
                    {/* <td>
                        <Trash className="pointer" onClick={()=>deleteItem(post.id)}/>
                    </td> */}
                </tr>
            }
        </React.Fragment>
    ) 
}

export default PostSubscription;