import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import { useIncidentStore } from '../../store/incidentStore';
import { Vector3 } from 'three';

const ThreeDMap: React.FC = () => {
  const { incidents, setSelectedIncident, toggleDetailModal } = useIncidentStore();
  
  const latLongToVector = (lat: number, lng: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    
    return [x, y, z];
  };
  
  const Hotspot = ({ position, size, color, incident }: { 
    position: [number, number, number],
    size: number,
    color: string,
    incident: any
  }) => {
    const [hovered, setHovered] = React.useState(false);
    const [scale, setScale] = React.useState(1);
    const pulseRef = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
      if (pulseRef.current && hovered) {
        pulseRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
      }
    });

    return (
      <group>
        {/* Hotspot */}
        <Sphere 
          args={[size, 16, 16]} 
          position={position}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIncident(incident);
            toggleDetailModal();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            setScale(1.2);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
            setScale(1);
            document.body.style.cursor = 'default';
          }}
          scale={scale}
        >
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={hovered ? 2 : 1}
          />
        </Sphere>
        
        {/* Pulse effect */}
        <Sphere 
          ref={pulseRef}
          args={[size * 1.2, 16, 16]} 
          position={position}
          scale={hovered ? 1 : 0}
        >
          <meshStandardMaterial 
            color={color} 
            emissive={color}
            emissiveIntensity={2}
            transparent
            opacity={0.3}
          />
        </Sphere>
        
        {/* Text label */}
        {hovered && (
          <Text
            position={[position[0], position[1] + size * 2, position[2]]}
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
            renderOrder={1}
            depthTest={false}
          >
            {incident.title}
          </Text>
        )}
      </group>
    );
  };
  
  const Globe = () => {
    const globeRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
      if (globeRef.current) {
        globeRef.current.rotation.y += 0.001;
      }
    });
    
    return (
      <group ref={globeRef}>
        {/* Earth */}
        <Sphere args={[1, 64, 64]}>
          <meshStandardMaterial 
            color="#0A2342" 
            wireframe 
            transparent
            opacity={0.7}
          />
        </Sphere>
        
        {/* Grid */}
        <Sphere args={[1.001, 32, 32]}>
          <meshStandardMaterial 
            color="#0066ff" 
            wireframe 
            transparent
            opacity={0.3}
            emissive="#0066ff"
            emissiveIntensity={0.5}
          />
        </Sphere>
        
        {/* Incident hotspots */}
        {incidents.map((incident) => {
          const position = latLongToVector(
            incident.location.lat, 
            incident.location.lng, 
            1.05
          ) as [number, number, number];
          
          let color = "#00B0FF";
          let size = 0.02;
          
          switch (incident.severity) {
            case "Critical":
              color = "#FF1744";
              size = 0.035;
              break;
            case "High":
              color = "#FF9100";
              size = 0.03;
              break;
            case "Medium":
              color = "#FFEA00";
              size = 0.025;
              break;
            default:
              break;
          }
          
          return (
            <Hotspot 
              key={incident.id}
              position={position}
              size={size}
              color={color}
              incident={incident}
            />
          );
        })}
      </group>
    );
  };
  
  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Globe />
        <OrbitControls
          enableZoom={true}
          minDistance={1.5}
          maxDistance={4}
          autoRotate
          autoRotateSpeed={0.5}
          enablePan={false}
          maxPolarAngle={Math.PI - Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default ThreeDMap;