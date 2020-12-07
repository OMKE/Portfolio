import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  show: boolean = false;

  // invertedColor: boolean = true;

  ngOnInit(): void {
    
  }


  toggle() {
    this.show = !this.show;
  }

  invert() {
    return this.router.url === '/';
  }



}
