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
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureCopy}>
              <p className={styles.eyebrow}>The BDAA hackathon</p>
              <h2 id="data-io-title">Data I/O</h2>
              
              <p>Collaborate on real-world data challenges and build innovative solutions over intensive weekends. Work with teammates to solve problems using analytics tools and present your findings to judges.</p>
              <Link className={styles.primary} href="/events">Join Event <ArrowUpRight size={18} /></Link>
            </div>
            <div className={styles.featureVisual}>
              <Image src="/img/events/dataio.JPG" alt="Students working together at the 2025 Data I/O hackathon" fill sizes="(max-width: 767px) 90vw, 50vw" />
              <p className={styles.imageCaption}>Data I/O 2025</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
