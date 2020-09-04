import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import { useState } from 'react';
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
import AddCategoriesFile from './BulkUploads/AddCategoriesFile';
import AddProductsFile from './BulkUploads/AddProductsFile'
import AddProduct from './SingleUploads/AddProduct';
import AddProductJSON from './SingleUploads/AddProductJSON';
import DeleteProduct from './Edit/DeleteProduct';
import EditProduct from './Edit/EditProduct';
import Homepage from './HomePage/Homepage'
import Offers from './Offers/Offers'
import { useEffect } from 'react';

const Profile = (props) => {

    const [user, setUser] = useState({});
    const [modal, setModal] = useState(false);

    const [tab, setTab] = useState('homepage');




    const openModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tab])

   const handler =(e)=>{
       setTab(e.target.value)
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
                                <Card style={{boxShadow:'none'}} className="drop_ad">
                                    <select onChange={handler}>
                                        <optgroup label="Upload">
                                            <option value="homepage">Homepage</option>
                                            <option value="offers">Offers</option>
                                            <option value="category">Departments and Category</option>
                                            <option value="product">Add Product</option>
                                            <option value="productJSON">Add product as JSON</option>
                                        </optgroup>
                                        <optgroup label="Bulk Uploads">
                                            <option value="categories">Departments and Categories</option>
                                            <option value="products">Add Products</option>
                                        </optgroup>
                                        <optgroup label="Edit">
                                            <option value="deleteProduct">Delete Product</option>
                                            <option value="editProduct">Edit Product</option>
                                        </optgroup>
                                    </select>
                                </Card>
                                <Card className="left_ad">
                                    <CardContent>

                                        <List component="nav" aria-label="main"
                                            subheader={
                                                <ListSubheader component="div" id="nested-list-subheader">
                                                    Upload
                                            </ListSubheader>
                                            }
                                        >
                                            <ListItem button selected={tab == 'homepage'} onClick={() => setTab('homepage')}>
                                                <ListItemIcon>
                                                    <CategoryIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Homepage" id="tab" />
                                            </ListItem>
                                            <ListItem button selected={tab == 'offers'} onClick={() => setTab('offers')}>
                                                <ListItemIcon>
                                                    <CategoryIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Offers" id="tab" />
                                            </ListItem>
                                            <ListItem button selected={tab == 'category'} onClick={() => setTab('category')}>
                                                <ListItemIcon>
                                                    <CategoryIcon />
                                                </ListItemIcon>
                                                <ListItemText id="tab" primary="Departments & Category" />
                                            </ListItem>
                                            <ListItem button selected={tab == 'product'} onClick={() => setTab('product')}>
                                                <ListItemIcon>
                                                    <CategoryIcon />
                                                </ListItemIcon>
                                                <ListItemText id="tab" primary="Add Product" />
                                            </ListItem>
                                            <ListItem button selected={tab == 'productJSON'} onClick={() => setTab('productJSON')}>
                                                <ListItemIcon>
                                                    <CategoryIcon />
                                                </ListItemIcon>
                                                <ListItemText id="tab" primary="Add Product (as JSON)" />
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
                                                <ListItemText id="tab" primary="Departments & Categories" />
                                            </ListItem>

                                            <ListItem button selected={tab == 'products'} onClick={() => setTab('products')}>
                                                <ListItemIcon>
                                                    <FileIcon />
                                                </ListItemIcon>
                                                <ListItemText id="tab" primary="Add Products" />
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
                                                <ListItemText id="tab" primary="Delete Product" />
                                            </ListItem>
                                            <ListItem button selected={tab == 'editProduct'} onClick={() => setTab('editProduct')}>
                                                <ListItemIcon>
                                                    <CategoryIcon />
                                                </ListItemIcon>
                                                <ListItemText id="tab" primary="Edit Product" />
                                            </ListItem>
                                        </List>
                                        <Divider />
                                        <List component="nav" aria-label="secondary">
                                            <ListItem button onClick={props.logout}>
                                                <ListItemIcon>
                                                    <PowerSettingsNewIcon />
                                                </ListItemIcon>
                                                <ListItemText id="tab" primary="Logout" />
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
                                                    : tab == 'deleteProduct' ?
                                                        <DeleteProduct />
                                                        : tab == 'editProduct' ?
                                                            <EditProduct />
                                                            : tab == 'homepage' ?
                                                                <Homepage />
                                                                 : tab == 'offers' ?
                                                                     <Offers/> : null}
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