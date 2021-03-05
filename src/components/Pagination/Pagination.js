import React from 'react';
import PropTypes from 'prop-types';

const Pagination = props => {
  const { onToggle } = props;
  const _numberOfPages = 3;

  const onTogglePage = id => onToggle(id);

  const renderPagination = () => {
    const items = [];
    for (let i = 1; i <= _numberOfPages; i++) {
      const li = (
        <li key={i} className="page-item" onClick={() => onTogglePage(i)}>
          <a className="page-link" href="#">
            {i}
          </a>
        </li>
      );
      items.push(li);
    }
    return items;
  };

  const buttons = renderPagination();

  return <ul className="pagination pagination-lg">{buttons}</ul>;
};

Pagination.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default Pagination;
