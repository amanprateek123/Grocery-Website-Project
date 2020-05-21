import React from 'react';
import './Modal.scss'

const Modal = (props) => {

    function closeModal(e) {
        if (e.target !== document.querySelector('.modal'))
            return;

        props.closeModal();
    }

    return (
        props.visible ?
            <div className="modal" onClick={closeModal}>
                {props.children}
            </div>
            :
            null
    );
}

export default Modal;