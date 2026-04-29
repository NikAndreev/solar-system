import * as THREE from "three";

export interface CelestialBodyConfig {
  name: string;
  size: number;
  texture: string;
  axialTilt: number;
  rotationSpeed: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
  orbitSpeed: number;
  rings?: {
    size: number;
    angle: number;
    rotationSpeed: number;
  };
  satellites?: {
    [key: string]: CelestialBodyConfig;
  };
}

export interface CelestialBody {
  object: THREE.Object3D;
  orbit: THREE.Object3D;
  rotationSpeed: number;
  orbitSpeed: number;
  rings?: {
    object: THREE.Object3D;
    rotationSpeed: number;
  };
  satellites?: CelestialBody[];
}
