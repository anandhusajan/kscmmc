
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type ImageRef = {
  id: string;
};

export type Product = {
  id: string;
  name: string;
  productType: 'product' | 'machine';
  category: string;
  image: ImageRef;
  shortDescription: string;
  specifications: { key: string; value: string }[];
  brochureUrl: string;
};

export type Tender = {
  id: string;
  title: string;
  referenceNumber: string;
  closingDate: string;
  documentUrl: string;
};

export type Job = {
  id: string;
  title: string;
  location: string;
  department: string;
  description: string[];
};

export type NewsArticle = {
  id: string;
  title: string;
  date: string;
  summary: string;
  image: ImageRef;
  link: string;
};

export type NavLink = {
  href: string;
  label: string;
  icon: IconDefinition;
};
