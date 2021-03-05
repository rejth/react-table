import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// user hook для инкапсуляции логики сортировки таблицы
// полезно для гибкого переиспользования
const useSortableTable = (data, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  // кэкшириуем результат сортировки с помощью useMemo()
  // идея в том, чтобы не запускать дорогостоящие вычисления (сортировку) при каждом рендере компонента,
  // если на вход таблицы придут те же данные, т.о. сортировка запустится только при новых данных или state
  const sortedData = useMemo(() => {
    const sortableData = [...data];

    // сортировка данных
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableData;
  }, [data, sortConfig]);

  // изменяем направление сортировки при клике и обновляем state
  const requestSort = field => {
    let direction = 'asc';
    if (sortConfig && sortConfig.direction === 'asc') {
      direction = 'desc';
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
