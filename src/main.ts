import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import planetParams from "./planet-params";

import type { CelestialBodyParams, CelestialBody, RingsParams } from "./types";

import "./style.css";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const textureLoader = new THREE.TextureLoader();

const scene = new THREE.Scene();
scene.background = textureLoader.load("/textures/space.jpg");

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(5),
  new THREE.MeshBasicMaterial({ map: textureLoader.load("/textures/sun.jpg") })
);
const sunRotationSpeed = 14.6;
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

const createRings = (
  { scale, angle, rotationSpeed }: RingsParams,
  target: THREE.Object3D
) => {
  const geometry = new THREE.RingGeometry(scale * 1.2, scale * 1.8);
  geometry.rotateX(-Math.PI / 2);

  const material = new THREE.MeshStandardMaterial({
    color: "gray",
    side: THREE.DoubleSide,
  });

  const rings = new THREE.Mesh(geometry, material);

  const ringGroup = new THREE.Group();
  ringGroup.add(rings);

  ringGroup.rotation.x = THREE.MathUtils.degToRad(angle);

  target.add(ringGroup);

  return { rings: ringGroup, rotationSpeed };
};

const createLabel = (
  text: string,
  position: THREE.Vector3,
  target: THREE.Object3D
) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return;

  const fontSize = 50;
  canvas.width = 256;
  canvas.height = 128;

  context.font = `${fontSize}px Arial`;
  context.fillStyle = "white";
  context.textAlign = "center";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);

  sprite.scale.set(2, 1, 1);
  sprite.position.copy(position);

  target.add(sprite);
};

const createCelestialBody = (
  {
    name,
    scale,
    texture,
    rotationSpeed,
    position,
    orbitRadius,
    orbitSpeed,
    rings,
    satellites,
  }: CelestialBodyParams,
  target: THREE.Object3D = scene
): CelestialBody => {
  const orbit = createOrbit(orbitRadius, target);

  const celestialBodyGroup = new THREE.Group();

  const celestialBody = new THREE.Mesh(
    new THREE.SphereGeometry(scale),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(`/textures/${texture}`),
    })
  );

  celestialBodyGroup.position.set(position.x, position.y, position.z);

  celestialBodyGroup.add(celestialBody);

  orbit.add(celestialBodyGroup);

  target.add(orbit);

  createLabel(name, new THREE.Vector3(0, scale + 0.5, 0), celestialBodyGroup);

  const createdRings = rings
    ? createRings(rings, celestialBodyGroup)
    : undefined;

  const createdSatellites = satellites
    ? Object.values(satellites).map((satellite) =>
        createCelestialBody(satellite, celestialBodyGroup)
      )
    : undefined;

  return {
    celestialBody,
    orbit,
    rotationSpeed,
    orbitSpeed,
    satellites: createdSatellites,
    rings: createdRings,
  };
};

const planets = Object.values(planetParams).map((params) =>
  createCelestialBody(params)
);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(32, 24, 32);

const renderer = new THREE.WebGLRenderer({ antialias: true });
const canvas = renderer.domElement;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(canvas);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

const SPEED_COEFFICIENT = 1;
const ROTATION_SPEED_COEFFICIENT = 0.01;
const ORBIT_SPEED_COEFFICIENT = 0.5;
const SATELLITES_ORBIT_SPEED_COEFFICIENT = 0.01;

const rotateCelestialBody = (
  {
    celestialBody,
    orbit,
    rotationSpeed,
    orbitSpeed,
    rings,
    satellites,
  }: CelestialBody,
  elapsedTime: number,
  isSatellite = false
) => {
  orbit.rotation.y =
    elapsedTime *
    orbitSpeed *
    SPEED_COEFFICIENT *
    ORBIT_SPEED_COEFFICIENT *
    (isSatellite ? SATELLITES_ORBIT_SPEED_COEFFICIENT : 1);

  celestialBody.rotation.y =
    elapsedTime *
    rotationSpeed *
    SPEED_COEFFICIENT *
    ROTATION_SPEED_COEFFICIENT;

  if (rings) {
    rings.rings.rotation.y =
      elapsedTime *
      rings.rotationSpeed *
      SPEED_COEFFICIENT *
      ROTATION_SPEED_COEFFICIENT;
  }

  if (satellites) {
    satellites.forEach((satellite) =>
      rotateCelestialBody(satellite, elapsedTime, true)
    );
  }
};

function animate() {
  const elapsedTime = clock.getElapsedTime();

  planets.forEach((planet) => rotateCelestialBody(planet, elapsedTime));
  sun.rotation.y =
    elapsedTime *
    sunRotationSpeed *
    SPEED_COEFFICIENT *
    ROTATION_SPEED_COEFFICIENT;

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
