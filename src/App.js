import React, { useState } from 'react';
import Table from './Table';
import SearchPanel from './SearchPanel';

const useSearchedData = () => {
  const products = [
    { id: 1, name: 'Cheese', price: 4.9, stock: 20 },
    { id: 2, name: 'Milk', price: 1.9, stock: 32 },
    { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
    { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
    { id: 5, name: 'Butter', price: 0.9, stock: 99 },
    { id: 6, name: 'Sour Cream', price: 2.9, stock: 86 },
    { id: 7, name: 'Fancy French Cheese', price: 99, stock: 12 },
  ];

  const [term, setTerm] = useState('');

  const onSearchChange = term => setTerm(term);

  const search = (data, term) => {
    if (term.length === 0) return data;
    return data.filter(
      item => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
    );
  };

  const searchedData = search(products, term);

  return { searchedData, onSearchChange };
};

const App = () => {
  const { searchedData, onSearchChange } = useSearchedData();
  return (
    <React.Fragment>
      <SearchPanel onSearch={onSearchChange} />
      <Table products={searchedData} />
    </React.Fragment>
  );
};

export default App;
