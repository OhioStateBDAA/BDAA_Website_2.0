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
            <p className={styles.runwayNote}>Click the robot for more about BDAA.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureCopy}>
              <p className={styles.eyebrow}>The BDAA hackathon</p>
              <h2 id="data-io-title">Data I/O</h2>
              
              <p>Data I/O is our data analytics hackathon. Students work in teams to take on a data challenge and present what they’ve built.</p>
              <Link className={styles.primary} href="/events">See BDAA events <ArrowUpRight size={18} /></Link>
              <p className={styles.footnote}>Check our event announcements for the next Data I/O.</p>
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
