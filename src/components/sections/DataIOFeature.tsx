import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { MascotGuide } from '../mascot/MascotGuide';
import styles from './HomeEditorial.module.css';

export function DataIOFeature() {
  return (
    <section aria-labelledby="data-io-title" id="data-io">
      <Container>
        <div className={styles.feature}>
          <div className={styles.runway} id="mascot-crossing">
            <div className={styles.dock} id="mascot-dock"><MascotGuide /></div>
            <p className={styles.runwayNote}><strong>Follow your curiosity.</strong>Our little guide has something to show you.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureCopy}>
              <p className={styles.eyebrow}>The BDAA hackathon</p>
              <h2 id="data-io-title">Data I/O.</h2>
              <h3>Make your next “what if” a real thing.</h3>
              <p>Bring an idea. Find a team. Explore what you can build with data. Data I/O is where curiosity becomes collaboration.</p>
              <Link className={styles.primary} href="/events">Explore BDAA events <ArrowUpRight size={18} /></Link>
              <p className={styles.footnote}>Future dates and registration will be shared through BDAA announcements.</p>
            </div>
            <div className={styles.featureVisual}>
              <Image src="/img/events/dataio.JPG" alt="Students working together at the 2025 Data I/O hackathon" fill sizes="(max-width: 767px) 90vw, 50vw" />
              <p className={styles.imageCaption}>Real people. Real problems. New possibilities.<span>A look back at Data I/O 2025.</span></p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
