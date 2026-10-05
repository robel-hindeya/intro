import ExpertsClient from './ExpertsClient';
import rawData from '../../data/introData.json';

export const metadata = {
  title: 'Browse All Experts - Book 1-on-1 Video Advice on Intro',
  description: 'Explore 400+ vetted founders, CEOs, designers, and innovators. Filter by category, price in Birr, and ratings. Book your 1-on-1 video call.',
  openGraph: {
    title: 'Browse All Experts on Intro',
    description: 'Explore vetted founders, executives, designers, and innovators ready for 1-on-1 video calls.',
    images: [
      {
        url: 'https://cdn.prod.website-files.com/5eb5f7f78b63035f53364ccc/6554005e6af2390f6b31ca26_main-sharesheet-img.jpeg',
        width: 1200,
        height: 630,
        alt: 'Intro Experts Directory',
      },
    ],
  },
};

export default function ExpertsPage() {
  return <ExpertsClient allExperts={rawData.experts} />;
}
