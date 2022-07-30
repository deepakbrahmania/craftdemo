import React from "react";
import styles from "./Table.module.css";

export const Table = ({
  title,
  headers = null,
  data,
  renderElement = null,
  renderActions = undefined,
}) => {
  return (
    <div>
      <h4>{title}</h4>
      <table className={styles.table}>
        {headers && (
          <thead>
            <tr>
              {Object.keys(headers).map((col) => (
                <th key={col}>{headers[col]}</th>
              ))}
              {renderActions && <th>Actions</th>}
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((row, index) => (
            <tr key={`row-${index}`}>
              {headers
                ? Object.keys(headers).map((field) => (
                    <td key={`${field}-${index}`}>
                      {renderElement
                        ? renderElement(field, row[field], row)
                        : row[field]}
                    </td>
                  ))
                : Object.entries(row).map(([key, val]) => (
                    <td key={`${key}-${index}`}>
                      {renderElement ? renderElement(key, val, row) : val}
                    </td>
                  ))}
              <td>{renderActions && renderActions(row)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
