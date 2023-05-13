import React from 'react';
import { useModal } from "../../context/Modal";

function OpenModalButton({ modalComponent, buttonText, onButtonClick, onModalClose, addClass }) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (typeof onButtonClick === "function") onButtonClick();
        if (typeof onModalClose === "function") setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    };

    return <button className={addClass ? addClass: null} onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton