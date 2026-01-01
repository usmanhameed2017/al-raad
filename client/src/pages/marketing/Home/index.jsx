import { Suspense, lazy } from "react";
import Hero from "../../../components/Hero";
import Loader from "../../../components/Loader";
import About from "../About";
import Contact from "../Contact";
const Tafseer = lazy(() => import("../Tafseer"));
const Books = lazy(() => import("../Books"));

function Home() 
{
    return (
        <div>
            <Hero 
            type="video" 
            src={`https://ik.imagekit.io/dgeoeu47w/assets/admin-panel-background.mp4?tr=orig`}
            heading="WELCOME TO AR-RA’D" 
            paragrapgh="Discover Tafseer, Books, and Daily Ayat"
            enableButton={true}
            buttonText="Get Started"/>
            <About />

            <Suspense fallback={ <div className="loaderContainer"> <Loader text={`Loading`} size="medium" /> </div> }>
                <Tafseer />
            </Suspense>
            
            <Suspense fallback={ <div className="loaderContainer"> <Loader text={`Loading`} size="medium" /> </div> }>
                <Books />
            </Suspense>
            
            <Contact />
        </div>
    );
}

export default Home;