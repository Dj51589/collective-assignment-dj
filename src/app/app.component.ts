import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'collective-assignment';
  userInput: any;
  constructor() {}

  ngOnInit() {
  }

  searchGist() {

  }

  search = (value: any) => {
    debugger;
    this.userInput = value;
  }
  
}
