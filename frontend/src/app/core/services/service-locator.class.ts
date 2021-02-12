import { Injector } from '@angular/core';

/*
    Provides global Service Injector in main module so we can inject services in base classes without doing it again in inherited.
    Usage: constructor() { this.titleService = ServiceLocator.injector.get(Title); }
*/

export class ServiceLocator {
    static injector: Injector;
}
