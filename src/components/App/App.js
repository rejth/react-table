import React, { useState } from 'react';
import Table from '../Table';
import SearchPanel from '../SearchPanel';
import Pagination from '../Pagination';

const useSearchedData = () => {
  // initial data
  const products = [
    { id: 1, name: 'Cheese', price: 4.9, stock: 20 },
    { id: 2, name: 'Milk', price: 1.9, stock: 32 },
    { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
    { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
    { id: 5, name: 'Butter', price: 0.9, stock: 99 },
    { id: 6, name: 'Sour Cream', price: 2.9, stock: 86 },
    { id: 7, name: 'Fancy French Cheese', price: 99, stock: 12 },
    { id: 8, name: 'Banana', price: 16, stock: 5 },
    { id: 9, name: 'Coffee', price: 18, stock: 43 },
  ];

  // state
  const [term, setTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // обновление state
  const onSearchChange = term => setTerm(term);
  const onTogglePage = id => setCurrentPage(id);

  // переключение страниц
  const togglePage = (data, id) =>
    data.filter(item => item.id <= id * 3 && item.id > (id - 1) * 3);

  // поиск данных в таблице
  const searchData = (data, term) => {
    if (term.length === 0) return data;
    return data.filter(
      item => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
    );
  };

  // данные на странице
  const dataOnPage = togglePage(products, currentPage);

  // найденные данные на странице
  const searchedData = searchData(dataOnPage, term);

  return { searchedData, onSearchChange, onTogglePage };
};

const App = () => {
  const { searchedData, onSearchChange, onTogglePage } = useSearchedData();
  return (
    <React.Fragment>
      <SearchPanel onSearch={onSearchChange} />
      <Table products={searchedData} />
      <Pagination onToggle={onTogglePage} />
    </React.Fragment>
  );
};

export default App;
