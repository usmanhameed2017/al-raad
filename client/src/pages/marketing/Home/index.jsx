import Hero from "../../../components/Hero";
import About from "../About";
import Contact from "../Contact";

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
        </div>
    );
}

export default Home;