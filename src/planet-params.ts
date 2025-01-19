const planetParams = {
  mercury: {
    name: "Меркурий",
    scale: 0.38,
    texture: "mercury.jpg",
    rotationSpeed: 6.2,
    position: {
      x: 8,
      y: 0,
      z: 0,
    },
    orbitRadius: 8,
    orbitSpeed: 4.17,
  },
  venus: {
    name: "Венера",
    scale: 0.95,
    texture: "venus.jpg",
    rotationSpeed: -1.46,
    position: {
      x: 0,
      y: 0,
      z: 12,
    },
    orbitRadius: 12,
    orbitSpeed: 1.61,
  },
  earth: {
    name: "Земля",
    scale: 1,
    texture: "earth.jpg",
    rotationSpeed: 365,
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
        rotationSpeed: 13.3,
        position: {
          x: 1.5,
          y: 0,
          z: 0,
        },
        orbitRadius: 1.5,
        orbitSpeed: 13.3,
      },
    },
  },
  mars: {
    name: "Марс",
    scale: 0.53,
    texture: "mars.jpg",
    rotationSpeed: 354,
    position: {
      x: 0,
      y: 0,
      z: -20,
    },
    orbitRadius: 20,
    orbitSpeed: 0.53,
    satellites: {
      phobos: {
        name: "Фобос",
        scale: 0.1,
        texture: "satellite.jpg",
        rotationSpeed: 1216,
        position: {
          x: 0.8,
          y: 0,
          z: 0,
        },
        orbitRadius: 0.8,
        orbitSpeed: 1216,
      },
      deimos: {
        name: "Деймос",
        scale: 0.1,
        texture: "satellite.jpg",
        rotationSpeed: 280,
        position: {
          x: -1.2,
          y: 0,
          z: 0,
        },
        orbitRadius: 1.2,
        orbitSpeed: 280,
      },
    },
  },
  jupiter: {
    name: "Юпитер",
    scale: 1.5,
    texture: "jupiter.jpg",
    rotationSpeed: 890,
    position: {
      x: 26,
      y: 0,
      z: 0,
    },
    orbitRadius: 26,
    orbitSpeed: 0.084,
    satellites: {
      io: {
        name: "Ио",
        scale: 0.25,
        texture: "satellite.jpg",
        rotationSpeed: 206,
        position: {
          x: 2,
          y: 0,
          z: 0,
        },
        orbitRadius: 2,
        orbitSpeed: 206,
      },
      europe: {
        name: "Европа",
        scale: 0.22,
        texture: "satellite.jpg",
        rotationSpeed: 102,
        position: {
          x: 0,
          y: 0,
          z: 2.6,
        },
        orbitRadius: 2.6,
        orbitSpeed: 102,
      },
      ganymede: {
        name: "Ганимед",
        scale: 0.3,
        texture: "satellite.jpg",
        rotationSpeed: 51,
        position: {
          x: -3.2,
          y: 0,
          z: 0,
        },
        orbitRadius: 3.2,
        orbitSpeed: 51,
      },
      callisto: {
        name: "Каллисто",
        scale: 0.28,
        texture: "satellite.jpg",
        rotationSpeed: 21,
        position: {
          x: 0,
          y: 0,
          z: -3.8,
        },
        orbitRadius: 3.8,
        orbitSpeed: 21,
      },
    },
  },
  saturn: {
    name: "Сатурн",
    scale: 1.4,
    texture: "saturn.jpg",
    rotationSpeed: 810,
    position: {
      x: 0,
      y: 0,
      z: 32,
    },
    orbitRadius: 32,
    orbitSpeed: 0.034,
    rings: {
      scale: 1.4,
      angle: 30,
      rotationSpeed: 1620,
    },
    satellites: {
      enceladus: {
        name: "Энцелад",
        scale: 0.1,
        texture: "satellite.jpg",
        rotationSpeed: 266,
        position: {
          x: 1.8,
          y: 0,
          z: 0,
        },
        orbitRadius: 1.8,
        orbitSpeed: 266,
      },
      rhea: {
        name: "Рея",
        scale: 0.15,
        texture: "satellite.jpg",
        rotationSpeed: 81,
        position: {
          x: 0,
          y: 0,
          z: 2.4,
        },
        orbitRadius: 2.4,
        orbitSpeed: 81,
      },
      titan: {
        name: "Титан",
        scale: 0.3,
        texture: "satellite.jpg",
        rotationSpeed: 22,
        position: {
          x: -3,
          y: 0,
          z: 0,
        },
        orbitRadius: 3,
        orbitSpeed: 22,
      },
    },
  },
  uranus: {
    name: "Уран",
    scale: 1.2,
    texture: "uranus.jpg",
    rotationSpeed: 507,
    position: {
      x: -40,
      y: 0,
      z: 0,
    },
    orbitRadius: 40,
    orbitSpeed: 0.012,
    satellites: {
      titania: {
        name: "Титания",
        scale: 0.15,
        texture: "satellite.jpg",
        rotationSpeed: 42,
        position: {
          x: 1.6,
          y: 0,
          z: 0,
        },
        orbitRadius: 1.6,
        orbitSpeed: 42,
      },
      oberon: {
        name: "Оберон",
        scale: 0.15,
        texture: "satellite.jpg",
        rotationSpeed: 27,
        position: {
          x: -2.2,
          y: 0,
          z: 0,
        },
        orbitRadius: 2.2,
        orbitSpeed: 27,
      },
    },
  },
  neptune: {
    name: "Нептун",
    scale: 1.2,
    texture: "neptune.jpg",
    rotationSpeed: 544,
    position: {
      x: 0,
      y: 0,
      z: -48,
    },
    orbitRadius: 48,
    orbitSpeed: 0.0061,
    satellites: {
      triton: {
        name: "Тритон",
        scale: 0.2,
        texture: "satellite.jpg",
        rotationSpeed: 63,
        position: {
          x: 1.6,
          y: 0,
          z: 0,
        },
        orbitRadius: 1.6,
        orbitSpeed: 63,
      },
    },
  },
};

export default planetParams;
