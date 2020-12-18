import { environment } from './../../../environments/environment';

import { Title } from '@angular/platform-browser';

export const setTitle = (title: Title, pageName: string): void => {
    title.setTitle(`${environment.appName} — ${pageName}`);
};
