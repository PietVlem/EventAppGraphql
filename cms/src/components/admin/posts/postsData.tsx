import React, {useEffect, Component} from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Trash, Edit2 } from 'react-feather';

const POSTS_QUERY = gql`
  query Posts{
    posts {
        id
        body
        postedAt
    }
  }
`;

const POSTS_SUBSCRIPTION = gql`
    subscription{
        newPost{
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
    const { subscribeToMore, ...result } = useQuery(POSTS_QUERY);
    console.count('container')

    if (result.loading) return <p>Loading...</p>;
    if (result.error) return <p>Error! {result.error.message}</p>;
    
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
                            document: POSTS_SUBSCRIPTION,
                            updateQuery: (prev, { subscriptionData }) => {
                                if (!subscriptionData.data) return prev;
                                const newPost = subscriptionData.data.newPost;
                                console.log("prev",prev);

                                const itemAlreadyExist = prev.posts.some((item: any)=>{
                                    return item.id == newPost.id
                                })
                                
                                if(!itemAlreadyExist){
                                    return Object.assign({}, prev, {
                                        posts: [newPost, ...prev.posts]
                                    });
                                } 
                                return;
                            }
                        })
                    }
                />
            </table>
        </React.Fragment>
    )
}

const Post = (props: any) => {
    const [deletePostMutation] = useMutation(DELETE_POST);
    console.count('child')

    useEffect(()=>{
        props.subscribeToNewPosts();
    }, [])

    const deleteItem = async (postId: String) => {
        await deletePostMutation({ variables: { id: postId } });
        window.location.reload();
    }

    if(props.data != undefined)
        return(
            <tbody>
                {props.data.posts.map((post: any)=>(
                    <tr key={post.id}>
                        <td>{post.body}</td>
                        <td>{post.postedAt}</td>
                        <td>
                            <Trash className="pointer" onClick={()=>deleteItem(post.id)}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        )
    return(
        <React.Fragment />
    )
}

export default PostsData
