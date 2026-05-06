import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';

const INSTANCE_COUNT = 15000;

interface MossProps {
  mouse: { x: number; y: number };
}

const Moss: React.FC<MossProps> = ({ mouse }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const { positions, scales, colors, baseHeights } = useMemo(() => {
    const positions = new Float32Array(INSTANCE_COUNT * 3);
    const scales = new Float32Array(INSTANCE_COUNT);
    const colors = new Float32Array(INSTANCE_COUNT * 3);
    const baseHeights = new Float32Array(INSTANCE_COUNT);

    const colorPalette = [
      new THREE.Color('#2d5a27'),
      new THREE.Color('#3d7a37'),
      new THREE.Color('#4d9a47'),
      new THREE.Color('#5aba57'),
      new THREE.Color('#1e4a17')
    ];

    for (let i = 0; i < INSTANCE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 4;
      
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(theta) * radius;

      scales[i] = 0.1 + Math.random() * 0.4;
      baseHeights[i] = 0.5 + Math.random() * 2;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, scales, colors, baseHeights };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const mouse3D = new THREE.Vector3(
      mouse.x * 10,
      0,
      mouse.y * 10
    );

    for (let i = 0; i < INSTANCE_COUNT; i++) {
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];
      
      const distance = Math.sqrt(
        Math.pow(mouse3D.x - x, 2) + Math.pow(mouse3D.z - z, 2)
      );

      const influence = Math.max(0, 1 - distance / 4);
      const height = baseHeights[i] + influence * 3 + Math.sin(state.clock.elapsedTime * 2 + i * 0.01) * 0.2;
      
      dummy.position.set(x, height / 2, z);
      dummy.scale.set(scales[i], height, scales[i]);
      dummy.rotation.y = Math.sin(state.clock.elapsedTime + i * 0.05) * 0.3;
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, new THREE.Color(
        colors[i * 3] + influence * 0.3,
        colors[i * 3 + 1] + influence * 0.2,
        colors[i * 3 + 2]
      ));
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, INSTANCE_COUNT]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[0.15, 1, 0.15]} />
      <meshStandardMaterial
        roughness={0.8}
        metalness={0.1}
      />
    </instancedMesh>
  );
};

const Ground = () => {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
      receiveShadow
    >
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial
        color="#1a3a15"
        roughness={0.9}
      />
    </mesh>
  );
};

export default function MossScene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouse({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'radial-gradient(ellipse at center, #0f2a0a 0%, #051003 100%)'
      }}
      onMouseMove={handleMouseMove}
    >
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 6, 8]} fov={50} />
        <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.2} />
        
        <color attach="background" args={['#051003']} />
        
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        >
          <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
        </directionalLight>
        <pointLight position={[-5, 5, -5]} intensity={1} color="#4dff4d" />
        
        <Environment preset="forest" />
        <SoftShadows size={10} samples={10} focus={0} />
        
        <Ground />
        <Moss mouse={mouse} />
      </Canvas>
    </div>
  );
}
