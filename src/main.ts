import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import planetParams from "./planet-params";

import type { CelestialBodyParams, CelestialBody, RingsParams } from "./types";

const preloader = document.getElementById("preloader");
let loadedTextures = 0;
const totalTextures = 24;

const checkAllTexturesLoaded = () => {
  loadedTextures++;

  if (loadedTextures === totalTextures && preloader) {
    preloader.remove();
  }
};

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const textureLoader = new THREE.TextureLoader();

const scene = new THREE.Scene();

const skybox = new THREE.Mesh(
  new THREE.SphereGeometry(400, 64, 64),
  new THREE.MeshBasicMaterial({
    map: textureLoader.load("/textures/8k_stars.jpg", checkAllTexturesLoaded),
    side: THREE.BackSide,
  }),
);
scene.add(skybox);

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(4, 64, 64),
  new THREE.MeshBasicMaterial({
    map: textureLoader.load("/textures/sun.jpg", checkAllTexturesLoaded),
  }),
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
      new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius),
    );
  }

  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: "gray" }),
  );

  target.add(line);

  return new THREE.Group();
};

const createRings = (
  { scale, angle, rotationSpeed }: RingsParams,
  target: THREE.Object3D,
) => {
  const innerRadius = scale * 1.2;
  const outerRadius = scale * 2.0;
  const geometry = new THREE.RingGeometry(innerRadius, outerRadius);
  geometry.rotateX(-Math.PI / 2);

  const pos = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  const v3 = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v3.fromBufferAttribute(pos, i);
    uv.setXY(i, v3.length() < (innerRadius + outerRadius) / 2 ? 0 : 1, 1);
  }

  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(
      "/textures/saturn_ring.png",
      checkAllTexturesLoaded,
    ),
    color: "gray",
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
  });

  const rings = new THREE.Mesh(geometry, material);

  rings.rotation.x = THREE.MathUtils.degToRad(angle);

  target.add(rings);

  return { rings, rotationSpeed };
};

const createLabel = (
  text: string,
  position: THREE.Vector3,
  target: THREE.Object3D,
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
    axialTilt,
    rotationSpeed,
    position,
    orbitRadius,
    orbitSpeed,
    rings,
    satellites,
  }: CelestialBodyParams,
  target: THREE.Object3D = scene,
): CelestialBody => {
  const orbit = createOrbit(orbitRadius, target);

  const celestialBodyGroup = new THREE.Group();

  const celestialBody = new THREE.Mesh(
    new THREE.SphereGeometry(scale),
    new THREE.MeshStandardMaterial({
      map: textureLoader.load(`/textures/${texture}`, checkAllTexturesLoaded),
    }),
  );

  celestialBody.rotation.x = THREE.MathUtils.degToRad(axialTilt);

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
        createCelestialBody(satellite, celestialBodyGroup),
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
  createCelestialBody(params),
);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(28, 28, 28);

const renderer = new THREE.WebGLRenderer({ antialias: true });
const canvas = renderer.domElement;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(canvas);

const controls = new OrbitControls(camera, canvas);
controls.maxDistance = 150;
controls.enableDamping = true;

const clock = new THREE.Clock();

const SPEED = 0.25;
const ROTATION_SPEED = 0.01;
const ORBIT_SPEED = 1;

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
) => {
  orbit.rotation.y =
    elapsedTime * Math.log(1 + orbitSpeed) * SPEED * ORBIT_SPEED;

  celestialBody.rotation.y =
    elapsedTime * rotationSpeed * SPEED * ROTATION_SPEED;

  if (rings) {
    rings.rings.rotation.y =
      elapsedTime * rings.rotationSpeed * SPEED * ROTATION_SPEED;
  }

  if (satellites) {
    satellites.forEach((satellite) =>
      rotateCelestialBody(satellite, elapsedTime),
    );
  }
};

function animate() {
  const elapsedTime = clock.getElapsedTime();

  planets.forEach((planet) => rotateCelestialBody(planet, elapsedTime));
  sun.rotation.y = elapsedTime * sunRotationSpeed * SPEED * ROTATION_SPEED;

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
