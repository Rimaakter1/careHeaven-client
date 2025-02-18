import React from 'react';
import Banner from '../../components/Banner/Banner';
import About from '../../components/About/About';
import PopularCamps from '../../components/PopularCamps/PopularCamps';
import FeedbackAndRatings from '../../components/FeedbacksAndRatings/FeedbackAndRatings';
import Work from '../../components/Work/Work';
import Services from '../../components/Services/Services';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <PopularCamps></PopularCamps>
            <Work></Work>
            <Services></Services>
            <FeedbackAndRatings></FeedbackAndRatings>
        </div>
    );
};

export default Home;