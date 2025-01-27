import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CheckoutForm from "../../../components/Dashboard/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const { id } = useParams();

    const { data: camp = {}, isLoading, error } = useQuery({
        queryKey: ["camp", id],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/participant/${id}`, {
                withCredentials: true,
            });
            return response.data;
        },
    });
    console.log(camp);

    if (isLoading) return <p>Loading camp details...</p>;
    if (error) return <p>Error fetching camp details.</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Payment for {camp.name}</h1>
            <p>Amount: ${camp.Fees}</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm camp={camp} />
            </Elements>
        </div>
    );
};

export default Payment;
