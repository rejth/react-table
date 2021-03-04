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
  const { products } = props;
  const { sortedData, requestSort } = useSortableTable(products);
  return (
    <table className="table table-bordered border-primary">
      <thead>
        <tr className="table-primary">
          <th scope="col">
            <button
              className="btn btn-primary"
              onClick={() => requestSort('id')}
            >
              ID
            </button>
          </th>
          <th scope="col">
            <button
              className="btn btn-primary"
              onClick={() => requestSort('name')}
            >
              Name
            </button>
          </th>
          <th scope="col">
            <button
              className="btn btn-primary"
              onClick={() => requestSort('price')}
            >
              Price
            </button>
          </th>
          <th scope="col">
            <button
              className="btn btn-primary"
              onClick={() => requestSort('stock')}
            >
              In Stock
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map(item => (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
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
