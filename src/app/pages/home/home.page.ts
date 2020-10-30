import {Component, OnInit } from '@angular/core';
import { chartJS, D3 } from '@daryl110/go-chart';
import { NasaApiService } from "../../services/nasa.api.services/nasa.api.service";
import {PokeApiService} from "../../services/poke.api.services/poke.api.service";
import {Covid19Service} from "../../services/coronAPI/covid19.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  regions: any[] = [];
  dataBubbleDragChart: any[] = [];
  dataLabelsBubbleDrag: any[] = [];

  constructor(
      private nasaApiService: NasaApiService,
      private pokeApiService: PokeApiService,
      private coronApiService: Covid19Service
  ) { }

  ngOnInit() {
    this.getAllRegions();
    this.nasaApiService.getMarsWeather().then(({ data, keys }) => {

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
      const sizePokemonInType = pokemonTypes.map(({id, name}) => {
        nameTypes.push(name);

        return this.pokeApiService.pokeTypesService.getTypeById(id).then(({pokemon: {length}}) => length);
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
          document.getElementById('poke_types_doughnut'),
          'pokemon_types_doughnut',
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
    this.pokeApiService.pokeTypesService.getTypes().then(async ({results}) => {
      const pokemonTypes = this.getPokemonTypeWithId(results);
      const data = {
        name: 'pokemon',
        children: []
      };

      const pokeTypesPromise = pokemonTypes.map(async ({name, id}) => {
        const node = {
          name,
          children: []
        };
        const pokemon = await this.pokeApiService.pokeTypesService.getTypeById(id).then(({pokemon}) => pokemon);

        pokemon.forEach(({pokemon: {name: pokeName}}) => node.children.push({name: pokeName}));

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
          650
      );
    });
    this.createLineChartCovidRegion('colombia');
    this.coronApiService.getDataAllRegions().then(({ data: { regions: data } }: { data: { regions: any } }) => {
      const labels = Object.keys(data);
      const dataLabelsBubbleDrag = new Set;

      for (const label of labels) {
        const {
          name,
          iso3166a2,
          iso3166a3,
          iso3166numeric,
          change,
          ...element
        } = data[label];

        const keys = Object.keys(element);
        let countGroup = 1;

        for (const key of keys) {
          const value = element[key];
          this.dataBubbleDragChart.push({
            id: `${key}_${label}`,
            value,
            group: countGroup,
            description: `quantity of ${key} in ${label} region\nValue: ${value}`,
            group_id: key
          });
          dataLabelsBubbleDrag.add(key);
          countGroup++;
        }

        this.dataLabelsBubbleDrag = Array.from(dataLabelsBubbleDrag);
      }

      this.createBubbleDragChartAllRegions(this.dataBubbleDragChart);
    })
  };

  filterBubbleDragChart = ({ value }) => {
    this.deleteElementFromView('covid_all_regions', 'all_regions_bubble_drag_chart');

    let auxMaxValue = 0;
    let dataFiltered = this.dataBubbleDragChart.filter((element) => element.group_id === value);
    dataFiltered.forEach((element) => {
      if (element.value > auxMaxValue) auxMaxValue = element.value;
    });

    let radiusRange = auxMaxValue / (auxMaxValue.toString().replace('.', '').length * 10);

    this.createBubbleDragChartAllRegions(dataFiltered, radiusRange);
  }

  getAllRegions = () => this.coronApiService.getRegionsSupported().then(({ data }: { data: any[] }) => this.regions = data);

  getPokemonTypeWithId = (results) => results.map(({url, name}) => ({
    id: url.split('/')[6],
    name
  }));

  createLineChartWithEvent = ({ value: { key } }) => this.createLineChartCovidRegion(key);

  createBubbleDragChartAllRegions = (dataResult: any[], radiusRange = 1000000) => D3.bubbleDragChart(
      document.getElementById('covid_all_regions'),
      'all_regions_bubble_drag_chart',
      dataResult,
      1400,
      800,
      radiusRange
  );

  createLineChartCovidRegion = (region: string) => this.coronApiService.getDataEach30days(region).then(({ data }: { data: any }) => {
    this.deleteElementFromView('covid_data_regions', 'covid_19_data_reg');

    const { labels, datasets } = this.covidBuildData(data);

    chartJS.lineChart(
        `Covid-19 data region ${region}`,
        document.getElementById('covid_data_regions'),
        'covid_19_data_reg',
        labels,
        datasets
    );
  });

  private deleteElementFromView = (parent, element) => {
    const container = parent ? document.getElementById(parent) : document;

    try {
      container.removeChild(document.getElementById(element));
    } catch (e) {
    }
  };

  private covidBuildData = (data) => {
    const labels = Object.keys(data).reverse();
    const datasets = [];

    if (labels.length > 0) {
      const keys = Object.keys(data[labels[0]]);

      for (const key of keys) {
        const dataset: any = {};
        dataset.data = [];

        for (const keyElement of labels) {
          dataset.data.push(data[keyElement][key])
        }

        dataset.label = key;

        datasets.push(dataset);
      }
    }

    return {
      labels,
      datasets
    };
  };
}
