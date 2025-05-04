import Faq from "./Faq/Faq"
import Footer from "./Footer/Footer"
import Header from "./Header/Header"
import Hero from "./Hero/Hero"
import Section from "./Section/Section"


function Landing() {
  

  return (
    <>
      <div>
       <Header/>
       <Hero/>
       <Section/>
        <Faq/>
        <Footer/>
      </div>
    </>
  )
}

export default Landing
