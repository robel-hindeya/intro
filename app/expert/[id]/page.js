import { notFound } from 'next/navigation';
import rawData from '../../../data/introData.json';
import ExpertDetailClient from './ExpertDetailClient';

export async function generateStaticParams() {
  return rawData.experts.map((exp) => ({
    id: exp.slug || String(exp.id),
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const expertId = resolvedParams.id;
  const expert = rawData.experts.find(
    (e) =>
      String(e.id) === expertId ||
      e.slug === expertId ||
      e.slug?.toLowerCase() === expertId?.toLowerCase()
  );

  if (!expert) {
    return {
      title: 'Expert Not Found - Intro',
    };
  }

  return {
    title: `${expert.name} - Book 1-on-1 Video Advice on Intro`,
    description: `Book a 1-on-1 video call with ${expert.name}. ${expert.headline || expert.bio}`,
    openGraph: {
      title: `${expert.name} - Intro`,
      description: expert.headline || expert.bio,
      images: [
        {
          url: expert.image,
          width: 800,
          height: 800,
          alt: expert.name,
        },
      ],
    },
  };
}

export default async function ExpertPage({ params }) {
  const resolvedParams = await params;
  const expertId = resolvedParams.id;
  const expert = rawData.experts.find(
    (e) =>
      String(e.id) === expertId ||
      e.slug === expertId ||
      e.slug?.toLowerCase() === expertId?.toLowerCase()
  );

  if (!expert) {
    notFound();
  }

  return <ExpertDetailClient expert={expert} allExperts={rawData.experts} />;
}
