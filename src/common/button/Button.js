import classNames from "classnames";
import React from "react";
import { ReactComponent as EditIcon } from '../../assets/images/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/trash.svg'
import styles from './Button.module.css';

export const Button = ({ text, onClick, customRender, primary, image="" }) => {

  const getImage = () => {
    let img;
    if (image) {
      if (image.includes("Update")) {
        img = <EditIcon height={20} width={20} />
      } else if (image.includes("Delete")) {     
          img = <DeleteIcon height={20} width={20} />  
      }
    }
    return img;
  };

  const hasImage = (text) => {
    if (text.includes("Update") || text.includes("Delete"))
      return true;
    else return false;
  }

  return (
    <button className={classNames({
        [styles.buttonWrapper]: !customRender && !image.includes("Update") && !image.includes("Delete"),
        [styles.buttonPrimary]: primary
    })} onClick={onClick}>
      {customRender && customRender()} 
      {(image && hasImage(image)) ? getImage() : text}
    </button>
  );
};
