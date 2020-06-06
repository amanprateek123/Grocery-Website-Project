import React from 'react'


const Admin = (props) => {

    const addProducts = (e) => {
        e.preventDefault();
        var input = document.querySelector('#products-file');
        var data = new FormData()
        data.append('products', input.files[0]);

        fetch('/admin/add-products', {
            method: 'POST',
            body: data
        }).then(res => res.json().then(res => {
            console.log(res);
        })).catch(err => {
            console.log(err);
        })
    }

    return (
        <form encType="multipart/form-data" onSubmit={addProducts}>
            <input type="file" name="products" id="products-file" />
            <button>Submit</button>
        </form>
    );
}

export default Admin;