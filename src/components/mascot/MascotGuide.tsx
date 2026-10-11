'use client';

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowUpRight, Bot, ChevronRight, Pause, Play, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notionHub } from '@/data/events';
import { socialLinks } from '@/data/socialLinks';
import type { createMascotScene } from './mascotScene';
import styles from './MascotGuide.module.css';
import { guidePosition } from './guideMotion';

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

export function MascotGuide() {
  const reducedMotion = useSyncExternalStore(subscribeToMotion, () => window.matchMedia('(prefers-reduced-motion: reduce)').matches, () => true);
  const [hidden, setHidden] = useState(false);
  const [paused, setPaused] = useState(false);
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
  const titleId = useId();
  const still = reducedMotion || paused;
  const highlight = highlights[selected];

  useEffect(() => {
    const element = host.current;
    if (!element || hidden) return;
    let cancelled = false;
    let instance: Awaited<ReturnType<typeof createMascotScene>> | undefined;
    // Keep the 3D engine out of the page's initial bundle.
    import('./mascotScene').then(module => module.createMascotScene(element)).then(value => {
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
    let stopTimer: ReturnType<typeof setTimeout>;
    let x = element.getBoundingClientRect().left;
    let target = x;
    let y = 0;
    let lastScroll = window.scrollY;
    const paint = () => {
      const difference = target - x;
      x = still ? target : x + difference * 0.12;
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (Math.abs(difference) > 0.5 && !still) frame = requestAnimationFrame(paint);
      else frame = 0;
    };
    const update = () => {
      if (engaged || open) return;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      const width = element.offsetWidth;
      const position = guidePosition(progress, window.innerWidth, width, still);
      target = position.x;
      y = position.y;
      direction.current = target >= x ? 1 : -1;
      if (Math.abs(window.scrollY - lastScroll) > 2 && !still) {
        setMoving(true);
        clearTimeout(stopTimer);
        stopTimer = setTimeout(() => setMoving(false), 220);
      }
      lastScroll = window.scrollY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); clearTimeout(stopTimer); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
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
          <button disabled={reducedMotion} onClick={() => setPaused(value => !value)}>{still ? <Play size={14} /> : <Pause size={14} />}{reducedMotion ? 'Reduced motion on' : paused ? 'Resume movement' : 'Pause movement'}</button>
          <button onClick={() => { close(); setHidden(true); }}>Hide guide</button>
        </div>
      </dialog>
    </>
  );
}
