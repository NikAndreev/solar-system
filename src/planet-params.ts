const planetParams = {
  mercury: {
    name: "Меркурий",
    scale: 0.38,
    texture: "mercury.jpg",
    rotationSpeed: 0.0167,
    position: {
      x: 8,
      y: 0,
      z: 0,
    },
    orbitRadius: 8,
    orbitSpeed: 2,
  },
  venus: {
    name: "Венера",
    scale: 0.95,
    texture: "venus.jpg",
    rotationSpeed: -0.0049,
    position: {
      x: 0,
      y: 0,
      z: 12,
    },
    orbitRadius: 12,
    orbitSpeed: 1.6,
  },
  earth: {
    name: "Земля",
    scale: 1,
    texture: "earth.jpg",
    rotationSpeed: 1,
    position: {
      x: -16,
      y: 0,
      z: 0,
    },
    orbitRadius: 16,
    orbitSpeed: 1,
    satellites: {
      moon: {
        name: "Луна",
        scale: 0.25,
        texture: "moon.jpg",
        rotationSpeed: 0.5,
        position: {
          x: 1.5,
          y: 0,
          z: 0,
        },
        orbitRadius: 1.5,
        orbitSpeed: 0.5,
      },
    },
  },
  mars: {
    name: "Марс",
    scale: 0.53,
    texture: "mars.jpg",
    rotationSpeed: 1,
    position: {
      x: 0,
      y: 0,
      z: -20,
    },
    orbitRadius: 20,
    orbitSpeed: 0.8,
    satellites: {
      phobos: {
        name: "Фобос",
        scale: 0.15,
        texture: "satellite.jpg",
        rotationSpeed: 0.4,
        position: {
          x: 0.8,
          y: 0,
          z: 0,
        },
        orbitRadius: 0.8,
        orbitSpeed: 0.6,
      },
      deimos: {
        name: "Деймос",
        scale: 0.1,
        texture: "satellite.jpg",
        rotationSpeed: 0.6,
        position: {
          x: -1.2,
          y: 0,
          z: 0,
        },
        orbitRadius: 1.2,
        orbitSpeed: 0.4,
      },
    },
  },
  jupiter: {
    name: "Юпитер",
    scale: 1.5,
    texture: "jupiter.jpg",
    rotationSpeed: 2.4,
    position: {
      x: 24,
      y: 0,
      z: 0,
    },
    orbitRadius: 24,
    orbitSpeed: 0.6,
    satellites: {
      io: {
        name: "Ио",
        scale: 0.25,
        texture: "satellite.jpg",
        rotationSpeed: 0.6,
        position: {
          x: 2,
          y: 0,
          z: 0,
        },
        orbitRadius: 2,
        orbitSpeed: 0.6,
      },
      europe: {
        name: "Европа",
        scale: 0.22,
        texture: "satellite.jpg",
        rotationSpeed: 0.5,
        position: {
          x: 0,
          y: 0,
          z: 2.6,
        },
        orbitRadius: 2.6,
        orbitSpeed: 0.4,
      },
      ganymede: {
        name: "Ганимед",
        scale: 0.3,
        texture: "satellite.jpg",
        rotationSpeed: 0.4,
        position: {
          x: -3.2,
          y: 0,
          z: 0,
        },
        orbitRadius: 3.2,
        orbitSpeed: 0.5,
      },
      callisto: {
        name: "Каллисто",
        scale: 0.28,
        texture: "satellite.jpg",
        rotationSpeed: 0.7,
        position: {
          x: 0,
          y: 0,
          z: -3.8,
        },
        orbitRadius: 3.8,
        orbitSpeed: 0.3,
      },
    },
  },
  saturn: {
    name: "Сатурн",
    scale: 1.4,
    texture: "saturn.jpg",
    rotationSpeed: 2.2,
    position: {
      x: 0,
      y: 0,
      z: 28,
    },
    orbitRadius: 28,
    orbitSpeed: 0.5,
    rings: {
      scale: 1.4,
      angle: 30,
      rotationSpeed: 2.8,
    },
    satellites: {
      enceladus: {
        name: "Энцелад",
        scale: 0.1,
        texture: "satellite.jpg",
        rotationSpeed: 0.4,
        position: {
          x: 1.8,
          y: 0,
          z: 0,
        },
        orbitRadius: 1.8,
        orbitSpeed: 0.5,
      },
      rhea: {
        name: "Рея",
        scale: 0.15,
        texture: "satellite.jpg",
        rotationSpeed: 0.6,
        position: {
          x: 0,
          y: 0,
          z: 2.4,
        },
        orbitRadius: 2.4,
        orbitSpeed: 0.4,
      },
      titan: {
        name: "Титан",
        scale: 0.3,
        texture: "satellite.jpg",
        rotationSpeed: 0.5,
        position: {
          x: -3,
          y: 0,
          z: 0,
        },
        orbitRadius: 3,
        orbitSpeed: 0.6,
      },
    },
  },
  uranus: {
    name: "Уран",
    scale: 1.2,
    texture: "uranus.jpg",
    rotationSpeed: 2.2,
    position: {
      x: -32,
      y: 0,
      z: 0,
    },
    orbitRadius: 32,
    orbitSpeed: 0.4,
    satellites: {
      titania: {
        name: "Титания",
        scale: 0.15,
        texture: "satellite.jpg",
        rotationSpeed: 0.5,
        position: {
          x: 1.6,
          y: 0,
          z: 0,
        },
        orbitRadius: 1.6,
        orbitSpeed: 0.4,
      },
      oberon: {
        name: "Оберон",
        scale: 0.15,
        texture: "satellite.jpg",
        rotationSpeed: 0.4,
        position: {
          x: -2.2,
          y: 0,
          z: 0,
        },
        orbitRadius: 2.2,
        orbitSpeed: 0.6,
      },
    },
  },
  neptune: {
    name: "Нептун",
    scale: 1.2,
    texture: "neptune.jpg",
    rotationSpeed: 1.5,
    position: {
      x: 0,
      y: 0,
      z: -36,
    },
    orbitRadius: 36,
    orbitSpeed: 0.3,
    satellites: {
      triton: {
        name: "Тритон",
        scale: 0.2,
        texture: "satellite.jpg",
        rotationSpeed: 0.6,
        position: {
          x: 1.6,
          y: 0,
          z: 0,
        },
        orbitRadius: 1.6,
        orbitSpeed: 0.5,
      },
    },
  },
};

export default planetParams;
