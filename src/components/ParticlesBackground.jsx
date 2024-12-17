// src/components/ParticlesBackground.js
import React from 'react';
import Particles from 'react-tsparticles';

const ParticlesBackground = () => {
  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: {
            value: "#121212", // Dark background to match the theme
          },
        },
        particles: {
          number: {
            value: 100, // Number of particles
            density: {
              enable: true,
              value_area: 800, // Density area
            },
          },
          size: {
            value: 4, // Size of particles
          },
          links: {
            enable: true,
            distance: 150, // Link distance
            color: "#FF6F00", // Color of links
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 6, // Speed of particles movement
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
