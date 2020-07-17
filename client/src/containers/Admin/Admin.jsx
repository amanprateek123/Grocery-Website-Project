import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import { useState } from 'react';
import AddProductsFile from './AddProductsFile'
import {
    Card, CardContent, Avatar,
    List, ListItem, ListSubheader, ListItemIcon, ListItemText, Divider,

}
    from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import Alert from '@material-ui/lab/Alert';
import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import CategoryIcon from '@material-ui/icons/Category';
import FileIcon from '@material-ui/icons/FileCopy';
import male_avatar from '../../assets/illustrations/male_avatar.svg'
import female_avatar from '../../assets/illustrations/female_avatar.svg'

import './Admin.scss'
import AddCategoriesFile from './AddCategoriesFile';
import AddProduct from './AddProduct';
import AddProductJSON from './AddProductJSON';
import DeleteProduct from './DeleteProduct';

const Profile = (props) => {

    const [user, setUser] = useState({});
    const [modal, setModal] = useState(false);

    const [tab, setTab] = useState('categories');




    const openModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
    }




    return (
        <div className="container-fluid page admin">
            <div className="container main-container">
                <div className="row">
                    <div className="col-md-4">
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
                                            <ListItem button selected={tab == 'category'} onClick={() => setTab('category')}>
                                                <ListItemIcon>
                                                    <CategoryIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Departments & Category" />
                                            </ListItem>
                                            <ListItem button selected={tab == 'product'} onClick={() => setTab('product')}>
                                                <ListItemIcon>
                                                    <CategoryIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Add Product" />
                                            </ListItem>
                                            <ListItem button selected={tab == 'productJSON'} onClick={() => setTab('productJSON')}>
                                                <ListItemIcon>
                                                    <CategoryIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Add Product (as JSON)" />
                                            </ListItem>
                                        </List>


                                        <List component="nav" aria-label="main"
                                            subheader={
                                                <ListSubheader component="div" id="nested-list-subheader">
                                                    Bulk Uploads (csv)
                                            </ListSubheader>
                                            }
                                        >
                                            <ListItem button selected={tab == 'categories'} onClick={() => setTab('categories')}>
                                                <ListItemIcon>
                                                    <FileIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Departments & Categories" />
                                            </ListItem>

                                            <ListItem button selected={tab == 'products'} onClick={() => setTab('products')}>
                                                <ListItemIcon>
                                                    <FileIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Add Products" />
                                            </ListItem>
                                            <ListItem button selected={tab == 'skus'} onClick={() => setTab('skus')}>
                                                <ListItemIcon>
                                                    <FileIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Add SKU" />
                                            </ListItem>
                                        </List>

                                        <List component="nav" aria-label="main"
                                            subheader={
                                                <ListSubheader component="div" id="nested-list-subheader">
                                                    Edit
                                            </ListSubheader>
                                            }
                                        >
                                            <ListItem button selected={tab == 'deleteProduct'} onClick={() => setTab('deleteProduct')}>
                                                <ListItemIcon>
                                                    <CategoryIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Delete Product" />
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
                    <div className="col-md-8">
                        <div className="content">
                            {tab == 'category' ?
                                null
                                : tab == 'product' ?
                                    <AddProduct />
                                    : tab == 'productJSON' ?
                                        <AddProductJSON />
                                        : tab == 'sku' ?
                                            null
                                            : tab == 'categories' ?
                                                <AddCategoriesFile />
                                                : tab == 'products' ?
                                                    <AddProductsFile />
                                                    : tab == 'skus' ?
                                                        null
                                                        : tab == 'deleteProduct' ?
                                                            <DeleteProduct />
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