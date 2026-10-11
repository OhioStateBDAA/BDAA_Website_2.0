'use client';

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowUpRight, Bot, ChevronRight, Pause, Play, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notionHub } from '@/data/events';
import { socialLinks } from '@/data/socialLinks';
import type { createMascotScene } from './mascotScene';
import styles from './MascotGuide.module.css';
import { crossingPosition } from './guideMotion';

const highlights = [
  {
    tag: '01 / THE HACKATHON',
    title: 'Data I/O',
    heading: 'Big ideas. Real data.',
    description: 'Find your team, tackle a data challenge, and turn an idea into something you can show. Data I/O brings the BDAA community together to learn by building.',
    image: '/img/events/dataio.JPG',
    alt: 'BDAA Data I/O hackathon',
    link: '/events',
    action: 'Explore BDAA events',
    note: 'New event details will appear on our events page.',
    cue: 'Discover Data I/O',
  },
  {
    tag: '02 / MAKE SOMETHING',
    title: 'Project series',
    heading: 'From curious to creator.',
    description: 'Explore data science, full stack development, machine learning, and AI. Find past projects and learning materials in the BDAA Project Hub.',
    image: '/img/events/gala.JPG',
    alt: 'BDAA project presentations at the research gala',
    link: notionHub.url,
    action: 'Open the Project Hub',
    note: 'Projects, workshop materials, and room to experiment.',
    cue: 'Find your next project',
  },
  {
    tag: '03 / FIND YOUR PEOPLE',
    title: 'The community',
    heading: 'Good data. Great company.',
    description: 'Tech talks, shared ideas, and people to build with. Join our GroupMe to keep up with BDAA announcements and find your way into the community.',
    image: '/img/community/IceCreamSocial.jpeg',
    alt: 'BDAA members at an ice cream social',
    link: socialLinks.groupMe,
    action: 'Join the GroupMe',
    note: 'Your next conversation could start something great.',
    cue: 'Meet your community',
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
  const [moving, setMoving] = useState(false);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState(0);
  const host = useRef<HTMLSpanElement>(null);
  const traveler = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const scene = useRef<Awaited<ReturnType<typeof createMascotScene>> | null>(null);
  const direction = useRef(1);
  const arrived = useRef(false);
  const crossingElapsed = useRef(0);
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
    const update = () => scene.current?.setPose(engaged ? 'Wave' : moving ? 'Run' : 'Idle', !still && !open && (engaged || moving), direction.current);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, [engaged, moving, still, open, ready]);

  useEffect(() => {
    const element = traveler.current;
    if (!element || hidden) return;
    let frame = 0;
    let started = crossingElapsed.current > 0;
    let previousTime = 0;
    const dock = element.parentElement!;
    const settle = (complete = true) => {
      element.dataset.traveling = 'false';
      element.style.transform = '';
      if (complete) arrived.current = true;
      setMoving(false);
    };
    const update = (time: number) => {
      frame = 0;
      const rect = dock.getBoundingClientRect();
      if (still || window.innerWidth < 1360) { settle(false); return; }
      if (arrived.current || rect.bottom < 80) { settle(); return; }
      element.dataset.traveling = 'true';
      element.dataset.side = 'right';
      const right = window.innerWidth - 78;
      const center = rect.top + rect.height / 2;
      if (!started && center <= window.innerHeight * .72) started = true;
      if (started) {
        const delta = previousTime ? Math.min(50, time - previousTime) : 0;
        previousTime = time;
        if (engaged || open || document.hidden) { frame = requestAnimationFrame(update); return; }
        crossingElapsed.current += delta;
        const progress = Math.min(1, crossingElapsed.current / 3000);
        const position = crossingPosition(right, rect.left + 12, center, progress);
        element.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
        element.dataset.side = position.x < window.innerWidth / 2 ? 'left' : 'right';
        direction.current = -1;
        setMoving(true);
        if (progress >= 1) { settle(); return; }
        frame = requestAnimationFrame(update);
      } else {
        const y = Math.max(100, Math.min(window.innerHeight * .72 - 39, 100 + window.scrollY * .22));
        element.style.transform = `translate3d(${right}px, ${y}px, 0)`;
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [hidden, still, engaged, open]);

  useEffect(() => {
    const panel = dialog.current;
    if (!open || !panel) return;
    const trigger = launcher.current;
    panel.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { panel.close(); document.body.style.overflow = previous; trigger?.focus(); };
  }, [open]);

  const close = () => { setOpen(false); setEngaged(false); setMoving(false); };
  return (
    <>
      {hidden ? (
        <button className={styles.restore} onClick={() => { setReady(false); setHidden(false); }} aria-label="Show BDAA mascot guide"><Bot size={18} /> Show guide</button>
      ) : (
        <div ref={traveler} className={styles.traveler} data-moving={moving && !still} data-paused={still}>
          <button ref={launcher} className={styles.launcher} aria-label="Explore BDAA with our mascot" aria-haspopup="dialog"
            onClick={() => { setMoving(false); setOpen(true); }}
            onPointerEnter={() => { setMoving(false); setEngaged(true); }}
            onPointerLeave={() => setEngaged(false)}
            onFocus={event => { if (event.currentTarget.matches(':focus-visible')) { setMoving(false); setEngaged(true); } }}
            onBlur={() => setEngaged(false)}>
            <span className={styles.cue}><span className={styles.dot} />{highlight.cue}<ArrowUpRight size={13} /></span>
            <span ref={host} className={styles.model} data-ready={ready}>
              <Bot className={styles.fallback} size={66} aria-hidden="true" />
            </span>
            <span className={styles.shadow} />
            <span className={styles.caption}>YOUR BDAA SIDEKICK <ChevronRight size={10} /></span>
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
        <div className={styles.panelTop}><span><Bot size={18} /> A LITTLE BDAA DISCOVERY</span><button onClick={close} aria-label="Close BDAA guide"><X size={20} /></button></div>
        <div className={styles.featureImage}><Image src={highlight.image} alt={highlight.alt} fill sizes="440px" /><span>{highlight.tag}</span></div>
        <div className={styles.content}>
          <div className={styles.tabs} aria-label="BDAA highlights">{highlights.map((item, index) => <button key={item.title} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.title}</button>)}</div>
          <h2 id={titleId}>{highlight.heading}</h2>
          <p>{highlight.description}</p>
          <Link className={styles.cta} href={highlight.link} onClick={close}>{highlight.action}<ArrowUpRight size={18} /></Link>
          <p className={styles.note}>{highlight.note}</p>
        </div>
        <div className={styles.settings}>
          <button disabled={reducedMotion} onClick={() => setPaused(!paused)}>{still ? <Play size={14} /> : <Pause size={14} />}{reducedMotion ? 'Reduced motion on' : paused ? 'Resume movement' : 'Pause movement'}</button>
          <button onClick={() => { close(); setHidden(true); }}>Hide guide</button>
        </div>
      </dialog>
    </>
  );
}
