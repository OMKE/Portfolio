import { setTitle } from './../../../../core/utilities/misc.utils';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  styleUrls: ['./add-work.component.scss']
})
export class AddWorkComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit(): void {
    setTitle(this.title, 'Works - Add');
  }

}
