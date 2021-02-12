import { environment } from './../../../environments/environment';
import { stripHtml } from './../../core/utilities/misc.utils';
import {
  selectWorkImagesByWorkId,
  selectWorkImagesByWorkIdLoaded,
} from './../../core/store/work-image/work-image.selectors';
import { loadWork } from './../../core/store/works/works.actions';
import {
  selectWorkById,
  selectWorkByIdLoaded,
} from './../../core/store/works/works.selectors';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store';
import { Work } from 'src/app/core/store/works/work.model';
import { ActivatedRoute } from '@angular/router';
import { loadWorkImages } from 'src/app/core/store/work-image/work-image.actions';
import { WorkImage } from 'src/app/core/store/work-image/work-image.model';
import { SeoComponent } from 'src/app/shared/abstracts/seo.abstract';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent extends SeoComponent implements OnInit {
  work$: Observable<Work>;
  images$: Observable<WorkImage[]>;

  loaded$: Observable<boolean>;

  loadedImages$: Observable<boolean>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.seo('', [
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

    const workId = this.route.snapshot.params.id;

    this.store.dispatch(loadWork({ workId }));
    this.store.dispatch(loadWorkImages({ workId }));
    this.work$ = this.store.pipe(select(selectWorkById(workId)));
    this.images$ = this.store.pipe(select(selectWorkImagesByWorkId(workId)));
    this.loaded$ = this.store.pipe(select(selectWorkByIdLoaded(workId)));
    this.loadedImages$ = this.store.pipe(
      select(selectWorkImagesByWorkIdLoaded(workId))
    );

    this.loaded$.subscribe((res) => {
      if (res === false) {
        this.seo(`Work #${this.route.snapshot.params.id}`, [
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
        ]);
      } else {
        this.work$.subscribe((res) => {
          this.seo(res.title, [
            {
              name: 'keywords',
              content: stripHtml(res.description).split(' ').join(', '),
            },
            { name: 'description', content: stripHtml(res.description) },
            { name: 'author', content: `${environment.appName}` },
          ]);
        });
      }
    });
  }
}
