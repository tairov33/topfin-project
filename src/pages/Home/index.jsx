import React from 'react'
import AboutCompany from '../../components/AboutCompany'
import CategoriesBlock from '../../components/CategoriesBlock'
import Communication from '../../components/Communication'
import Complaints from '../../components/Complaints'
import Footer from '../../components/Footer'
import Gallery from '../../components/Gallery'
import Header from '../../components/Header'
import ScrollToTop from '../../components/ScrollToTop'
import Sertificates from '../../components/Sertificates'
import Services from '../../components/Services'
import Sponsors from '../../components/Sponsors'

const Home = () => {

    return (
        <>
            <Header/>
            <CategoriesBlock/>
            <AboutCompany/>
            <Services/>
            <Sponsors/>
            <Gallery/>
            <Communication/>
            <Sertificates/>
            <Complaints/>
            <Footer/>
            <ScrollToTop/>
        </>
    )
}

export default Home