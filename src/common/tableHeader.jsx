import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  renderSortIcon = (header) => {
    if (header.path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    return (
      <thead className="thead-dark">
        <tr>
          {this.props.headers.map((header) => (
            <th
              style={{ cursor: "pointer" }}
              key={header.path || header.key}
              scope="col"
              onClick={() => this.raiseSort(header.path)}
            >
              {header.label} {this.renderSortIcon(header)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
