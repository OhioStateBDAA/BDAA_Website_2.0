import Image from 'next/image';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import styles from './HomeEditorial.module.css';

const photos = [
  { src: '/img/gallery/photo-1.jpg', width: 3612, height: 5418, alt: 'BDAA executive board together on campus' },
  { src: '/img/gallery/photo-2.jpg', width: 4671, height: 3114, alt: 'BDAA executive board group photo' },
  { src: '/img/gallery/photo-3.jpg', width: 6000, height: 4000, alt: 'BDAA at the involvement fair' },
  { src: '/img/gallery/photo-4.jpg', width: 6000, height: 4000, alt: 'Bank of America tech talk at BDAA' },
  { src: '/img/gallery/photo-5.jpg', width: 5712, height: 4284, alt: 'BDAA networking event' },
  { src: '/img/gallery/photo-6.jpg', width: 1994, height: 1324, alt: 'BDAA members talking to a Bank of America representative' },
  { src: '/img/gallery/photo-7.jpg', width: 2048, height: 1365, alt: "BDAA receiving Ohio State's Student Organization Excellence Award" },
  { src: '/img/gallery/photo-8.jpg', width: 6000, height: 4000, alt: 'Community building activities at BDAA' },
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
            <div className={styles.photoImage}><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 479px) 90vw, (max-width: 767px) 45vw, (max-width: 1279px) 30vw, 390px" /></div>
          </figure>)}
        </div>
      </div>
    </Container></Section>
  );
}
