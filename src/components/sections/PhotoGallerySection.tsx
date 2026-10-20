import Image from 'next/image';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import styles from './HomeEditorial.module.css';

const photos = [
  { src: '/img/gallery/photo-1.jpg', alt: 'BDAA executive board together on campus' },
  { src: '/img/gallery/photo-2.jpg', alt: 'BDAA executive board group photo' },
  { src: '/img/gallery/photo-3.jpg', alt: 'BDAA at the involvement fair' },
  { src: '/img/gallery/photo-4.jpg', alt: 'Bank of America tech talk at BDAA' },
  { src: '/img/gallery/photo-5.jpg', alt: 'BDAA networking event' },
  { src: '/img/gallery/photo-6.jpg', alt: 'BDAA members talking to a Bank of America representative' },
  { src: '/img/gallery/photo-7.jpg', alt: "BDAA receiving Ohio State's Student Organization Excellence Award" },
  { src: '/img/gallery/photo-8.jpg', alt: 'Community building activities at BDAA' },
];

export function PhotoGallerySection() {
  return (
    <Section padding="md"><Container>
      <div className={styles.gallery}>
        <div className={styles.sectionHeading}>
          <div><h2>Photo Gallery</h2></div>
          <p>Moments from our events, workshops, and community gatherings that showcase the vibrant BDAA experience.</p>
          
        </div>
        <div className={styles.photos}>
          {photos.map(photo => <figure key={photo.src} className={styles.photo}>
            <div className={styles.photoImage}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 45vw, (max-width: 1023px) 30vw, 280px" /></div>
          </figure>)}
        </div>
      </div>
    </Container></Section>
  );
}
