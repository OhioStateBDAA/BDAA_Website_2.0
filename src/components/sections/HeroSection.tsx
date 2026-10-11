import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import styles from './HomeEditorial.module.css';
import heroImage from '../../../public/group-photo.jpg';
import guysImage from '../../../public/img/group-guys.jpg';
import girlsImage from '../../../public/img/group-girls.jpg';

export function HeroSection() {
  return (
    <Section padding="lg"><Container>
      <div className={styles.hero}>
        <div>
          
          <h1>Welcome to <em>BDAA</em></h1>
          <p className={styles.intro}>BDAA aims to inspire students to think analytically, empower them through hands on training, and connect them to potential employers. Winner of the Outstanding Overall Organization Award two years running (2017-2018) and the Partnership in Industry Award, BDAA is truly Ohio State&apos;s central hub for involvement in data analytics.</p>
          <div className={styles.actions}>
            <Link href="/events" className={styles.primary}>Join Event <ArrowUpRight size={17} /></Link>
            <Link href="/partners#sponsorship-application" className={styles.secondary}>Partner With Us <ArrowUpRight size={17} /></Link>
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
