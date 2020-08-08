import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
  name: 'searchCurrency'
})
export class SearchPipe implements PipeTransform {

  transform(rates, search = '', base: string) {
    if (!search.trim()) {
      return rates;
    }

    const filtered = rates.filter(rate => {
      // tslint:disable-next-line: max-line-length
      if (rate.key.toLowerCase().includes(search.toLowerCase()) || `${base}${rate.key}`.toLowerCase().includes(search.toLowerCase())) {
        return rate;
      }
    });

    return filtered;
  }
}
