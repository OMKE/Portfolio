import { trigger, transition, style, query, animateChild, group, animate, state, stagger } from '@angular/animations' 

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> AboutMePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 0
        })
      ]),
      query(':enter', [
          animate('500ms ease', 
            style({ opacity: 1 })

          )
      ]),
    ]),
  ]);

export const fadeInTimeout = 500;
export const fadeIn =  trigger('fadeIn', [
  state('1', style({ opacity: 1, transform: 'translateY(0)' } )),
  state('0', style({ opacity: 0, transform: 'translateY(3rem)' } )),
  transition('1 <=> 0', animate(fadeInTimeout))
]);


