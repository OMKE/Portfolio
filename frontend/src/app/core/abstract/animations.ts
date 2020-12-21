import { trigger, transition, style, query, animateChild, group, animate, state, stagger } from '@angular/animations';

export const fadeInRouteAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 0
        })
      ], { optional: true }),
      query(':enter', [
          animate('500ms ease',
            style({ opacity: 1 })
                )
      ], {optional: true}),
    ]),
  ]);

export const fadeInTimeout = 500;
export const fadeIn =  trigger('fadeIn', [
  state('1', style({ opacity: 1 } )),
  state('0', style({ opacity: 0 } )),
  transition('1 <=> 0', animate(fadeInTimeout))
]);



