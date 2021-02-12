import { setTitle } from '../../core/utilities/misc.utils';
import { ServiceLocator } from '../../core/services/service-locator.class';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';

export abstract class SeoComponent {
  protected titleService: Title;
  protected metaService: Meta;

  constructor() {
    this.titleService = ServiceLocator.injector.get(Title);
    this.metaService = ServiceLocator.injector.get(Meta);
  }

  get title(): Title {
    return this.titleService;
  }

  get meta(): Meta {
    return this.metaService;
  }

  protected seo(title: string, tags: MetaDefinition[]): void {
    setTitle(this.title, title);
    this.meta.addTags(tags);
  }
}
