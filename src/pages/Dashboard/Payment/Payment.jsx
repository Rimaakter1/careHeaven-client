import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CheckoutForm from "../../../components/Dashboard/CheckoutForm/CheckoutForm";
import Loading from "../../../components/Loading/Loading";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const { id } = useParams();
    const { data: participant = {}, isLoading, error } = useQuery({
        queryKey: ["participant", id],
        queryFn: async () => {
            const response = await axios.get(`https://care-heaven-server.vercel.app/participant/${id}`, {
                withCredentials: true,
            });
            return response.data;
        },
    });
    if (isLoading) return <Loading></Loading>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Payment for {participant?.campName}</h1>
            <p>Amount: ${participant?.fees}</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm participant={participant} />
            </Elements>
        </div>
    );
};

export default Payment;
