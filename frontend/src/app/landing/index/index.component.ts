import { setTitle } from './../../core/utilities';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    setTitle(this.title, 'Web Developer');
  }

}
