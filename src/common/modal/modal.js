import React from "react";
import { Button } from "../button/Button";
import "./styles.css";
export const Modal = (props) => {
    if (!props.isOpen) return;
    return (
        <div className="modal-container-back">
            <div className="modal-container-front">
                <div className="modal-title">
                    <h2>{props.title}</h2>
                    <Button customRender={() => <span>X</span>} onClick={props.reset}/>
                </div>
                <div className="modal-body">{props.children}</div>
                <div className="modal-action">
                    <Button text="Close" onClick={props.reset} />
                    <Button text={"Submit"} primary onClick={props.onSubmit}/>
                </div>
            </div>
        </div>
    );
};