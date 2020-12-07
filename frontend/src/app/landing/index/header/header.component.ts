import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Rectangles - Responsive hack
    if (this.router.url === '/') {
      if (window.matchMedia('(max-width: 1950px)').matches) {
        document.body.style.overflowX = 'hidden';
      }
      // if user resizes the window, we make sure the overflow stays hidden
      window.onresize = () => {
       if (window.matchMedia('(max-width: 1950px)').matches) {
        document.body.style.overflowX = 'hidden';
        }
      };
    }
  }

}
