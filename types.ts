import React from 'react';

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role?: string; // Optional role/title like "Frei", "Padre"
  likes: number;
  timeAgo: string;
  isFamous?: boolean; // To highlight priests/celebrities
  liked?: boolean; // User interaction state
  image?: string; // Profile picture URL
}

export interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}