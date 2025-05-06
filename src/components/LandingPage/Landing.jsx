
import React from 'react';

import NavProvider from '../Navigation/NavProvider';
import PageSection from '../Navigation/PageSection';
import Faq from "./Faq/Faq";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import Section from "./Section/Section";
import Features from "./Features/Features";

function Landing ( ) {
  
  return (

    <NavProvider>

      <div>

        <Header/>

        <div className = "pt-[50px] mt-0">
          
          <PageSection id = "home">
            <Hero/>
          </PageSection>
          
          <PageSection id = "about">
            <Section/>
          </PageSection>
          
          <PageSection id = "features">
            <Features/>
          </PageSection>
          
          <PageSection id = "faq">
            <Faq/>
          </PageSection>
          
          <Footer/>

        </div>

      </div>

    </NavProvider>

  );
  
}

export default Landing;
