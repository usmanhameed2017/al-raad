import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Stars Motion Component */
function MovingStars() 
{
    const starsRef = useRef();

    /* Continuous smooth motion */
    useFrame(({ clock }) => {
        if (!starsRef.current) return;
        starsRef.current.rotation.y = clock.getElapsedTime() * 0.03;
        starsRef.current.rotation.x = clock.getElapsedTime() * 0.015;
    });

    /* 📜 GSAP scroll interaction */
    useEffect(() => {
        if(!starsRef.current) return;

        gsap.to(starsRef.current.rotation, {
            y: "+=1.5",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
        });
    }, []);

    return (
        <Stars
        ref={starsRef}
        radius={120}
        depth={60}
        count={7000}
        factor={5}
        fade
        speed={2}
        />
    );
}

function TafseerBackground() 
{
    return (
        <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
        }}
        >
        <ambientLight intensity={0.6} />
        <MovingStars />
        </Canvas>
    );
}

export default TafseerBackground;
