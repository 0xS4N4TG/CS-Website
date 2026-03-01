"use client";

import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function TextModel() {
  const ref = useRef<THREE.Group | null>(null);
  const { scene } = useGLTF("/ieeecs.glb");

  useEffect(() => {
    if (ref.current) {
     
      ref.current.rotation.x = Math.PI / 2;
    }

    // Center model
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
  }, [scene]);

  return <primitive ref={ref} object={scene} scale={3} />;
}