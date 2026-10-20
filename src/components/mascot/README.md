# BDAA mascot guide

The original supplied model lives at `public/mascot/bdaa-mascot.glb`. No remote
model hosting or tracking is used. Three.js is loaded in a separate client chunk.
The enlarged outline shells use back faces so they do not obscure the red model.

`MascotGuide.tsx` contains the three highlight cards and destinations. Data I/O
currently points to the events page; replace that destination when an official
current hackathon page is available. Avoid adding unconfirmed dates or signups.

The homepage guide stays in its inline dock between the photo gallery and Data I/O
on all screen sizes. It does not track scrolling or travel across the viewport.
Hovering or keyboard focusing the robot plays a wave in place; clicking opens the
highlight cards. Pause and hide preferences persist in local storage. The modal
supports Escape, focus containment and restoration. A robot icon keeps the guide
usable if the model or WebGL cannot load.

Validation: `npm run test:mascot`, `npm run lint`, and `npm run build`.

The original model is unchanged. `mascotScene.ts` retains its joint animation
capabilities, but the guide only requests idle and wave poses. Gestures settle
without a perpetual render loop. Reduced motion and pause disable gestures;
rendering also stops outside the viewport. The previous travel helpers remain
available in `guideMotion.ts` but are not imported by the guide.
