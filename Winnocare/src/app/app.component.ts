import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColorModeService } from './services/color-mode.service';
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
    private userService: UserService,
    private colorMode: ColorModeService) {
    this.initializeApp();
  }

  initializeApp() {
    let preferredLang = localStorage.getItem("AppLanguage");
    if (preferredLang != null) {
      this.translateService.setDefaultLang(JSON.parse(preferredLang).code);
    } else {
      this.translateService.setDefaultLang('en');
    }
    
    this.colorMode.darkMode$.subscribe((darkMode) => {
      if (darkMode) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    })
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
