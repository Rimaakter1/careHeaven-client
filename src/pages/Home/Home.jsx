import React from 'react';
import Banner from '../../components/Banner/Banner';
import About from '../../components/About/About';
import PopularCamps from '../../components/PopularCamps/PopularCamps';
import FeedbackAndRatings from '../../components/FeedbacksAndRatings/FeedbackAndRatings';
import Work from '../../components/Work/Work';
import Services from '../../components/Services/Services';
import OurNumbers from '../../components/OurNumbers/OurNumbers';
import OurApproach from '../../components/OurApproach/OurApproach';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <PopularCamps></PopularCamps>
            <Work></Work>
            <OurApproach></OurApproach>
            <Services></Services>
            <OurNumbers></OurNumbers>
            <FeedbackAndRatings></FeedbackAndRatings>
        </div>
    );
};

export default Home;