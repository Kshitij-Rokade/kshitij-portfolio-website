import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion, useMediaQuery } from '../../hooks/useApi';

function FloatingCodeBlock({ position, text, color = '#3B82F6' }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={ref} position={position}>
        <mesh>
          <planeGeometry args={[2.4, 0.6]} />
          <meshStandardMaterial color="#0B1220" transparent opacity={0.7} />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.12}
          color={color}
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff2"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
        >
          {text}
        </Text>
      </group>
    </Float>
  );
}

function DatabaseCylinder({ position }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.4, 0.6, 16]} />
          <meshStandardMaterial color="#06B6D4" wireframe transparent opacity={0.4} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.05, 16]} />
          <meshStandardMaterial color="#06B6D4" transparent opacity={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

function NetworkNode({ position, color = '#8B5CF6' }) {
  return (
    <Float speed={2} floatIntensity={0.3}>
      <mesh position={position}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </Float>
  );
}

function WireframeGeo({ position, type = 'icosahedron' }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  const geometry = type === 'icosahedron' 
    ? <icosahedronGeometry args={[0.8, 1]} />
    : <torusGeometry args={[0.6, 0.2, 8, 16]} />;

  return (
    <Float speed={0.8} floatIntensity={0.4}>
      <mesh ref={ref} position={position}>
        {geometry}
        <meshStandardMaterial color="#3B82F6" wireframe transparent opacity={0.15} />
      </mesh>
    </Float>
  );
}

function Particles({ count = 80 }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#3B82F6" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function ConnectionLines() {
  const points = useMemo(() => {
    return [
      new THREE.Vector3(-2, 1, 0),
      new THREE.Vector3(-0.5, 0.3, 0.5),
      new THREE.Vector3(1, -0.5, 0),
      new THREE.Vector3(2.5, -1, -0.5),
    ];
  }, []);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line>
      <bufferGeometry attach="geometry" {...lineGeometry} />
      <lineBasicMaterial color="#3B82F6" transparent opacity={0.15} />
    </line>
  );
}

function Scene({ isMobile }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#3B82F6" />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="#8B5CF6" />

      {/* Floating code fragments */}
      <FloatingCodeBlock position={[-3.5, 1.8, -1]} text="const App = () => {}" color="#3B82F6" />
      {!isMobile && <FloatingCodeBlock position={[3.2, 2, -2]} text="app.get('/api', handler)" color="#06B6D4" />}
      {!isMobile && <FloatingCodeBlock position={[2.5, -1.5, -1.5]} text="db.collection.find()" color="#10B981" />}

      {/* Wireframe structures */}
      <WireframeGeo position={[4, 0.5, -2]} type="icosahedron" />
      {!isMobile && <WireframeGeo position={[-4, -1, -3]} type="torus" />}

      {/* Database cylinder */}
      <DatabaseCylinder position={[3, -2, -1]} />

      {/* Network nodes */}
      <NetworkNode position={[-2, -0.5, 0]} color="#3B82F6" />
      <NetworkNode position={[0, 1, -1]} color="#8B5CF6" />
      <NetworkNode position={[2, 0.5, -0.5]} color="#06B6D4" />

      {/* Particles */}
      <Particles count={isMobile ? 30 : 80} />

      {/* Connection lines */}
      {!isMobile && <ConnectionLines />}

      {/* Central distorted sphere */}
      <Float speed={0.5} floatIntensity={0.3}>
        <Sphere args={[1.2, 32, 32]} position={[4.5, 1.5, -4]}>
          <MeshDistortMaterial
            color="#3B82F6"
            wireframe
            transparent
            opacity={0.08}
            distort={0.3}
            speed={1.5}
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function Hero3D() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (reducedMotion) {
    return (
      <div className="hero-bg" style={{
        background: 'var(--gradient-hero)',
      }} />
    );
  }

  return (
    <div className="hero-bg" style={{ opacity: 0.7 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        gl={{ antialias: !isMobile, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
