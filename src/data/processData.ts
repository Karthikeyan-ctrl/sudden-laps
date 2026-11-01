export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'We learn your brand, goals and audience.',
  },
  {
    number: '02',
    title: 'Strategise',
    description: 'A clear roadmap of channels, content and budget.',
  },
  {
    number: '03',
    title: 'Create',
    description: 'Our team produces, designs and launches.',
  },
  {
    number: '04',
    title: 'Grow',
    description: 'We track, optimise and scale what works.',
  },
];
