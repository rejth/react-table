import React from 'react';
import PropTypes from 'prop-types';
import './SearchPanel.css';

const SearchPanel = props => {
  const { onSearch } = props;

  const onSearchChange = e => {
    const text = e.target.value;
    onSearch(text);
  };

  return (
    <input
      className="form-control search-input"
      type="text"
      placeholder="type to search"
      onChange={onSearchChange}
    ></input>
  );
};

SearchPanel.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchPanel;
