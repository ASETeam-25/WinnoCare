import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Settings', url: '/login', icon: 'settings' },
    { title: 'Logout', url: '/login', icon: 'log-out' },
  ];
  constructor() {}
}
