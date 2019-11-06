import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Trash, Edit2 } from 'react-feather';

const DELETE_POST = gql`
mutation DeletePost($id: String!){
    deletePost(id: $id){
        id
        body
        postedAt
    }
}
`;

const Post = (props: any) => {
    const [deletePostMutation] = useMutation(DELETE_POST);

    useEffect(() => {
        props.subscribeToNewPosts();
    }, [])

    const deleteItem = async (postId: String) => {
        await deletePostMutation({ variables: { id: postId } });
        window.location.reload();
    }

    if (props.data !== undefined)
        return (
            <tbody>
                {props.data.posts.map((post: any) => (
                    <tr key={post.id}>
                        <td>{post.body}</td>
                        <td>{post.postedAt}</td>
                        <td className="clearfix">
                            <Edit2 className="actionIcon"/>
                            <Trash className="actionIcon" onClick={() => deleteItem(post.id)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        )
    return (
        <React.Fragment />
    )
}

export default Post;