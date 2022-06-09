import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { URI } from 'src/app/common/uri';
import { ApiCallsService } from 'src/app/services/api-calls.service';

@Component({
  selector: 'app-gitst-results',
  templateUrl: './gitst-results.component.html',
  styleUrls: ['./gitst-results.component.scss']
})
export class GitstResultsComponent implements OnInit, OnChanges {
  @Input() userName: string = '';
  gistData: any;
  loader: boolean = false;
  gistCall: Subscription = new Subscription();
  gistUserCall: Subscription = new Subscription();
  constructor(private remote: ApiCallsService) {}

  ngOnInit(): void {
    this.fetchGists();
  }

  ngOnChanges(changes: any) {
    if (changes.userName.currentValue !== changes.userName.previousValue) {
      if (changes.userName.currentValue) {
        this.fetchUserGist();
      } else {
        this.fetchGists();
      }
    }
  }

  fetchUserGist = () => {
    this.loader = true;
    this.gistData = null;
    this.gistUserCall = this.remote
      .get(URI.userGist.replace('{username}', this.userName))
      .subscribe(response => {
        this.loader = false;
        this.prepareGistData(response);
      });
  };

  fetchGists = () => {
    this.loader = true;
    this.gistData = null;
    this.gistCall = this.remote
      .get(URI.publicGist + '?per_page=100&page=1')
      .subscribe(response => {
        this.loader = false;
        this.prepareGistData(response);
      });
  };

  prepareGistData = (response: any) => {
    this.gistData = response;
    this.gistData.map((gist: any) => {
      const files = Object.keys(gist.files);
      const tags: string[] = [];
      files.forEach(file => {
        tags.push(gist.files[file].type);
      });
      if (!gist.forks || gist.forks.length === 0) {
        gist.forks = [{
          user: {
            avatar_url: gist.owner.avatar_url,
            name: gist.owner.login,
            url: gist.owner
          }
        }, 
        {
          user: {
            avatar_url: gist.owner.avatar_url,
            name: gist.owner.login,
            url: gist.owner
          }
        }, {
          user: {
            avatar_url: gist.owner.avatar_url,
            name: gist.owner.login,
            url: gist.owner
          }
        }]
      }
      gist.tags = tags;
    });
  };

  ngOnDestroy() {
    if (this.gistCall) {
      this.gistCall.unsubscribe();
    }
    if (this.gistUserCall) {
      this.gistUserCall.unsubscribe();
    }
  }
}
