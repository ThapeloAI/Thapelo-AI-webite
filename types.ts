
import React from 'react';

export interface Project {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  year: string;
  tags: string[];
  status: 'Live' | 'Prototype';
  category: 'Automation' | 'Media' | 'Product' | 'Chat' | 'Mobile';
}

export interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  useCase: string;
  category: 'AI Writing' | 'Video Editing' | 'Automation' | 'Dev Tool' | 'Marketing' | 'Productivity';
  tags: string[];
  thumbnail: string;
}

export interface Pillar {
  title: string;
  description: string;
  icon: React.ReactNode;
}
