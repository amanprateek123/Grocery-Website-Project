import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import { useState } from 'react';
import AdminContent from './AdminContent'
import {
     Card, CardContent, Avatar,
    List, ListItem, ListSubheader, ListItemIcon, ListItemText, Divider,
  
}
    from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import Alert from '@material-ui/lab/Alert';
import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import male_avatar from '../../assets/illustrations/male_avatar.svg'
import female_avatar from '../../assets/illustrations/female_avatar.svg'

const Profile = (props) => {

    const [user, setUser] = useState({});
    const [modal, setModal] = useState(false);
  
    const [tab, setTab] = useState('profile');

  


    const openModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
    }


    

    return (
        <div className="container-fluid page">
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="side-nav">
                            <div className="mb-4">
                                <Card>
                                    <CardContent>
                                        <div className="row align-items-center">
                                            <div className="col-4">
                                                <Avatar className="dp" src={user.gender == 'F' ? female_avatar : male_avatar} />
                                            </div>
                                            <div className="col">
                                                <div><i>Hello,</i></div>
                                                <h5>Admin</h5>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col" style={{ fontSize: '0.5em' }}>
                                              <Alert severity="success">File Uploaded</Alert>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="mb-3">
                                <Card>
                                    <CardContent>

                                        <List component="nav" aria-label="main"
                                            subheader={
                                                <ListSubheader component="div" id="nested-list-subheader">
                                                   Upload
                                            </ListSubheader>
                                            }
                                        >
                                            <ListItem button onClick={() => setTab('profile')}>
                                                <ListItemIcon>
                                                    <PersonIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Departments & Category" />
                                            </ListItem>
                                            <ListItem button onClick={() => setTab('address')}>
                                                <ListItemIcon>
                                                    <HomeIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Products & SKU" />
                                            </ListItem>
                                        </List>
                                        <Divider />
                                        <List component="nav" aria-label="secondary">
                                            <ListItem button onClick={props.logout}>
                                                <ListItemIcon>
                                                    <PowerSettingsNewIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Logout" />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </div>

                        </div>
                    </div>
                    <div className="col-8">
                        <div className="content">
                            {tab == 'profile' ?
                            <AdminContent content="Department & Categories" />
                                : tab == 'address' ?
                                    <AdminContent content="Products & SKU"/>
                                    : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ...state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setResponse: (response) => dispatch({ type: actions.SET_RESPONSE, response: response }),
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);