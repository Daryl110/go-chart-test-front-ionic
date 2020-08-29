import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { PokeTypes } from "./pokeTypes";

const { poke_api_url } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  API_URL_BASE: string = poke_api_url;
  public pokeTypesService: PokeTypes;

  constructor(
    public httpClient: HttpClient
  ) {
    this.pokeTypesService = new PokeTypes(this);
  }
}
