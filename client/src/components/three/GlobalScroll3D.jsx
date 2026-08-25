import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useApi';

// -- ERROR BOUNDARY FOR MISSING MODEL --
class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// -- 1. BMW M5 MODEL --
function BMWM5Car({ scrollYProgress }) {
  const carRef = useRef();
  const currentPosition = useRef(new THREE.Vector3(0, 0, 0));
  
  // Use the newly downloaded realistic sports car model
  const { scene } = useGLTF('/models/sports_car.glb');

  // Configure materials for realistic rendering (optional, depends on the glb)
  useMemo(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  useFrame((state, delta) => {
    if (!carRef.current) return;
    const scroll = scrollYProgress.get(); 
    
    // Road length 300, car drives from 0 to -200
    const targetZ = scroll * -200;
    
    // Subtle suspension movement
    const suspensionY = Math.sin(state.clock.elapsedTime * 10) * 0.005;
    const chassisRoll = Math.sin(state.clock.elapsedTime * 3) * 0.005;
    
    // Set position directly without damping for 0 lag/rubber-banding
    carRef.current.position.z = targetZ;
    carRef.current.position.y = suspensionY;
    carRef.current.rotation.z = chassisRoll;
    
    currentPosition.current.copy(carRef.current.position);
  });

  return (
    <group ref={carRef}>
      {/* Scale and position adjustments might be needed depending on the downloaded model */}
      <primitive object={scene} scale={0.8} rotation={[0, 0, 0]} position={[0, 0.1, 0]} />

      {/* Headlight beams */}
      <spotLight position={[-0.7, 0.5, -2.3]} angle={0.5} penumbra={0.5} intensity={5} color="#ffffff" distance={50}>
        <object3D position={[-0.7, 0, -20]} attach="target" />
      </spotLight>
      <spotLight position={[0.7, 0.5, -2.3]} angle={0.5} penumbra={0.5} intensity={5} color="#ffffff" distance={50}>
        <object3D position={[0.7, 0, -20]} attach="target" />
      </spotLight>
    </group>
  );
}

// -- 1B. FALLBACK PROCEDURAL CAR --
function ProceduralCarFallback({ scrollYProgress }) {
  const carRef = useRef();
  
  const paintMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#090a0f', metalness: 0.8, roughness: 0.2, clearcoat: 1.0, clearcoatRoughness: 0.1 }), []);
  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#000000', metalness: 0.5, roughness: 0, transmission: 0.9, ior: 1.5, transparent: true }), []);
  const rubberMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#050505', roughness: 0.9, metalness: 0.1 }), []);
  const alloyMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#aaaaaa', roughness: 0.2, metalness: 1.0 }), []);

  useFrame((state, delta) => {
    if (!carRef.current) return;
    const scroll = scrollYProgress.get(); 
    const targetZ = scroll * -200;
    const suspensionY = Math.sin(state.clock.elapsedTime * 10) * 0.01;
    const chassisRoll = Math.sin(state.clock.elapsedTime * 3) * 0.01;
    
    // Set directly for zero lag
    carRef.current.position.z = targetZ;
    carRef.current.position.y = suspensionY;
    carRef.current.rotation.z = chassisRoll;
  });

  return (
    <group ref={carRef}>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow material={paintMaterial}>
        <boxGeometry args={[1.9, 0.4, 4.5]} />
      </mesh>
      <mesh position={[0, 0.35, -2.1]} rotation={[0.2, 0, 0]} castShadow material={paintMaterial}>
        <boxGeometry args={[1.8, 0.3, 0.6]} />
      </mesh>
      <mesh position={[0, 0.8, 0.2]} castShadow material={glassMaterial}>
        <boxGeometry args={[1.4, 0.45, 2.2]} />
      </mesh>
      <mesh position={[0, 1.03, 0.2]} castShadow material={paintMaterial}>
        <boxGeometry args={[1.3, 0.05, 1.8]} />
      </mesh>

      {/* Wheels */}
      <group position={[-1.0, 0.35, -1.5]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={rubberMaterial} castShadow><cylinderGeometry args={[0.35, 0.35, 0.3, 32]} /></mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} material={alloyMaterial}><cylinderGeometry args={[0.25, 0.25, 0.32, 16]} /></mesh>
      </group>
      <group position={[1.0, 0.35, -1.5]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={rubberMaterial} castShadow><cylinderGeometry args={[0.35, 0.35, 0.3, 32]} /></mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} material={alloyMaterial}><cylinderGeometry args={[0.25, 0.25, 0.32, 16]} /></mesh>
      </group>
      <group position={[-1.0, 0.4, 1.4]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={rubberMaterial} castShadow><cylinderGeometry args={[0.4, 0.4, 0.35, 32]} /></mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} material={alloyMaterial}><cylinderGeometry args={[0.3, 0.3, 0.37, 16]} /></mesh>
      </group>
      <group position={[1.0, 0.4, 1.4]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={rubberMaterial} castShadow><cylinderGeometry args={[0.4, 0.4, 0.35, 32]} /></mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} material={alloyMaterial}><cylinderGeometry args={[0.3, 0.3, 0.37, 16]} /></mesh>
      </group>
      
      {/* Headlights & Taillights */}
      <mesh position={[-0.7, 0.5, -2.26]}><boxGeometry args={[0.5, 0.08, 0.05]} /><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} /></mesh>
      <mesh position={[0.7, 0.5, -2.26]}><boxGeometry args={[0.5, 0.08, 0.05]} /><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} /></mesh>
      <spotLight position={[-0.7, 0.5, -2.3]} angle={0.5} penumbra={0.5} intensity={5} color="#ffffff" distance={50}>
        <object3D position={[-0.7, 0, -20]} attach="target" />
      </spotLight>
      <spotLight position={[0.7, 0.5, -2.3]} angle={0.5} penumbra={0.5} intensity={5} color="#ffffff" distance={50}>
        <object3D position={[0.7, 0, -20]} attach="target" />
      </spotLight>
      <mesh position={[-0.7, 0.55, 2.26]}><boxGeometry args={[0.6, 0.1, 0.05]} /><meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={4} /></mesh>
      <mesh position={[0.7, 0.55, 2.26]}><boxGeometry args={[0.6, 0.1, 0.05]} /><meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={4} /></mesh>
    </group>
  );
}

// -- 2. REALISTIC HIGHWAY --
function RealisticHighway() {
  const roadLength = 300;
  
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -roadLength/2 + 20]} receiveShadow>
        <planeGeometry args={[16, roadLength]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.85} metalness={0.1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-8.5, 0.01, -roadLength/2 + 20]} receiveShadow>
        <planeGeometry args={[1, roadLength]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[8.5, 0.01, -roadLength/2 + 20]} receiveShadow>
        <planeGeometry args={[1, roadLength]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>

      {Array.from({ length: 60 }).map((_, i) => (
        <mesh key={`line-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -i * 5 + 20]}>
          <planeGeometry args={[0.2, 2.5]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
      ))}

      {Array.from({ length: 15 }).map((_, i) => (
        <group key={`light-${i}`} position={[-9, 0, -i * 20]}>
          <mesh position={[0, 4, 0]}><cylinderGeometry args={[0.1, 0.1, 8, 8]} /><meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} /></mesh>
          <mesh position={[1, 7.9, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.08, 0.08, 2, 8]} /><meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} /></mesh>
          <mesh position={[2, 7.8, 0]}><boxGeometry args={[0.6, 0.2, 0.4]} /><meshStandardMaterial color="#111" /></mesh>
          <mesh position={[2, 7.7, 0]}><boxGeometry args={[0.4, 0.05, 0.2]} /><meshStandardMaterial color="#ffeedd" emissive="#ffeedd" emissiveIntensity={2} /></mesh>
          <spotLight position={[2, 7.7, 0]} angle={0.8} penumbra={0.5} intensity={4} color="#ffeedd" distance={30}>
            <object3D position={[2, 0, 0]} attach="target" />
          </spotLight>
        </group>
      ))}
    </group>
  );
}

// -- 4. SCENE --
function Scene({ isMobile, scrollYProgress }) {
  const { camera } = useThree();
  const targetLookAt = useRef(new THREE.Vector3(0, 1, 0));

  useFrame((state, delta) => {
    const scroll = scrollYProgress.get();
    const speed = scrollYProgress.getVelocity() || 0;
    
    const carZ = scroll * -200;

    const swayX = Math.sin(scroll * Math.PI * 2) * 1.5 + (speed * -2);
    
    const targetCamX = swayX;
    const targetCamY = 3.0;
    const targetCamZ = carZ + 8;

    // Camera locks closely to the car
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 30, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 30, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 30, delta);
    
    const lookAtX = Math.sin((scroll + 0.05) * Math.PI * 2) * 1.5;
    const lookAtZ = carZ - 15;
    
    targetLookAt.current.x = THREE.MathUtils.damp(targetLookAt.current.x, lookAtX, 15, delta);
    targetLookAt.current.y = THREE.MathUtils.damp(targetLookAt.current.y, 1, 15, delta);
    targetLookAt.current.z = THREE.MathUtils.damp(targetLookAt.current.z, lookAtZ, 15, delta);
    
    camera.lookAt(targetLookAt.current);
  });

  return (
    <>
      <fog attach="fog" args={['#080b12', 15, 80]} />
      
      <ambientLight intensity={1.5} color="#8899aa" />
      <directionalLight position={[10, 20, 10]} intensity={2.0} color="#ffffff" castShadow />
      <directionalLight position={[-10, 5, -10]} intensity={1.5} color="#6366F1" />
      <pointLight position={[0, 5, -5]} intensity={3.0} color="#00C8FF" distance={50} />
      
      <RealisticHighway />
      
      {/* Attempt to load BMW M5, fallback to Procedural Car if missing */}
      <ModelErrorBoundary fallback={<ProceduralCarFallback scrollYProgress={scrollYProgress} />}>
        <Suspense fallback={<ProceduralCarFallback scrollYProgress={scrollYProgress} />}>
          <BMWM5Car scrollYProgress={scrollYProgress} />
        </Suspense>
      </ModelErrorBoundary>
    </>
  );
}

export default function GlobalScroll3D() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { scrollYProgress } = useScroll();

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#080b12'
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 3, 8], fov: 50 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        gl={{ antialias: !isMobile, alpha: false, powerPreference: "high-performance" }}
        shadows
      >
        <color attach="background" args={['#080b12']} />
        <Suspense fallback={null}>
          <Scene isMobile={isMobile} scrollYProgress={scrollYProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
