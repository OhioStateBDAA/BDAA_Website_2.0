# BDAA mascot guide

The original supplied model lives at `public/mascot/bdaa-mascot.glb`. No remote
model hosting or tracking is used. Three.js is loaded in a separate client chunk.
The enlarged outline shells use back faces so they do not obscure the red model.

`MascotGuide.tsx` contains the three highlight cards and destinations. Data I/O
currently points to the events page; replace that destination when an official
current hackathon page is available. Avoid adding unconfirmed dates or signups.

The homepage guide travels in the outer margin on wide screens (1360px+),
then crosses the gallery's empty runway over three seconds and docks next to
Data I/O. It stays in that inline dock on smaller screens and with reduced motion.
The journey happens once per homepage visit. Pause and hide preferences persist
in local storage. The modal supports Escape, focus containment and restoration.
A robot icon keeps the guide usable if the model or WebGL cannot load.

Validation: `npm run test:mascot`, `npm run lint`, and `npm run build`.
