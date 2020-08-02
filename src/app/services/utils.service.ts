import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  centigradeToFahrenheit = (centigrade): number => (centigrade * 1.8000) + 32;
}
