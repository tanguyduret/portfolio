// Legacy plane transition component (A320 image).
// Kept temporarily as reference. Not used in the current layout.
// Will be replaced later by the final custom SVG plane animation.

import React from 'react';

export const TransitionPlane: React.FC = () => {
  return (
    <div className="transition-plane-container fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* 
         CHANGEMENT CRITIQUE :
         1. Z-index 9999 pour être AU-DESSUS de tout (y compris le header, le hero, etc).
         2. Suppression de l'opacité 0 dans le style.
         3. Positionnement initial CSS : Bottom-Left HORS ÉCRAN.
      */}
      <div 
        className="transition-plane absolute will-change-transform"
        style={{ 
          left: '-20vw', 
          bottom: '-20vh',
          width: '400px', // Taille fixe de base
          // Pas d'opacité 0 ici. S'il ne bouge pas, on le verra au moins en bas à gauche.
        }}
      >
        <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/A320_neo_white_background.png/1200px-A320_neo_white_background.png" 
            alt="Airbus Transition"
            className="w-full h-auto object-contain"
            style={{ 
                // Orientation vers le haut-droite
                transform: 'rotate(-35deg)', 
                filter: 'drop-shadow(30px 50px 20px rgba(0,0,0,0.5))'
            }}
        />
      </div>
    </div>
  );
};