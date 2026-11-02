export interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  shortDesc: string;
  fullDesc: string;
  imageUrl: string;
  capabilities: string[];
  equipment: string[];
  typicalTransit: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  imageUrl: string;
  keyMetric: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  lane: string;
  serviceType: string;
  metric: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
