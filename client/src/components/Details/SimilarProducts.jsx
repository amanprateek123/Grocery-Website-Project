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
        <div className="similar-products about_product">
            {!sp.isLoading && (sp.data.products.length > 1) ? <h1>Similar Products</h1> : null}
            <div className="d-flex" style={{ overflowX: 'scroll' }}>
                {
                    sp.isLoading ? <LinearProgress />
                        :
                        sp.data.products.map(prod => {

                            if (prod.id != props.currentId) {
                                return <Product product={prod} noCart />
                            }
                            return null
                        }
                        )
                }
            </div>
        </div>
    );
}

export default SimilarProducts;