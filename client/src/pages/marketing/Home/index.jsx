import Hero from "../../../components/Hero";
import About from "../About";
import Books from "../Books";
import Contact from "../Contact";
import Tafseer from "../Tafseer";

function Home() 
{
    return (
        <div>
            <Hero 
            type="video" 
            src={`https://ik.imagekit.io/dgeoeu47w/assets/admin-panel-background.mp4?tr=orig`}
            heading="WELCOME TO AL-RA’AD" 
            paragrapgh="Discover Tafseer, Books, and Daily Ayat"
            enableButton={true}
            buttonText="Get Started"/>
            <About />
            <Contact />
            <Tafseer />
            <Books />
        </div>
    );
}

export default Home;