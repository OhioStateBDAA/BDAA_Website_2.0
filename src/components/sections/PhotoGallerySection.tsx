import Image from 'next/image';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import styles from './HomeEditorial.module.css';

const photos = [
  { src: '/img/gallery/photo-1.jpg', caption: 'Our members', alt: 'BDAA executive board together on campus' },
  { src: '/img/gallery/photo-4.jpg', caption: 'Bank of America tech talk', alt: 'Bank of America tech talk at BDAA' },
  { src: '/img/gallery/photo-3.jpg', caption: 'Around campus', alt: 'BDAA members sitting together at a campus event' },
];

export function PhotoGallerySection() {
  return (
    <Section padding="md"><Container>
      <div className={styles.gallery}>
        <div className={styles.sectionHeading}>
          <div><h2>Around BDAA</h2></div>
          
        </div>
        <div className={styles.photos}>
          {photos.map(photo => <figure key={photo.src} className={styles.photo}>
            <div className={styles.photoImage}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 90vw, 33vw" /></div>
            <figcaption>{photo.caption}</figcaption>
          </figure>)}
        </div>
      </div>
    </Container></Section>
  );
}
