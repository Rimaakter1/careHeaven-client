import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";


const CheckoutForm = ({ participant }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (participant.fees > 0) {
            axios.post('http://localhost:5000/create-payment-intent', { campFees: participant.fees }, {
                withCredentials: true
            })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message);
        }
        else {
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "confirm error",
            });
        }

        else {
            if (paymentIntent.status === 'succeeded') {
                const payment = {
                    email: user.email,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: 'pending',
                    participantId: participant._id
                }
                const res = await axios.post('http://localhost:5000/payments', payment);
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        title: 'Payment Successfully Added',
                        html: `<p>Transaction Id: ${paymentIntent.id}</p>`,
                        icon: "success",
                        draggable: true
                    });

                    navigate('/dashboard/payment-history')
                }

            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
        </form>
    );
};

export default CheckoutForm;