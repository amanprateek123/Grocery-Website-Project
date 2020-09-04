import React from 'react';
import { useQuery } from 'react-query'
import { LinearProgress } from '@material-ui/core';
import Product from '../Product/Product'

const SimilarProducts = (props) => {
    // similar products
    const sp = useQuery(['similar-products', props.category], () => (
        fetch(`/get-products?category=${props.category}&limit=6`).then(res => res.json())
    ))
    return (
        !sp.isLoading && (sp.data.products.length > 1) ?
            <div className="similar-products about_product">
                <h1>Similar Products</h1>
                <div className="d-flex" style={{ overflowX: 'scroll' }}>
                    {
                        sp.isLoading ? <LinearProgress />
                            :
                            sp.data.products.map(prod => {

                                if (prod.id != props.currentId) {
                                    return <Product product={prod} key={prod.id} noCart noOptions priceLabel />
                                }
                                return null
                            }
                            )
                    }
                </div>
            </div>
            : null
    );
}

export default SimilarProducts;