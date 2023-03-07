import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: string = "";

  public appPages = [
    { title: "DASHBOARD.DASHBOARD", url: 'dashboard', icon: 'home' },
    { title: "SETTINGS.SETTINGS", url: 'settings', icon: 'settings' },
    { title: "MENU.LOGOUT", url: 'login', icon: 'log-out' },
  ];

  constructor(
    private translateService: TranslateService,
    private userService: UserService) {
    this.initializeApp();
  }

  initializeApp() {
    this.translateService.setDefaultLang('en');
  }

  ngOnInit() {
    this.userService.getName().subscribe((val: any) => {
      this.user = val;
    });
  }

  ngOnDestroy() {
    this.userService.getName().unsubscribe();
  }
}
