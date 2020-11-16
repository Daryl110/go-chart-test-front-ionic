import {NasaApiService} from "./nasa.api.service";
import { UtilsService } from "../utils.service";

export class NasaApiMarsWeather {

    API_URL: string = `${this.nasaService.API_URL_BASE}/insight_weather/?api_key=${this.nasaService.API_KEY}&feedtype=json&ver=1.0`

    constructor(private nasaService: NasaApiService, private utilsService: UtilsService) { }

    getWeather = () => this.nasaService.httpClient.get(this.API_URL)
      .toPromise().then((data: any) => {
          const { sol_keys: solKeys } : { sol_keys: [] } = data;
          const solKeysArray = [];
          const arrayMarsWeather = [];

          for (const solKey of solKeys) {
              const { AT: solValueWeather } = data[solKey];

              if (solValueWeather) {
                  solValueWeather.av = this.utilsService.centigradeToFahrenheit(solValueWeather.av);
                  solValueWeather.mn = this.utilsService.centigradeToFahrenheit(solValueWeather.mn);
                  solValueWeather.mx = this.utilsService.centigradeToFahrenheit(solValueWeather.mx);

                  delete solValueWeather.ct;

                  arrayMarsWeather.push(solValueWeather);
                  solKeysArray.push(solKey);
              }
          }

          return {
            data: arrayMarsWeather,
            keys: solKeysArray
          };
      });
}
