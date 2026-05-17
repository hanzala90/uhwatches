'use client';

import dynamic from 'next/dynamic';

export const MaterialsHorizontal = dynamic(
  () => import('@/components/home/MaterialsHorizontal'),
  { ssr: false }
);

export const ConfiguratorTeaser = dynamic(
  () => import('@/components/home/ConfiguratorTeaser'),
  { ssr: false }
);
