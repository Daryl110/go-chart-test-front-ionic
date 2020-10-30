import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const { corona_api_url } = environment;

@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  CORONA_API_URL_BASE: string = `${corona_api_url}/api/v1`;

  constructor(private httpClient: HttpClient) {
  }

  getDataEach30days = (region: string) => this.httpClient.get(`${this.CORONA_API_URL_BASE}/spots/month?region=${region}`).toPromise();

  getDataAllRegions = () => this.httpClient.get(`${this.CORONA_API_URL_BASE}/summary/latest`).toPromise();

  getRegionsSupported = () => this.httpClient.get(`${this.CORONA_API_URL_BASE}/regions`).toPromise();
}
