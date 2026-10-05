import GiftSessionClient from './GiftSessionClient';
import rawData from '../../data/introData.json';

export const metadata = {
  title: 'Gift a Session - Intro',
  description: 'Give a 1-on-1 video call with world-class founders, designers, and mentors. The most impactful and memorable gift they will ever receive.',
  openGraph: {
    title: 'Gift a Session on Intro',
    description: 'Give a 1-on-1 video call with iconic founders, designers, and executives.',
    images: [
      {
        url: 'https://cdn.prod.website-files.com/5eb5f7f78b63035f53364ccc/6390def69fa61e67d6000b74_intro-gift-card.png',
        width: 1200,
        height: 630,
        alt: 'Intro Gift Card',
      },
    ],
  },
};

export default function GiftPage() {
  const featuredExperts = rawData.experts.slice(0, 6);
  return <GiftSessionClient featuredExperts={featuredExperts} allExperts={rawData.experts} />;
}
