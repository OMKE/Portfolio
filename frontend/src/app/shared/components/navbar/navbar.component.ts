import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  show = false;

  // invertedColor: boolean = true;

  ngOnInit(): void {
    document.addEventListener('scroll' , e => {
      this.show = false;
    });
  }


  toggle() {
    this.show = !this.show;
  }

  index() {
    return this.router.url === '/';
  }



}
