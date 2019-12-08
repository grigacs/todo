import {ChangeDetectorRef, Pipe, PipeTransform} from '@angular/core';
import {hasOwnProperty} from 'tslint/lib/utils';
import {AsyncPipe} from '@angular/common';
import {interval, Observable, pipe} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Pipe({
  name: 'dateAgo',
  pure: true
})
export class DateAgoPipe extends AsyncPipe implements PipeTransform {
  value: Date;
  timer: Observable<string>;

  constructor(ref: ChangeDetectorRef) {
    super(ref);
  }

  transform(obj: any, ...args: any[]): any {

      if (obj instanceof Date) {
        this.value = obj;

        if (!this.timer) {
          this.timer = this.getObservable();
        }
        return super.transform(this.timer);
      }

      return super.transform(obj);
  }

  private getObservable() {
    return interval(1000).pipe(
      startWith(0),
      map(() => {
      let result: string;
      // current time
      const now = new Date().getTime();

      // time since message was sent in seconds
      const delta = (now - +new Date(this.value)) / 1000;

      // format string
      if (delta < 10) {
        result = 'Just now';
      } else if (delta < 60) { // sent in last minute
        result = Math.floor(delta) + ' seconds ago';
      } else if (delta < 3600) { // sent in last hour
        result = Math.floor(delta / 60) + ' minutes ago';
      } else if (delta < 86400) { // sent on last day
        result = Math.floor(delta / 3600) + ' hours ago';
      } else { // sent more than one day ago
        result = Math.floor(delta / 86400) + ' days ago';
      }
      return result;
    }));
  }
}

