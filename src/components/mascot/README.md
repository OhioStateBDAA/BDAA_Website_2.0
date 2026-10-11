# BDAA mascot guide

The original supplied model lives at `public/mascot/bdaa-mascot.glb`. No remote
model hosting or tracking is used. Three.js is loaded in a separate client chunk.
The enlarged outline shells use back faces so they do not obscure the red model.

`MascotGuide.tsx` contains the three highlight cards and destinations. Data I/O
currently points to the events page; replace that destination when an official
current hackathon page is available. Avoid adding unconfirmed dates or signups.

The guide follows page scroll, freezes during interaction, and stops rendering
animation frames while idle or in a background tab. Its panel uses a native modal
dialog for focus containment and Escape dismissal. Pause and hide controls remain
available; OS reduced-motion preferences disable travel and animation. A robot
icon keeps the guide usable when the 3D engine/model cannot load.

Validation: `npm run test:mascot`, `npm run lint`, and `npm run build`.
