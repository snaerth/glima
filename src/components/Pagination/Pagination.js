import React from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

const Pagination = ({ initialPage, pageCount, onPageChangeHandler }) => {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      previousLabel="❮"
      nextLabel="❯"
      breakLabel={<span>...</span>}
      breakClassName="break-me"
      pageCount={pageCount}
      initialPage={initialPage - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChangeHandler}
      disableInitialCallback
      containerClassName="pagination"
      subContainerClassName="pages pagination"
      activeClassName="active"
    />
  );
};

Pagination.propTypes = {
  initialPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChangeHandler: PropTypes.func.isRequired
};

export default Pagination;
