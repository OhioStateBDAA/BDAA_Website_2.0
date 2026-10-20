'use client';

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowUpRight, Bot, ChevronRight, Pause, Play, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notionHub } from '@/data/events';
import { socialLinks } from '@/data/socialLinks';
import type { createMascotScene } from './mascotScene';
import styles from './MascotGuide.module.css';
import { crossingPosition, crossingDuration, followPosition } from './guideMotion';

const highlights = [
  {
    tag: '01 / THE HACKATHON',
    title: 'Data I/O',
    heading: 'Hackathons',
    description: 'Collaborate on real-world data challenges and build innovative solutions over intensive weekends. Work with teammates to solve problems using analytics tools and present your findings to judges.',
    image: '/img/events/dataio.JPG',
    alt: 'BDAA Data I/O hackathon',
    link: '/events',
    action: 'Join Event',
    cue: 'About Data I/O',
  },
  {
    tag: '02 / PROJECTS',
    title: 'Project series',
    heading: 'Project series',
    description: 'Hands-on workshops where you build portfolio projects using real datasets. Develop practical skills in Python, R, SQL, and visualization tools while creating work to showcase to potential employers.',
    image: '/img/events/gala.JPG',
    alt: 'BDAA project presentations at the research gala',
    link: notionHub.url,
    action: 'Open the Project Hub',
    cue: 'Browse projects',
  },
  {
    tag: '03 / STAY IN TOUCH',
    title: 'The community',
    heading: 'Join our community',
    description: 'Our platforms are safe spaces to exchange ideas, interesting topics, events, useful resources, and opportunities for personal and professional development for everyone.',
    image: '/img/community/IceCreamSocial.jpeg',
    alt: 'BDAA members at an ice cream social',
    link: socialLinks.groupMe,
    action: 'Join the GroupMe',
    cue: 'Stay in touch',
  },
];

function subscribeToMotion(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function subscribePreference(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('bdaa-guide-preference', callback);
  return () => { window.removeEventListener('storage', callback); window.removeEventListener('bdaa-guide-preference', callback); };
}
function usePreference(key: string) {
  const value = useSyncExternalStore(subscribePreference, () => {
    try { return localStorage.getItem(key) === 'true'; } catch { return false; }
  }, () => false);
  const setValue = (next: boolean) => {
    try { localStorage.setItem(key, String(next)); } catch { /* Storage can be unavailable in private contexts. */ }
    window.dispatchEvent(new Event('bdaa-guide-preference'));
  };
  return [value, setValue] as const;
}

export function MascotGuide() {
  const reducedMotion = useSyncExternalStore(subscribeToMotion, () => window.matchMedia('(prefers-reduced-motion: reduce)').matches, () => true);
  const [hidden, setHidden] = usePreference('bdaa-guide-hidden');
  const [paused, setPaused] = usePreference('bdaa-guide-paused');
  const [open, setOpen] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState(0);
  const host = useRef<HTMLSpanElement>(null);
  const traveler = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const scene = useRef<Awaited<ReturnType<typeof createMascotScene>> | null>(null);
  const arrived = useRef(false);
  const greeted = useRef(false);
  const restPose = useRef<'Idle' | 'Arrive'>('Idle');
  const journey = useRef({ elapsed: 0, x: 0, y: 100, startY: 100, started: false, initialized: false });
  const titleId = useId();
  const still = reducedMotion || paused;
  const highlight = highlights[selected];

  useEffect(() => {
    const element = host.current;
    if (!element || hidden) return;
    let cancelled = false;
    let instance: Awaited<ReturnType<typeof createMascotScene>> | undefined;
    // Keep the 3D engine out of the page's initial bundle.
    import('./mascotScene').then(module => module.createMascotScene(element, value => { if (!cancelled) setReady(value); })).then(value => {
      instance = value;
      if (cancelled) { value.dispose(); return; }
      scene.current = value;
      setReady(true);
    }).catch(() => { /* The accessible robot icon remains available without WebGL. */ });
    return () => { cancelled = true; instance?.dispose(); scene.current = null; };
  }, [hidden]);

  useEffect(() => {
    const element = traveler.current;
    if (!element || hidden) return;
    let frame = 0;
    let previousTime = 0;
    let lastSpeed = 0;
    const path = journey.current;
    const dock = element.parentElement!;
    const settle = (complete = true) => {
      element.dataset.traveling = 'false';
      element.dataset.motion = 'idle';
      element.style.transform = '';
      const justArrived = complete && !arrived.current && path.started;
      if (complete) arrived.current = true;
      const bounds = dock.getBoundingClientRect();
      const firstGreeting = !greeted.current && bounds.top >= 0 && bounds.bottom <= window.innerHeight && ready;
      if ((justArrived || firstGreeting) && !still) { restPose.current = 'Arrive'; greeted.current = true; }
      if (engaged || still || open) restPose.current = 'Idle';
      scene.current?.setMotion(still || open ? 'Idle' : engaged ? 'Wave' : restPose.current, 0, 1, !still && !open);
    };
    const update = (time: number) => {
      frame = 0;
      if (document.hidden) { previousTime = 0; return; }
      const dt = previousTime ? Math.min(.04, (time - previousTime) / 1000) : 1 / 60;
      previousTime = time;
      const rect = dock.getBoundingClientRect();
      if (still || window.innerWidth < 1360) { settle(false); return; }
      if (arrived.current || rect.bottom < 80 || (path.started && rect.top > window.innerHeight)) { settle(); return; }
      const right = window.innerWidth - 88;
      if (!path.initialized) { path.x = right; path.initialized = true; }
      element.dataset.traveling = 'true';
      const center = rect.top + rect.height / 2;
      if (!path.started && center <= window.innerHeight * .72) {
        path.started = true;
        path.startY = path.y;
      }
      if (engaged || open) {
        scene.current?.setMotion(engaged && !open ? 'Wave' : 'Idle', 0, 1, !open);
        return;
      }
      const oldX = path.x;
      const oldY = path.y;
      let complete = false;
      if (path.started) {
        path.elapsed += dt;
        const progress = Math.min(1, path.elapsed / crossingDuration(right - rect.left - 8));
        const position = crossingPosition(right, rect.left + 8, center, progress, path.startY);
        path.x = position.x;
        path.y = position.y;
        complete = progress >= 1;
      } else {
        const targetY = Math.max(100, Math.min(window.innerHeight * .72 - 43, 100 + window.scrollY * .22));
        path.x = followPosition(path.x, right, dt);
        path.y = followPosition(path.y, targetY, dt);
      }
      const horizontalSpeed = Math.abs(path.x - oldX) / dt;
      const verticalSpeed = Math.abs(path.y - oldY) / dt;
      const running = path.started && horizontalSpeed > 12;
      const speed = running ? horizontalSpeed : verticalSpeed;
      lastSpeed = followPosition(lastSpeed, speed, dt);
      element.dataset.motion = running ? 'run' : lastSpeed > 2 ? 'float' : 'idle';
      element.dataset.side = path.x < window.innerWidth / 2 ? 'left' : 'right';
      element.style.transform = `translate3d(${path.x}px, ${path.y}px, 0)`;
      element.style.setProperty('--travel-speed', String(Math.min(1, lastSpeed / 260)));
      scene.current?.setMotion(running ? 'Run' : lastSpeed > 2 ? 'Float' : 'Idle', lastSpeed, -1);
      if (complete) { settle(); return; }
      if (path.started || lastSpeed > .5 || Math.abs(path.x - right) > .2) frame = requestAnimationFrame(update);
    };
    const schedule = () => { if (!frame) { previousTime = 0; frame = requestAnimationFrame(update); } };
    const visibility = () => {
      cancelAnimationFrame(frame); frame = 0; previousTime = 0;
      if (!document.hidden) schedule();
    };
    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [hidden, still, engaged, open, ready]);

  useEffect(() => {
    const panel = dialog.current;
    if (!open || !panel) return;
    const trigger = launcher.current;
    panel.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { panel.close(); document.body.style.overflow = previous; trigger?.focus(); };
  }, [open]);

  const close = () => { setOpen(false); setEngaged(false); };
  return (
    <>
      {hidden ? (
        <button className={styles.restore} onClick={() => { setReady(false); setHidden(false); }} aria-label="Show BDAA mascot guide"><Bot size={18} /> Show guide</button>
      ) : (
        <div ref={traveler} className={styles.traveler} data-paused={still}>
          <button ref={launcher} className={styles.launcher} aria-label="Explore BDAA with our mascot" aria-haspopup="dialog"
            onClick={() => { setOpen(true); }}
            onPointerEnter={() => { setEngaged(true); }}
            onPointerLeave={() => setEngaged(false)}
            onFocus={event => { if (event.currentTarget.matches(':focus-visible')) { setEngaged(true); } }}
            onBlur={() => setEngaged(false)}>
            <span className={styles.cue}><span className={styles.dot} />{highlight.cue}<ArrowUpRight size={13} /></span>
            <span ref={host} className={styles.model} data-ready={ready}>
              <Bot className={styles.fallback} size={66} aria-hidden="true" />
            </span>
            <span className={styles.shadow} />
            <span className={styles.caption}>BDAA GUIDE <ChevronRight size={10} /></span>
          </button>
        </div>
      )}
      <dialog ref={dialog} className={styles.panel} aria-labelledby={titleId}
        onCancel={event => { event.preventDefault(); close(); }}
        onClick={event => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
        }}>
        <div className={styles.panelTop}><span><Bot size={18} /> MORE ABOUT BDAA</span><button onClick={close} aria-label="Close BDAA guide"><X size={20} /></button></div>
        <div className={styles.featureImage}><Image src={highlight.image} alt={highlight.alt} fill sizes="440px" /><span>{highlight.tag}</span></div>
        <div className={styles.content}>
          <div className={styles.tabs} aria-label="BDAA highlights">{highlights.map((item, index) => <button key={item.title} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.title}</button>)}</div>
          <h2 id={titleId}>{highlight.heading}</h2>
          <p>{highlight.description}</p>
          <Link className={styles.cta} href={highlight.link} onClick={close}>{highlight.action}<ArrowUpRight size={18} /></Link>
        </div>
        <div className={styles.settings}>
          <button disabled={reducedMotion} onClick={() => setPaused(!paused)}>{still ? <Play size={14} /> : <Pause size={14} />}{reducedMotion ? 'Reduced motion on' : paused ? 'Resume movement' : 'Pause movement'}</button>
          <button onClick={() => { close(); setHidden(true); }}>Hide guide</button>
        </div>
      </dialog>
    </>
  );
}
