'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, Environment, ContactShadows } from '@react-three/drei';
import { useWatchStore } from '@/store/useWatchStore';
import * as THREE from 'three';

const ProceduralWatch = () => {
  const { caseShape, baseModel, designOptions } = useWatchStore();
  
  // Try to load texture. If designOptions.dialURL is null, fallback.
  const dialUrl = designOptions.dialURL || '/images/dial_white.png';
  const dialTexture = useTexture(dialUrl);

  const getCaseColor = () => {
    switch (baseModel) {
      case 'metal': return '#111111';
      case 'sports': return '#222222';
      default: return '#e0e0e0'; // classic silver
    }
  };

  const caseColor = getCaseColor();

  return (
    <group rotation={[Math.PI / 6, 0, 0]}>
      {/* CASE */}
      {caseShape === 'square' ? (
        <mesh position={[0, 0, -0.2]}>
          <boxGeometry args={[2.5, 2.5, 0.4]} />
          <meshStandardMaterial color={caseColor} metalness={0.8} roughness={0.2} />
        </mesh>
      ) : (
        <mesh position={[0, 0, -0.2]}>
          <cylinderGeometry args={[1.4, 1.4, 0.4, (caseShape === 'octagonal' || caseShape === 'octagonal-round') ? 8 : 64]} />
          <meshStandardMaterial color={caseColor} metalness={0.8} roughness={0.2} />
        </mesh>
      )}

      {/* STRAPS */}
      <mesh position={[0, 2, -0.2]}>
        <boxGeometry args={[1.2, 2.5, 0.1]} />
        <meshStandardMaterial color="#222" roughness={0.9} />
      </mesh>
      <mesh position={[0, -2, -0.2]}>
        <boxGeometry args={[1.2, 2.5, 0.1]} />
        <meshStandardMaterial color="#222" roughness={0.9} />
      </mesh>

      {/* DIAL (Face Plate) */}
      <mesh position={[0, 0, 0.01]}>
        {caseShape === 'square' ? (
          <planeGeometry args={[2.3, 2.3]} />
        ) : (
          <circleGeometry args={[1.3, (caseShape === 'octagonal' || caseShape === 'octagonal-round') ? 8 : 64]} />
        )}
        <meshBasicMaterial map={dialTexture} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* HANDS (Simple cylinders) */}
      {/* Hour Hand */}
      <mesh position={[0, 0.3, 0.05]} rotation={[0, 0, Math.PI/4]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={1} />
      </mesh>
      {/* Min Hand */}
      <mesh position={[0.2, -0.4, 0.06]} rotation={[0, 0, -Math.PI/6]}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={1} />
      </mesh>
      {/* Center Pin */}
      <mesh position={[0, 0, 0.07]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
        <meshStandardMaterial color="#cc0000" />
      </mesh>

      {/* GLASS (Transparent cap) */}
      <mesh position={[0, 0, 0.15]}>
        {caseShape === 'square' ? (
          <boxGeometry args={[2.4, 2.4, 0.05]} />
        ) : (
          <cylinderGeometry args={[1.35, 1.35, 0.05, (caseShape === 'octagonal' || caseShape === 'octagonal-round') ? 8 : 64]} />
        )}
        <meshPhysicalMaterial 
          transparent 
          opacity={0.3} 
          roughness={0} 
          transmission={0.9} 
          thickness={0.5} 
          clearcoat={1} 
          clearcoatRoughness={0} 
        />
      </mesh>

    </group>
  );
};

export default function WatchPreview3D() {
  return (
    <div className="w-full h-full max-w-md bg-[#111]/50 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/5 relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <ProceduralWatch />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={3} 
          maxDistance={10} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
    </div>
  );
}
