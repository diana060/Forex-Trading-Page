import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getRates() {
    return this.httpClient.get('../../assets/currencies.json');
  }
}
