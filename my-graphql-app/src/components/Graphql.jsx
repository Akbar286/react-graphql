import React, { useState, useEffect } from 'react';

const Graphql = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://0.0.0.0:10000/graphql';
    const query = `
      {
        products(search: "png img product") {
          items {
            id
            sku
            name
            price {
              regularPrice {
                amount {
                  value
                  currency
                }
              }
            }
            image { 
              url
            }
            description {
              html
            }
            short_description {
              html
            }
          }
        }
      }
    `;

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          setError(data.errors[0].message);
          setLoading(false);
        } else {
          setProducts(data.data.products.items);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError('Error fetching data from Magento: ' + error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array to ensure useEffect runs only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.image.url} alt={product.image.altText} />
            <p>{product.description.html}</p>
            <p>
              Price: {product.price.regularPrice.amount.value}{' '}
              {product.price.regularPrice.amount.currency}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Graphql;
