import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

/*
Components
*/
import Post from './postRow';

const POSTS_QUERY = gql`
  query Posts{
    posts {
        id
        body
        postedAt
    }
  }
`;

const NEW_POSTS_SUBSCRIPTION = gql`
    subscription{
        newPost{
            id
            body
            postedAt
        }
    }
`;

/* const DELETE_POSTS_SUBSCRIPTION = gql`
    subscription{
        deletePost{
            id
            body
            postedAt
        }
    }
`; */

const PostsData: React.FC = () => {
    const { subscribeToMore, ...result } = useQuery(POSTS_QUERY);

    if (result.loading) return <p>Loading...</p>;
    if (result.error) return <p>Error! {result.error.message}</p>;

    const removeElement = (id: string) => {
        console.log(id);
    }

    return (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th>Bericht</th>
                        <th>Gepubliceerd op</th>
                        <th>Acties</th>
                    </tr>
                </thead>
                <Post
                    {...result}
                    subscribeToNewPosts={() =>
                        subscribeToMore({
                            document: NEW_POSTS_SUBSCRIPTION,
                            updateQuery: (prev, { subscriptionData }) => {
                                if (!subscriptionData.data) return prev;
                                const newPost = subscriptionData.data.newPost;
                                return Object.assign({}, prev, {
                                    posts: [newPost, ...prev.posts]
                                });

                            }
                        })
                    }
                    
                    removeElement={removeElement}
                />
            </table>
        </React.Fragment>
    )
}

export default PostsData