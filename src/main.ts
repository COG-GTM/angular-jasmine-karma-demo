import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideZoneChangeDetection(),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient()
    ]
})
  .catch(err => console.error(err));
