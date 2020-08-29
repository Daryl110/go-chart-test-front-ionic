import { PokeApiService } from './poke.api.service';

export class PokeTypes {

    API_URL: string = `${this.pokeApiService.API_URL_BASE}/type`;

    constructor(
      private pokeApiService: PokeApiService
    ) { }

    getTypes = (): any => this.pokeApiService.httpClient.get(this.API_URL).toPromise();
    getTypeById = (id: number): any => this.pokeApiService.httpClient.get(`${this.API_URL}/${id}`).toPromise();
}


