import classNames from "classnames";
import React from "react";
import styles from "./SelectBox.module.css";

export const SelectBox = ({
  selected,
  onChange,
  options,
  valKey,
  nameKey,
  renderOption,
}) => {
  return (
    <div className={classNames(styles.selectBoxWrapper)}>
      <select
        className={classNames(styles.select)}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((element) =>
          renderOption ? (
            <option key={element[valKey]} value={element[valKey]}>
              {renderOption(element)}
            </option>
          ) : (
            <option key={element[valKey]} value={element[valKey]}>
              {element[nameKey]}
            </option>
          )
        )}
      </select>
    </div>
  );
};
