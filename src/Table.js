import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Table = props => {
  const [sortedField, setSortedField] = useState(null);
  const { products } = props;
  const sortedProducts = [...products];

  if (sortedField !== null) {
    sortedProducts.sort((a, b) => {
      if (a[sortedField] < b[sortedField]) return -1;
      if (a[sortedField] > b[sortedField]) return 1;
      return 0;
    });
  }

  return (
    <table>
      <caption>Our products</caption>
      <thead>
        <tr>
          <th>
            <button type="button" onClick={() => setSortedField('name')}>
              Name
            </button>
          </th>
          <th>
            <button type="button" onClick={() => setSortedField('price')}>
              Price
            </button>
          </th>
          <th>
            <button type="button" onClick={() => setSortedField('stock')}>
              In Stock
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
