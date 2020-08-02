import {Component, OnInit } from '@angular/core';
import { chartJS } from '@daryl110/go-chart';
import {NasaApiService} from "../../services/nasa.api.services/nasa.api.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private nasaApiService: NasaApiService) {}

  ngOnInit() {
    this.nasaApiService.getMarsWeather().then(({ data, keys}) => {
      chartJS.barChart(
        'Nasa MARS Weather',
        document.getElementById('mars_weather_container'),
        'nasa_mars_weather_bar',
        ['°F min', '°F average', '°F max'],
        [
          {
            data: [
              data[0].mn,
              data[0].av,
              data[0].mx
            ],
            label: `SOL ${keys[0]}`,
            backgroundOpacity: true
          },
          {
            data: [
              data[1].mn,
              data[1].av,
              data[1].mx
            ],
            label: `SOL ${keys[1]}`,
            backgroundOpacity: true
          },
          {
            data: [
              data[3].mn,
              data[3].av,
              data[3].mx
            ],
            label: `SOL ${keys[3]}`,
            backgroundOpacity: true
          },
          {
            data: [
              data[4].mn,
              data[4].av,
              data[4].mx
            ],
            label: `SOL ${keys[4]}`,
            backgroundOpacity: true
          },
          {
            data: [
              data[5].mn,
              data[5].av,
              data[5].mx
            ],
            label: `SOL ${keys[5]}`,
            backgroundOpacity: true
          },
          {
            data: [
              data[6].mn,
              data[6].av,
              data[6].mx
            ],
            label: `SOL ${keys[6]}`,
            backgroundOpacity: true
          },
        ]
      );
    });
  }
}
