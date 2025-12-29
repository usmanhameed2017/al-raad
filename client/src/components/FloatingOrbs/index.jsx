import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Orb({ position, speed }) 
{
    const ref = useRef();

    useFrame(({ clock }) => {
        ref.current.position.y =
        Math.sin(clock.getElapsedTime() * speed) * 1.5;
    });

    return (
        <Sphere ref={ref} args={[0.4, 32, 32]} position={position}>
        <meshStandardMaterial
            color="#00bcd4"
            emissive="#00bcd4"
            emissiveIntensity={1.5}
            transparent
            opacity={0.8}
        />
        </Sphere>
    );
}

export default function FloatingOrbs() 
{
    return (
        <>
            <Orb position={[-3, 1, -2]} speed={0.8} />
            <Orb position={[2, -1, -3]} speed={1.1} />
            <Orb position={[0, 2, -4]} speed={0.6} />
        </>
    );
}