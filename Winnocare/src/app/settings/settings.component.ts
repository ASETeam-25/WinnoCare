import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColorMode, ColorModeService } from '../services/color-mode.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  colorModes: ColorMode[] = ['auto', 'dark', 'light'];
  currentColorMode: string;

  languages = [
    { lang: "English", code: 'en' },
    { lang: "French", code: 'fr' }
  ];
  defaultLang: string = "";

  constructor(
    private translateService: TranslateService,
    private colorModeService: ColorModeService) { }

  ngOnInit() {
    this.defaultLang = this.languages[0].lang;
    let preferredLang = localStorage.getItem("AppLanguage");
    if (preferredLang != null) {
      this.defaultLang = JSON.parse(preferredLang).lang;
    }

    this.currentColorMode =  this.colorModeService.getMode()
  }

  languageSelected(lang: string) {
    let selectedLang = this.languages.filter(val => val.lang === lang);
    localStorage.setItem("AppLanguage", JSON.stringify(selectedLang[0]));
    this.translateService.use(selectedLang[0].code);
  }

  changeColorScheme(event: any) {
    const colorMode = event.detail.value;
    this.colorModeService.setMode(colorMode);
  }
}
