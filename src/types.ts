import * as THREE from "three";

export interface CelestialBodyParams {
  name: string;
  scale: number;
  texture: string;
  axialTilt: number;
  rotationSpeed: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
  orbitRadius: number;
  orbitSpeed: number;
  rings?: RingsParams;
  satellites?: {
    [key: string]: CelestialBodyParams;
  };
}

export interface CelestialBody {
  celestialBody: THREE.Object3D;
  orbit: THREE.Object3D;
  rotationSpeed: number;
  orbitSpeed: number;
  rings?: Rings;
  satellites?: CelestialBody[];
}

export interface RingsParams {
  scale: number;
  angle: number;
  rotationSpeed: number;
}

interface Rings {
  rings: THREE.Object3D;
  rotationSpeed: number;
}
