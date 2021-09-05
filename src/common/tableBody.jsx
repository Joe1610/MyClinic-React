import _ from "lodash";
import React from "react";

const TableBody = ({ data, headers }) => {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {headers.map((header) => (
            <td key={header.path || header.key}>{renderCell(item, header)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

function renderCell(item, header) {
  if (header.content) return header.content(item);
  return _.get(item, header.path);
}

export default TableBody;
