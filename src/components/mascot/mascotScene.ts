import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export type MascotPose = 'Idle' | 'Run' | 'Wave';

export async function createMascotScene(host: HTMLElement) {
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
    const mixer = new THREE.AnimationMixer(model);
    const actions = new Map(gltf.animations.map(clip => [clip.name, mixer.clipAction(clip)]));
    let current: THREE.AnimationAction | undefined;
    let frame = 0;
    let running = false;
    let previousTime = 0;
    let targetRotation = 0;
    let disposed = false;
    const draw = (time: number) => {
      if (disposed) return;
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      mixer.update(delta);
      model.rotation.y = THREE.MathUtils.lerp(model.rotation.y, targetRotation, 0.12);
      renderer.render(scene, camera);
      if (running) frame = requestAnimationFrame(draw);
    };
    host.appendChild(renderer.domElement);
    const setPose = (pose: MascotPose, animate: boolean, direction: number) => {
      cancelAnimationFrame(frame);
      running = animate && !document.hidden;
      previousTime = 0;
      targetRotation = pose === 'Run' ? direction * 0.38 : -0.12;
      const action = actions.get(pose);
      if (action && action !== current) {
        current?.stop();
        action.reset().play();
        current = action;
      }
      if (!running) { mixer.update(0); model.rotation.y = targetRotation; }
      frame = requestAnimationFrame(draw);
    };
    setPose('Idle', false, 1);
    return {
      setPose,
      dispose() {
        disposed = true;
        cancelAnimationFrame(frame);
        mixer.stopAllAction();
        mixer.uncacheRoot(model);
        model.traverse(object => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
              for (const value of Object.values(material)) if (value instanceof THREE.Texture) value.dispose();
              material.dispose();
            }
          }
        });
        renderer.dispose();
        renderer.domElement.remove();
      },
    };
  } catch (error) {
    renderer.dispose();
    throw error;
  }
}
