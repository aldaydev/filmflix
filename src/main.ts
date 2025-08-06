import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// (function setInitialTheme() {
//   if (typeof window !== 'undefined') {
//     const isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
//     document.documentElement.classList.toggle('light', isLight);

//     requestAnimationFrame(() => {
//       document.documentElement.classList.add('theme-ready');
//     });
//   }
// })();


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
