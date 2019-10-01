import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { XSquare } from 'react-feather';

const GET_PRODUCTS = gql`
  {
    products {
        id
        name
        price
        image
    }
  }
`;

const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: String!){
        deleteProduct(id: $id)
    }
`;

const ProductData: React.FC = () => {
    const { loading, error, data } = useQuery(GET_PRODUCTS);
    const [deleteProductMutation] = useMutation(DELETE_PRODUCT);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! {error.message}</p>;

    const deleteItem = async (productId: String) => {
        await deleteProductMutation({ variables: { id: productId } });
        window.location.reload();
    }

    return (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Prijs</th>
                        <th>Acties</th>
                    </tr>
                </thead>
                <tbody>
                    {data.products.map((product: any) => (
                        <tr key={product.id}>
                            <td>
                                <img className="product-image" src={product.image} alt={product.name} />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <XSquare className="pointer" onClick={() => deleteItem(product.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default ProductData
