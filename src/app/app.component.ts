import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface NavItem {
  id: string;
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
      id: 'text-display',
      label: 'Text display',
      description: 'Show words and characters',
      items: [
        { id: 'single-line', label: 'Single line', link: '' },
        { id: '', label: 'Multi-line', link: '' },
        { id: '', label: 'Flashing border', link: '' }
      ]
    },
    {
      id: 'animation',
      label: 'Animation',
      description: 'Create eye-catching effects',
      items: [
        { id: '', label: 'Plasma', link: '' },
        { id: '', label: 'Precipitation', link: '' },
        { id: '', label: 'Robot mouth', link: '' },
        { id: '', label: 'Swirl', link: '' }
      ]
    },
    {
      id: 'visualization',
      label: 'Visualization',
      description: 'Represent data visually',
      items: [
        { id: '', label: 'Cellular automata', link: '' },
        { id: '', label: 'Clock', link: '' },
        { id: '', label: 'CPU usage', link: '' },
        { id: '', label: 'Forest fire', link: '' },
        { id: '', label: 'Graph', link: '' },
        { id: '', label: 'Temperature', link: '' }
      ]
    },
    {
      id: 'connected',
      label: 'Connected',
      description: 'Use things from the internet',
      items: [{ id: '', label: 'Twitter hashtag', link: '' }]
    }
  ];

  constructor(private http: HttpClient) {}

  clear() {
    this.http
      .post<{ message?; error? }>('/api/clear', {})
      .pipe(
        catchError(result => {
          if (result.error) {
            console.error(result.error);
          }
          return of(result.message ? result : { message: 'Failed' });
        })
      )
      .subscribe(result => console.log(result));
  }
}
