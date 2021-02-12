import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { SeoComponent } from '../../shared/abstracts/seo.abstract';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent extends SeoComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.seo('Web Developer', [
      {
        name: 'keywords',
        content: `${environment.appName}, Full stack, Web Developer, Software Engineer, Angular, React, Github, Portfolio`,
      },
      {
        name: 'description',
        content:
          'Web Developer, Student of Software and Information Engineering, Category: Web Developing, Software Engineering, Type: Personal Website',
      },
      { name: 'author', content: `${environment.appName}` },
      { name: 'robots', content: 'index, follow' },
    ]);
  }
}
