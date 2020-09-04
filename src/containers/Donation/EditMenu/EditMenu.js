import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { BsThreeDots, BsPencil, BsTrash } from 'react-icons/bs';
import './EditMenu.css';

const EditMenu = (props) => {
    const { toggleShowEditModal, toggleShowDeleteModal } = props
    const popover = (
        <Popover id="popover-positioned-top">
            <Popover.Content className="edit-menu-item" onClick={toggleShowEditModal}>
                <BsPencil style={{ fontSize: "large" }}
                /> Edit donation
            </Popover.Content>
            <Popover.Content className="edit-menu-item" onClick={toggleShowDeleteModal}>
                <BsTrash style={{ fontSize: "large" }} /> Delete donation
            </Popover.Content>
        </Popover>
    )
    return (
        <OverlayTrigger
            trigger="click"
            key="top"
            placement="top"
            overlay={popover}
            rootClose
        >
            <BsThreeDots className="edit-dots" />
        </OverlayTrigger>

    )
};

export default EditMenu;