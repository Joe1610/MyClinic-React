import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({
  onPageChange,
  appointmentsCount,
  pageSize,
  currentPage,
}) => {
  const pagesCount = Math.ceil(appointmentsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {pages.map((page) => (
          <li
            className={currentPage === page ? "page-item active" : "page-item"}
            key={page}
          >
            <button onClick={() => onPageChange(page)} className="page-link">
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.protoTypes = {
  appointmentsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
