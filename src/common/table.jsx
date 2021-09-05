import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, sortColumn, data, headers }) => {
  return (
    <table className="table">
      <TableHeader headers={headers} onSort={onSort} sortColumn={sortColumn} />
      <TableBody headers={headers} data={data} />
    </table>
  );
};

export default Table;
