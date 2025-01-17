import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import "./style.css";

interface CelestialBodyParams {
  target?: THREE.Object3D;
  scale: number;
  texture: string;
  rotationSpeed: number;
  orbitRadius: number;
  orbitSpeed: number;
  satellites?: CelestialBodyParams[];
}

interface CelestialBody {
  celestialBody: THREE.Object3D;
  orbit: THREE.Object3D;
  rotationSpeed: number;
  orbitSpeed: number;
  children?: CelestialBody[];
}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const textureLoader = new THREE.TextureLoader();

const scene = new THREE.Scene();
scene.background = textureLoader.load("/textures/space.jpg");

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(2),
  new THREE.MeshBasicMaterial({ map: textureLoader.load("/textures/sun.jpg") })
);
const sunRotationSpeed = 0.01;
scene.add(sun);

const light = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(light);

const sunLight = new THREE.PointLight(0xffffff, 250, 250);
scene.add(sunLight);

const createOrbit = (radius: number, target: THREE.Object3D) => {
  const points = [];
  const segments = 100;

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;

    points.push(
      new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
    );
  }

  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: "gray" })
  );

  target.add(line);

  return new THREE.Group();
};

const createCelestialBody = ({
  target = scene,
  scale,
  texture,
  rotationSpeed,
  orbitRadius,
  orbitSpeed,
  satellites,
}: CelestialBodyParams): CelestialBody => {
  const orbit = createOrbit(orbitRadius, target);

  const celestialBodyGroup = new THREE.Group();

  const celestialBody = new THREE.Mesh(
    new THREE.SphereGeometry(scale),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(`/textures/${texture}.jpg`),
    })
  );

  celestialBodyGroup.position.set(orbitRadius, 0, 0);

  celestialBodyGroup.add(celestialBody);

  orbit.add(celestialBodyGroup);

  target.add(orbit);

  const children = satellites?.map((satellite) =>
    createCelestialBody({ ...satellite, target: celestialBodyGroup })
  );

  return {
    celestialBody,
    orbit,
    rotationSpeed,
    orbitSpeed,
    children,
  };
};

const planets = {
  mercury: createCelestialBody({
    scale: 0.3,
    texture: "mercury",
    rotationSpeed: 0.017,
    orbitRadius: 4,
    orbitSpeed: 0.24,
  }),
  venus: createCelestialBody({
    scale: 0.7,
    texture: "venus",
    rotationSpeed: -0.004,
    orbitRadius: 7,
    orbitSpeed: 0.3,
  }),
  earth: createCelestialBody({
    scale: 0.8,
    texture: "earth",
    rotationSpeed: 0.02,
    orbitRadius: 10,
    orbitSpeed: 0.15,
    satellites: [
      {
        scale: 0.2,
        texture: "moon",
        rotationSpeed: 0.05,
        orbitRadius: 1.5,
        orbitSpeed: 0.4,
      },
    ],
  }),
  mars: createCelestialBody({
    scale: 0.5,
    texture: "mars",
    rotationSpeed: 0.02,
    orbitRadius: 15,
    orbitSpeed: 0.2,
    satellites: [
      {
        scale: 0.1,
        texture: "phobos",
        rotationSpeed: 0.02,
        orbitRadius: 0.8,
        orbitSpeed: 0.4,
      },
      {
        scale: 0.05,
        texture: "deimos",
        rotationSpeed: 0.01,
        orbitRadius: 1.2,
        orbitSpeed: 0.5,
      },
    ],
  }),
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(16, 12, 16);

const renderer = new THREE.WebGLRenderer({ antialias: true });
const canvas = renderer.domElement;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(canvas);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

const rotateCelestialBody = (
  { celestialBody, orbit, rotationSpeed, orbitSpeed, children }: CelestialBody,
  elapsedTime: number
) => {
  orbit.rotation.y = elapsedTime * orbitSpeed;
  celestialBody.rotation.y += rotationSpeed;

  children?.forEach((child) => rotateCelestialBody(child, elapsedTime));
};

function animate() {
  const elapsedTime = clock.getElapsedTime();

  Object.values(planets).forEach((planet) =>
    rotateCelestialBody(planet, elapsedTime)
  );

  sun.rotation.y += sunRotationSpeed;

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
});

window.addEventListener("dblclick", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen();
  }
});
