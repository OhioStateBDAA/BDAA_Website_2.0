import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { socialLinks } from '@/data/socialLinks';
import styles from './HomeEditorial.module.css';
import heroImage from '../../../public/group-photo.jpg';
import guysImage from '../../../public/img/group-guys.jpg';
import girlsImage from '../../../public/img/group-girls.jpg';

export function HeroSection() {
  return (
    <Section padding="lg"><Container>
      <div className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Ohio State · Big Data Analytics Association</p>
          <h1>Get curious.<br /><em>Build with data.</em></h1>
          <p className={styles.intro}>A community for exploring ideas, building real projects, and finding your people in data.</p>
          <div className={styles.actions}>
            <Link href={socialLinks.groupMe} className={styles.primary}>Join the community <ArrowUpRight size={17} /></Link>
            <Link href="/events" className={styles.secondary}>Explore events <ArrowUpRight size={17} /></Link>
          </div>
          <p className={styles.footnote}>Workshops. Tech talks. Projects. A place to start.</p>
        </div>
        <div className={styles.collage}>
          <div className={styles.portrait}><Image src={heroImage} alt="BDAA members together on campus" fill sizes="(max-width: 767px) 45vw, 24vw" className="object-top" priority /></div>
          <div className={styles.pair}>
            <div><Image src={guysImage} alt="BDAA members at a campus gathering" fill sizes="(max-width: 767px) 45vw, 24vw" /></div>
            <div><Image src={girlsImage} alt="BDAA members at an organization event" fill sizes="(max-width: 767px) 45vw, 24vw" /></div>
          </div>
        </div>
      </div>
    </Container></Section>
  );
}
