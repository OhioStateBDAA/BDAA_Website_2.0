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
          <h1>Ohio State<br /><em>students in data.</em></h1>
          <p className={styles.intro}>We’re BDAA, a student organization at Ohio State. We get together to learn about data analytics, work on projects, and meet people who share our interests.</p>
          <div className={styles.actions}>
            <Link href={socialLinks.groupMe} className={styles.primary}>Join our GroupMe <ArrowUpRight size={17} /></Link>
            <Link href="/events" className={styles.secondary}>See upcoming events <ArrowUpRight size={17} /></Link>
          </div>
          
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
