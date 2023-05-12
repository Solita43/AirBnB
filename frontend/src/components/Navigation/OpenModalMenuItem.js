import React from 'react';
import { useModal } from "../../context/Modal";

function OpenModalMenuItem({ modalComponent, itemText, onItemClick, onModalClose, signup }) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onItemClick) onItemClick();
    };

    return (
        <>
            <li className='modal_item' id={signup ? signup: null} onClick={onClick}>{itemText}</li>
        </>
    );
}

export default OpenModalMenuItem;