import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { XSquare } from 'react-feather';

const GET_PRODUCTS = gql`
  {
    products {
        name
        price
        image
    }
  }
`;

const ProductData: React.FC = () => {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! {error.message}</p>;

    const deleteItem = async () => {
        console.log('deleting...')
    }

    let i = 1;

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
                        i++ ,
                        <tr key={i}>
                            <td>
                                <img className="product-image" src={product.image} alt={product.name}/>
                            </td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <a href="#" onClick={deleteItem}>
                                    <XSquare />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default ProductData
