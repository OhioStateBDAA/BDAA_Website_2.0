import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export type MascotPose = 'Idle' | 'Float' | 'Run' | 'Wave' | 'Arrive';

export async function createMascotScene(host: HTMLElement, availability: (ready: boolean) => void = () => {}) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setSize(180, 180, false);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 1, 7.4);
  camera.lookAt(0, 0.8, 0);
  let model: THREE.Group;
  try {
    const gltf = await new GLTFLoader().loadAsync('/mascot/bdaa-mascot.glb');
    model = gltf.scene;
    // The supplied model uses enlarged outline shells. Render their back faces
    // so the shells outline the colored surfaces instead of covering them.
    model.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      if (/outline/i.test(object.name)) {
        object.material = materials.map(material => {
          const outline = material.clone();
          outline.side = THREE.BackSide;
          return outline;
        });
      }
      for (const material of materials) {
        if (!(material instanceof THREE.MeshBasicMaterial)) continue;
        if (material.name === 'BDAA Red') material.color.set('#CA2E2E');
        if (material.name === 'Face Blue') material.color.set('#BFD1FF');
        if (material.name === 'Badge Yellow') material.color.set('#FFC653');
      }
    });
    scene.add(model);
    // Animate the supplied joint hierarchy directly, keeping its original geometry.
    const jointNames = ['Head Group', 'Torso Group', 'Left Arm', 'Right Arm', 'Left Leg', 'Right Leg'];
    const joints = jointNames.map(name => (model.getObjectByName(name) || model.getObjectByName(name.replaceAll(' ', '_')))! );
    if (joints.some(joint => !joint)) throw new Error('Mascot joint hierarchy is incomplete');
    const eyes = ['Left_Eye', 'Right_Eye', 'Left_Eye_Highlight', 'Right_Eye_Highlight'].map(name => model.getObjectByName(name)).filter((eye): eye is THREE.Object3D => !!eye);
    const eyeScales = eyes.map(eye => eye.scale.clone());
    const rest = joints.map(joint => joint.rotation.clone());
    const pivot = new THREE.Group();
    scene.remove(model);
    pivot.add(model);
    scene.add(pivot);
    let pose: MascotPose = 'Idle';
    let speed = 0;
    let heading = 1;
    let enabled = true;
    let visible = true;
    let contextLost = false;
    let frame = 0;
    let previousTime = 0;
    let elapsed = 0;
    let phase = 0;
    let yaw = -.12;
    let runWeight = 0;
    let floatWeight = 0;
    let waveWeight = 0;
    let pointWeight = 0;
    let disposed = false;
    const damp = (from: number, to: number, dt: number) => THREE.MathUtils.lerp(from, to, 1 - Math.exp(-12 * dt));
    const draw = (time: number) => {
      frame = 0;
      if (disposed || contextLost || !visible || document.hidden) return;
      const dt = previousTime ? Math.min((time - previousTime) / 1000, .04) : 1 / 60;
      previousTime = time;
      elapsed += dt;
      const active = enabled;
      runWeight = damp(runWeight, active && pose === 'Run' ? Math.min(1, speed / 100) : 0, dt);
      floatWeight = damp(floatWeight, active && pose === 'Float' ? 1 : 0, dt);
      const greeting = pose === 'Wave' ? elapsed < 1.7 : pose === 'Arrive' && elapsed > .35 && elapsed < 1.9;
      waveWeight = damp(waveWeight, active && greeting ? 1 : 0, dt);
      pointWeight = damp(pointWeight, active && pose === 'Arrive' && elapsed >= 2 && elapsed < 2.9 ? 1 : 0, dt);
      phase += dt * Math.min(3, Math.max(.3, speed / 150)) * Math.PI * 2;
      const stride = Math.sin(phase);
      const targetYaw = pose === 'Run' && active ? heading * 1.05 : pose === 'Float' && active ? -.25 : -.12;
      yaw = active ? damp(yaw, targetYaw, dt) : targetYaw;
      pivot.rotation.set(0, yaw, -heading * .065 * runWeight);
      const landing = active && pose === 'Arrive' ? Math.sin(Math.min(1, elapsed / .42) * Math.PI) * .16 : 0;
      pivot.position.y = Math.abs(Math.cos(phase)) * .055 * runWeight + Math.sin(elapsed * 3) * .04 * floatWeight + landing;
      const compression = active && pose === 'Arrive' && elapsed > .42 ? Math.sin((elapsed - .42) * 18) * Math.exp(-(elapsed - .42) * 9) * .06 : 0;
      pivot.scale.set(1 + compression * .5, 1 - compression, 1 + compression * .5);
      joints.forEach((joint, index) => joint.rotation.copy(rest[index]));
      const [head, torso, leftArm, rightArm, leftLeg, rightLeg] = joints;
      leftLeg.rotation.x += stride * .85 * runWeight + .2 * floatWeight;
      rightLeg.rotation.x -= stride * .85 * runWeight - .32 * floatWeight;
      leftArm.rotation.x -= stride * .65 * runWeight;
      rightArm.rotation.x += stride * .65 * runWeight;
      leftArm.rotation.z -= .15 * runWeight + .3 * floatWeight;
      rightArm.rotation.z += .15 * runWeight + .3 * floatWeight;
      torso.rotation.x += .12 * runWeight;
      head.rotation.z += -.035 * stride * runWeight + .07 * waveWeight;
      head.rotation.y += .12 * pointWeight;
      rightArm.rotation.z += (2.35 + Math.sin(elapsed * 11) * .24) * waveWeight + 1.25 * pointWeight;
      rightArm.rotation.x -= .3 * waveWeight;
      // A short blink during the greeting, with no perpetual idle animation.
      const blink = active && (pose === 'Wave' || pose === 'Arrive') ? Math.max(0, 1 - Math.abs(elapsed - 1.15) / .1) : 0;
      eyes.forEach((eye, index) => { eye.scale.copy(eyeScales[index]); eye.scale.y *= 1 - blink * .9; });
      renderer.render(scene, camera);
      // Gestures finish once; a resting or offscreen robot consumes no animation frames.
      if (active && ((pose === 'Run' && speed > 1) || (pose === 'Float' && speed > 1) || elapsed < (pose === 'Arrive' ? 3.6 : pose === 'Wave' ? 2.4 : .8))) wake();
    };
    const wake = () => { if (!frame && !disposed && !contextLost && visible && !document.hidden) frame = requestAnimationFrame(draw); };
    const lost = (event: Event) => { event.preventDefault(); contextLost = true; cancelAnimationFrame(frame); frame = 0; availability(false); };
    const restored = () => { contextLost = false; availability(true); previousTime = 0; wake(); };
    const visibility = () => { cancelAnimationFrame(frame); frame = 0; previousTime = 0; if (!document.hidden) wake(); };
    renderer.domElement.addEventListener('webglcontextlost', lost);
    renderer.domElement.addEventListener('webglcontextrestored', restored);
    document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (!visible) { cancelAnimationFrame(frame); frame = 0; }
      else { previousTime = 0; wake(); }
    });
    observer.observe(host);
    host.appendChild(renderer.domElement);
    const setMotion = (next: MascotPose, velocity = 0, direction = 1, animate = true) => {
      if (next !== pose || animate !== enabled) { elapsed = 0; previousTime = 0; }
      pose = next;
      speed = Math.abs(velocity);
      heading = direction;
      enabled = animate;
      if (!animate) { runWeight = 0; floatWeight = 0; waveWeight = 0; pointWeight = 0; }
      wake();
    };
    wake();
    return {
      setMotion,
      dispose() {
        disposed = true;
        cancelAnimationFrame(frame);
        observer.disconnect();
        document.removeEventListener('visibilitychange', visibility);
        model.traverse(object => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
              for (const value of Object.values(material)) if (value instanceof THREE.Texture) value.dispose();
              material.dispose();
            }
          }
        });
        renderer.domElement.removeEventListener('webglcontextlost', lost);
        renderer.domElement.removeEventListener('webglcontextrestored', restored);
        renderer.dispose();
        renderer.domElement.remove();
      },
    };
  } catch (error) {
    renderer.dispose();
    throw error;
  }
}
