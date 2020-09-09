import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import './StripeCheckout.scss';
import { useState } from 'react';
import { CircularProgress, LinearProgress } from "@material-ui/core";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};


export default function CheckoutForm(props) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    let history = useHistory();

    useEffect(() => {
        if (stripe && elements) {
            setLoading(false)
        }
    }, [stripe, elements])

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        console.log('submitted');

        if (!stripe || !elements || loading) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setLoading(true);

        const result = await stripe.confirmCardPayment(props.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),

            }
        });

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            setError(result.error.message)
            console.log(result.error.message);
        } else {
            // The payment has been processed!
            console.log('processed');
            setSuccess(result.paymentIntent.status)
            if (result.paymentIntent.status === 'succeeded') {
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
                // props.setPayOnline(false);
                props.setPlacedOrder(true);
                props.setPaymentData(result.paymentIntent);
                // props.setOrderData(null);

            }
        }
        setLoading(false);
    };

    return (
        <form className="stripe-checkout">
            {/* <h2>Pay with Card</h2> */}
            <div className="card-details">
                <CardElement options={CARD_ELEMENT_OPTIONS} billingAddress shippingAddress />
            </div>

            <div style={{ width: '100%' }}>
                {loading ? <LinearProgress /> : null}
            </div>

            {
                error ?
                    <div className="error">
                        {error}
                    </div>
                    : null
            }

            <button onClick={handleSubmit} type="submit" className={`cont_order ${(!stripe || loading) ? 'disabled' : ''}`} disabled={!stripe || loading}>
                {
                    loading || !stripe ?
                        'Processing Payment'
                        : success ?
                            success :
                            `Pay $${props.orderPrice}`
                }
            </button>
            <div className="footer">
                we do not store any of your card information.
            </div>
            <div className="footer">
                powered by Stripe
            </div>
        </form>
    );
}