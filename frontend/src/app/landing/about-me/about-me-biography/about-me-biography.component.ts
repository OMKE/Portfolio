import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'app-about-me-biography',
  templateUrl: './about-me-biography.component.html',
  styleUrls: ['./about-me-biography.component.scss'],
})
export class AboutMeBiographyComponent implements OnInit {

  constructor() { }

  @Input()
  content: string;

  ngOnInit(): void {

  }

}
