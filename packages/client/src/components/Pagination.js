/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  height: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Pagination = ({ totalPages, pageLimit = 10, onPageChanged }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = range(1, totalPages);

  const onChangePage = nextPage => {
    setCurrentPage(nextPage, () => {
      onPageChanged({ currentPage });
    });
  };

  const onPrevious = () => {
    const page = currentPage - 1;
    onChangePage(page);
    onPageChanged({ currentPage: page });
  };
  const onNext = () => {
    const page = currentPage + 1;
    onChangePage(page);
    onPageChanged({ currentPage: page });
  };

  const onPageClick = (page, $event) => {
    setCurrentPage(page);
    onPageChanged({ currentPage: page });
  };

  return (
    <Nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
          <a onClick={onPrevious} className="page-link" href="#">
            Předchozí
          </a>
        </li>
        {pages.map((page, index) => (
          <li key={index} className={`page-item${currentPage === page ? ' active' : ''}`}>
            <a className="page-link" href="#" onClick={e => onPageClick(page, e)}>
              {page}
            </a>
          </li>
        ))}
        <li className={`page-item${currentPage === totalPages || !totalPages ? ' disabled' : ''}`}>
          <a className="page-link" href="#" onClick={onNext}>
            Další
          </a>
        </li>
      </ul>
    </Nav>
  );
};

export default Pagination;
