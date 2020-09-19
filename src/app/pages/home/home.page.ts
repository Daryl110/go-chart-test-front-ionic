import {Component, OnInit } from '@angular/core';
import { chartJS, D3 } from '@daryl110/go-chart';
import { NasaApiService } from "../../services/nasa.api.services/nasa.api.service";
import {PokeApiService} from "../../services/poke.api.services/poke.api.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private nasaApiService: NasaApiService,
    private pokeApiService: PokeApiService
  ) {}

  ngOnInit() {
    /*this.nasaApiService.getMarsWeather().then(({ data, keys}) => {

      const arrayData = data.map((e, i) => ({
        data: [
          e.mn,
          e.av,
          e.mx
        ],
        label: `SOL ${keys[i]}`,
        backgroundOpacity: true
      }));

      chartJS.barChart(
        'Nasa MARS Weather',
        document.getElementById('mars_weather_container'),
        'nasa_mars_weather_bar',
        ['°F min', '°F average', '°F max'],
        arrayData
      );
    });
    this.pokeApiService.pokeTypesService.getTypes().then(async ({ results }) => {

      const pokemonTypes = this.getPokemonTypeWithId(results);

      const nameTypes = [];
      const sizePokemonInType = pokemonTypes.map(({ id, name }) => {
        nameTypes.push(name);

        return this.pokeApiService.pokeTypesService.getTypeById(id).then(({ pokemon: { length } }) => length);
      });

      const arrayDataSets = [[]];

      for (let i = 0; i < sizePokemonInType.length; i++) {
        arrayDataSets[0].push(await sizePokemonInType[i]);
      }

      chartJS.polarAreaChart(
        'Pokemon Types (polarAreaChart)',
        document.getElementById('poke_types_polar'),
        'pokemon_types_polar',
        nameTypes,
        arrayDataSets,
        'top',
        undefined,
        true
      );

      chartJS.doughnutChart(
        'Pokemon Types (doughnutChart)',
        document.getElementById('poke_types_radar'),
        'pokemon_types_radar',
        nameTypes,
        arrayDataSets
      );

      chartJS.pieChart(
        'Pokemon Types (pieChart)',
        document.getElementById('poke_types_pie'),
        'pokemon_types_pie',
        nameTypes,
        arrayDataSets
      );
    });
    this.pokeApiService.pokeTypesService.getTypes().then(async ({ results }) => {
      const pokemonTypes = this.getPokemonTypeWithId(results);
      const data = {
        name: 'pokemon',
        children: []
      };

      const pokeTypesPromise = pokemonTypes.map(async ({ name, id }) => {
        const node = {
          name,
          children: []
        };
        const pokemon = await this.pokeApiService.pokeTypesService.getTypeById(id).then(({ pokemon }) => pokemon);

        pokemon.forEach(({ pokemon: { name: pokeName } }) => node.children.push({ name: pokeName }));

        return node
      });

      for (const result of pokeTypesPromise) {
        data.children.push(await result);
      }


      D3.collapsableTreeChart(
        document.getElementById('collapsable_tree_chart_poke_types'),
        'collapsable_tree_chart_poke_types_chart',
        data,
        650,
        1300
      );
    });*/

    D3.bubbleDragChart(
      document.getElementById('bubble_drag'),
      'bubble_drag_chart',
      [
        {
          cat: 'Total abonados',
          desc: 'Total abonados: 947183',
          name: 'ALMACENES EXITO INVERSIONES S.A.S.',
          value: 1,
        }
      ]
    );
  }

  getPokemonTypeWithId = (results) => results.map(({ url, name }) => ({
    id: url.split('/')[6],
    name
  }));
}
