import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  searchInput = '';
  focus = false;
  @Output() onSearch = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  searchGist = () => {
    this.onSearch.emit(this.searchInput);
  }

  resetGist = () => {
    this.searchInput = '';
    this.searchGist();
  }
}
