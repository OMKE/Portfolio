import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-oval-loader',
  templateUrl: './oval-loader.component.html',
  styleUrls: ['./oval-loader.component.scss'],
})
export class OvalLoaderComponent implements OnInit {
  @Input() invert = false;

  constructor() {}

  ngOnInit(): void {}
}
