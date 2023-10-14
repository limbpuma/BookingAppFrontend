import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(private translate: TranslateService) {
  const storedLang = localStorage.getItem('selectedLanguage');
  const defaultLang = storedLang ? storedLang : 'es';
  translate.setDefaultLang(defaultLang);
}

  useLanguage(language: string): void {
  this.translate.use(language);
  localStorage.setItem('selectedLanguage', language);
}
}
