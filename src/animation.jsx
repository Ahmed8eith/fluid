import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { Fluid } from '@whatisjery/react-fluid-distortion';
import { useEffect, useState, Suspense } from 'react';

const FluidBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX / window.innerWidth,
        y: 1 - event.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, 
        pointerEvents: 'none'
      }}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "default", 
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <EffectComposer>
            <Fluid
              radius={0.1}
              curl={20}
              swirl={500}
              distortion={100}
              force={2.5}
              pressure={0.15}
              densityDissipation={0.97}
              velocityDissipation={0.97}
              intensity={0.7}
              rainbow={false}
              blend={0}
              showBackground={true}
              backgroundColor="#000"
              fluidColor="#4b968e"
              mouse={[mousePosition.x, mousePosition.y]}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FluidBackground;