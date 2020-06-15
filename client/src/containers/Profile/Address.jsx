import React from 'react';
import { ListItem, ListItemText, Divider, ListItemSecondaryAction, IconButton, Badge } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const Address = (props) => {
    return (
        <React.Fragment>
            <Divider />
            <ListItem>
                <ListItemText
                    primary={<React.Fragment>{props.value.name} {props.value.isPrimary ? <div className="badge badge-success mb-1 ml-1" style={{ opacity: 0.7 }}>primary</div> : null}</React.Fragment>}
                    secondary={
                        <p style={{ width: '100%' }} className="mar">
                            <div>{props.value.address},{props.value.city} </div>
                            <div>{props.value.state} - {props.value.zip}, {props.value.country}</div>
                            <div>{props.value.email} : {props.value.mobile}</div>
                        </p>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={props.editAddress}>
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={props.removeAddress}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </React.Fragment>
    );
}

export default Address;