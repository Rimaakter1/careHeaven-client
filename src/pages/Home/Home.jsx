import React from 'react';
import Banner from '../../components/Banner/Banner';
import About from '../../components/About/About';
import PopularCamps from '../../components/PopularCamps/PopularCamps';
import FeedbackAndRatings from '../../components/FeedbacksAndRatings/FeedbackAndRatings';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <PopularCamps></PopularCamps>
            <FeedbackAndRatings></FeedbackAndRatings>
        </div>
    );
};

export default Home;