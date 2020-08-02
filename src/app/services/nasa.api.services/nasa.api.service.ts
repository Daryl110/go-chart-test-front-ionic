import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { NasaApiMarsWeather } from "./nasaMarsWeather";
import {UtilsService} from "../utils.service";

const { nasa_api_config: NASA_CONFIG } = environment;

@Injectable({
  providedIn: 'root'
})
export class NasaApiService {

  API_URL_BASE: string = NASA_CONFIG.url_base;
  API_KEY: string = NASA_CONFIG.api_key;

  private nasaMarsWeather: NasaApiMarsWeather;

  constructor(
    public httpClient: HttpClient,
    private utilsService: UtilsService
  ) {
    this.nasaMarsWeather = new NasaApiMarsWeather(this, utilsService);
  }

  getMarsWeather = () => this.nasaMarsWeather.getWeather();
}
