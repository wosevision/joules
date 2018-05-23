import { Component } from '@angular/core';
import { MethodsService, Method } from './core/methods.service';

import axis from 'axis.js';
import routes from '../../common/routes.json';

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
  navItems: NavItems = routes
    .find(path => path.group === 'scrollphat').paths
    .reduce(
      (final, path) => axis.isObject(path) ? [...final, {
        id: path.group,
        description: path.description,
        items: path.paths
      }] : final,
      []
    );

  constructor(private methods: MethodsService) {}

  clear() {
    this.methods.send(Method.Clear).subscribe(result => console.log(result));
  }

  test() {
    this.methods.send(Method.Mock).subscribe(result => console.log(result));
  }
}
