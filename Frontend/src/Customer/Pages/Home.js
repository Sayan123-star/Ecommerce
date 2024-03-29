import React from 'react'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import HomeCover from '../Components/HomeCover';
import Slider from '../Components/Slider';
import MetaData from '../Components/MetaData'
function Home() {
    return ( 
        <>
        {/* Creating metadata and the home cover and slider components */}
        <MetaData title="Ecommerce" />
        <HomeCover />
        <Slider />
        </>
    );
}

export default Home;