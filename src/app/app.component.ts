import { Component, OnInit } from '@angular/core';

import { FoodEntry } from './food-entry'
import { FoodDataService } from './food-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
  private _foodDataService: FoodDataService) {
    this.getFoodData()
  }

  private errorMessage:any = '';

  title = 'dumb food app';
  foodEntries: FoodEntry[];

  getFoodData(): void {
    this._foodDataService.getFoodData()
        .then(
            foodEntries => this.foodEntries = foodEntries,
            error => this.errorMessage = <any>error);
  }
}
