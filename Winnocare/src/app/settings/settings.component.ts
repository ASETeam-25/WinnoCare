import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  languages = [
    { lang: "English", code: 'en' },
    { lang: "French", code: 'fr' }
  ];
  defaultLang: string = "";

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.defaultLang = this.languages[0].lang;
    let preferredLang = sessionStorage.getItem("language");
    if (preferredLang != null) {
      this.defaultLang = preferredLang;
    }
  }

  languageSelected(lang: string) {
    let selectedLang = this.languages.filter(val => val.lang === lang);
    sessionStorage.setItem("language", selectedLang[0].lang);
    this.translateService.use(selectedLang[0].code);
  }
}
