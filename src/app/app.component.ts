import { Component } from '@angular/core';

export interface NavItem {
  label: string;
  description?: string;
  items?: NavItems;
  link?: string;
}
export type NavItems = NavItem[];

@Component({
  selector: 'joul-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navItems: NavItems = [
    {
      label: 'Text display',
      description: 'Show words and characters',
      items: [
        { label: 'Single line', link: '' },
        { label: 'Multi-line', link: '' },
        { label: 'Flashing border', link: '' }
      ]
    },
    {
      label: 'Animation',
      description: 'Create eye-catching effects',
      items: [
        { label: 'Plasma', link: '' },
        { label: 'Precipitation', link: '' },
        { label: 'Robot mouth', link: '' },
        { label: 'Swirl', link: '' }
      ]
    },
    {
      label: 'Visualization',
      description: 'Represent data visually',
      items: [
        { label: 'Cellular automata', link: '' },
        { label: 'Clock', link: '' },
        { label: 'CPU usage', link: '' },
        { label: 'Forest fire', link: '' },
        { label: 'Graph', link: '' },
        { label: 'Temperature', link: '' }
      ]
    },
    {
      label: 'Connected',
      description: 'Use things from the internet',
      items: [{ label: 'Twitter hashtag', link: '' }]
    }
  ];
}
