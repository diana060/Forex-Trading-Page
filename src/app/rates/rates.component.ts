import { Component, OnInit } from '@angular/core';

import { RatesService } from './rates.service';


@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit {

  currencies;

  timerIncrease;
  timerDecrease;

  step = 5000;
  timesAmount = 0;
  sec = 0;
  minValue = 1.0001;

  searchStr = '';

  isRaising: boolean;

  constructor(
    private readonly ratesService: RatesService
  ) { }

  ngOnInit(): void {
    this.ratesService.getRates().subscribe(data => {
      this.currencies = data;
      this.rasingRates();
    });
  }

  rasingRates(): void {
    this.timerIncrease = setInterval(() => {
      for (const key of Object.keys(this.currencies.rates)) {
        this.currencies.rates[key] += 0.0001;
        this.isRaising = true;
      }

      this.timesAmount++;
      this.sec += 5;

      if (this.timesAmount === 12 && this.sec !== 300) {
        clearInterval(this.timerIncrease);
        this.downRates();
      } else if (this.sec === 300) {
        clearInterval(this.timerIncrease);
      }
    }, this.step);
  }

  downRates(): void {
    this.timerDecrease = setInterval(() => {
      for (const key of Object.keys(this.currencies.rates)) {
        if (this.currencies.rates[key] > this.minValue) {
          this.currencies.rates[key] -= 0.0001;
          this.isRaising = false;
        } else {
          this.currencies.rates[key] = this.minValue;
        }
      }

      this.timesAmount--;
      this.sec += 5;

      if (this.timesAmount === 0 && this.sec !== 300) {
        clearInterval(this.timerDecrease);
        this.rasingRates();
      } else if (this.sec === 300) {
        clearInterval(this.timerDecrease);
      }
    }, this.step);
  }
}
