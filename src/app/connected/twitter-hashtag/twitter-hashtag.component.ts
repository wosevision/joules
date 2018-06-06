import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { Method } from '../../core/methods.service';
import { alphanumeric } from '../../shared/validators';
import { filter, debounceTime, distinctUntilChanged, switchMap, tap, map } from 'rxjs/operators';

@Component({
  selector: 'joul-twitter-hashtag',
  templateUrl: './twitter-hashtag.component.html',
  styleUrls: ['./twitter-hashtag.component.scss']
})
export class TwitterHashtagComponent {
  fieldValue = new FormControl('', alphanumeric());
  method: Method.TwitterHashtag = Method.TwitterHashtag;

  suggestions = this.fieldValue.valueChanges
    .pipe(
      filter((text: string) => text.length > 2),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.http.get<{hashtags}>(`/api/hashtags?q=${term}`)),
      map(result => result.hashtags),
      tap(console.log.bind(console))
    );

    constructor(private http: HttpClient) {}
}
