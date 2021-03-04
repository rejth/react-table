import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const useSortableTable = (data, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedData = useMemo(() => {
    const sortableData = [...data];

    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableData;
  }, [data, sortConfig]);

  const requestSort = field => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ field, direction });
  };

  return { sortedData, requestSort };
};

const Table = props => {
  const { sortedData, requestSort } = useSortableTable(props.products);
  return (
    <table>
      <caption>Our products</caption>
      <thead>
        <tr>
          <th>
            <button type="button" onClick={() => requestSort('name')}>
              Name
            </button>
          </th>
          <th>
            <button type="button" onClick={() => requestSort('price')}>
              Price
            </button>
          </th>
          <th>
            <button type="button" onClick={() => requestSort('stock')}>
              In Stock
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.stock}</td>
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
