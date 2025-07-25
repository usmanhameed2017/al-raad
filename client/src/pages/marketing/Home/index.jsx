import Hero from "../../../components/Hero";
import About from "../About";

function Home() 
{
    return (
        <div>
            <Hero 
            type="video" 
            src="/public/hero-section-video.mp4" 
            heading="WELCOME TO AL-RA’AD" 
            paragrapgh="Discover Tafseer, Books, and Daily Ayat"
            enableButton={true}
            buttonText="Get Started"/>
            <About />
        </div>
    );
}

export default Home;