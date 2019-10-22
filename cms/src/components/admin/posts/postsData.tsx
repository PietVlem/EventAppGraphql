import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Trash, Edit2 } from 'react-feather';

const GET_POSTS = gql`
  {
    posts {
        id
        body
        postedAt
    }
  }
`;

const DELETE_POST = gql`
    mutation DeletePost($id: String!){
        deletePost(id: $id)
    }
`;

const PostsData: React.FC = () => {
    const { loading, error, data } = useQuery(GET_POSTS);
    const [deletePostMutation] = useMutation(DELETE_POST);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! {error.message}</p>;

    const deleteItem = async (postId: String) => {
        await deletePostMutation({ variables: { id: postId } });
        window.location.reload();
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
                <tbody>
                    {data.posts.map((post: any) => (
                            <tr key={post.id}>
                                <td>{post.body}</td>
                                <td>{post.postedAt}</td>
                                <td>
                                    <Trash className="pointer" onClick={()=>deleteItem(post.id)}/>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default PostsData
