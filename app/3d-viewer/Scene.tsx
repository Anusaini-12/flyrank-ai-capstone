"use client";

import { Canvas } from "@react-three/fiber";
import { Center, ContactShadows, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Leva, useControls } from "leva";
import { useEffect } from "react";
import type { Material } from "three";

type HeadphonesModelProps = {
  color: string;
  metalness: number;
  roughness: number;
  wireframe: boolean;
};

function applyMaterialSettings(material: Material, color: string, metalness: number, roughness: number, wireframe: boolean) {
  const typedMaterial = material as Material & {
    color?: { set: (value: string) => void };
    metalness?: number;
    roughness?: number;
    wireframe?: boolean;
  };

  if (typedMaterial.color) {
    typedMaterial.color.set(color);
  }

  if (typeof typedMaterial.metalness === "number") {
    typedMaterial.metalness = metalness;
  }

  if (typeof typedMaterial.roughness === "number") {
    typedMaterial.roughness = roughness;
  }

  if (typeof typedMaterial.wireframe === "boolean") {
    typedMaterial.wireframe = wireframe;
  }
}

function HeadphonesModel({ color, metalness, roughness, wireframe }: HeadphonesModelProps) {
  const { scene } = useGLTF("/models/headphones.glb");

  useEffect(() => {
    scene.traverse((child) => {
      const maybeMaterial = "material" in child ? (child as { material?: Material | Material[] }).material : undefined;

      if (!maybeMaterial) {
        return;
      }

      if (Array.isArray(maybeMaterial)) {
        maybeMaterial.forEach((entry) => applyMaterialSettings(entry, color, metalness, roughness, wireframe));
        return;
      }

      applyMaterialSettings(maybeMaterial, color, metalness, roughness, wireframe);
    });
  }, [scene, color, metalness, roughness, wireframe]);

  return (
    <Center>
      <primitive
        object={scene}
        rotation={[0.15, 0.7, 0]}
        scale={0.1}
      />
    </Center>
  );
}

export default function Scene() {
  const { color, metalness, roughness, wireframe, autoRotate, autoRotateSpeed } = useControls({
   color: "#ff4da6",
    metalness: { value: 0.72, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.38, min: 0, max: 1, step: 0.01 },
    wireframe: false,
    autoRotate: false,
    autoRotateSpeed: { value: 1.5, min: 0, max: 8, step: 0.1 },
  });

  return (
    <>
     <Leva />
      <div className="h-[600px] w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950">
        <Canvas camera={{ position: [0, 0.8, 2.8], fov: 35 }}>
          <color attach="background" args={["#050816"]} />
          <ambientLight intensity={0.9} />
          <directionalLight position={[4, 5, 3]} intensity={1.6} color="#ffffff" />
          <Environment preset="city" />

          <HeadphonesModel
            color={color}
            metalness={metalness}
            roughness={roughness}
            wireframe={wireframe}
          />

          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.6}
            scale={6}
            blur={2.5}
            far={2.75}
            resolution={1024}
            color="#000000"
          />

          <OrbitControls
            enableDamping
            enablePan={false}
            minDistance={1.5}
            maxDistance={5}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
          />
        </Canvas>
      </div>
    </>
  );
}
