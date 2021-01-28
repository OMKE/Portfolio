import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  // Show state
  show = false;
  // Navbar sticky state
  sticky = false;

  navbarOffsetTop = 0;


  @ViewChild('navbar') navbarElement: ElementRef;

  @HostListener('window:scroll', ['$event']) onWindowScroll(event): void {

    this.show = false;

    if (window.pageYOffset !== 0) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }

  }

  // invertedColor: boolean = true;

  ngOnInit(): void {  }

  toggle(): void {
    this.show = !this.show;
  }

  index(): boolean {
    return this.router.url === '/';
  }



}
