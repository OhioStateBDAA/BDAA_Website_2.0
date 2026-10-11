import Image from 'next/image';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import styles from './HomeEditorial.module.css';

const photos = [
  { src: '/img/gallery/photo-1.jpg', caption: 'The people behind BDAA', alt: 'BDAA executive board together on campus' },
  { src: '/img/gallery/photo-4.jpg', caption: 'Ideas from people in industry', alt: 'Bank of America tech talk at BDAA' },
  { src: '/img/gallery/photo-3.jpg', caption: 'Finding our community on campus', alt: 'BDAA at the involvement fair' },
];

export function PhotoGallerySection() {
  return (
    <Section padding="md"><Container>
      <div className={styles.gallery}>
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>A few moments, a lot of connection</p><h2>Life beyond the dataset.</h2></div>
          <p>Meet the people, conversations, and shared experiences that make BDAA.</p>
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
