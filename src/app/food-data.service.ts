import { Injectable }    from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { FoodEntry } from './food-entry';


@Injectable()
export class FoodDataService {
  private dataUrl = 'https://spreadsheets.google.com/feeds/list/1XnVoyD5B_WJlsEKyYHxjZ2jmrWAEo7-owl0w39pYQAg/od6/public/values?alt=json';  // URL to web api

  constructor(private http: Http) { }

  getFoodData(): Promise<FoodEntry[]> {
    return this.http.get(this.dataUrl)
               .toPromise()
               .then(this.extractData)
               .catch(this.handleError);
  }

  extractData(res: Response) {
    let body = res.json();
    console.log(body);

    let transData = body.feed.entry.map(function(entryPoint){
      console.log(entryPoint);
      let day = {};
      day['date'] = entryPoint.title.$t;
      day['meaty'] = entryPoint.gsx$meaty.$t;
      day['breadygrainy'] = entryPoint.gsx$breadygrainy.$t;
      day['dairy'] = entryPoint.gsx$dairy.$t;
      day['drinky'] = entryPoint.gsx$drinky.$t;
      day['fruity'] = entryPoint.gsx$fruity.$t;
      day['veggie'] = entryPoint.gsx$veggie.$t;
      return day;
    });
    return transData || [];
  }

  private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
