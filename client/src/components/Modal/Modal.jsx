import React from 'react';
import './Modal.scss'
import CloseBtn from '@material-ui/icons/Close'

const Modal = (props) => {

    function closeModal(e) {
        if (e.target !== document.querySelector('.modal'))
            return;

        if (props.closeModal)
            props.closeModal();
    }

    return (
        props.visible ?
            <div className="modal" onClick={closeModal}>
                {props.closeBtn ? <CloseBtn className="modal-close-btn" onClick={props.closeBtn} /> : null}
                {props.children}
            </div>
            :
            null
    );
}

export default Modal;