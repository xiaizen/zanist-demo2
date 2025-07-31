export interface Essay {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: string;
  university: string;
  professor: string;
  referenceLink: string;
  tags: string[];
  publishDate: string;
  readTime: number;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}