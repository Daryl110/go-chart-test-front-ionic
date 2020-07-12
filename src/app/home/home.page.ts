import {Component, OnInit } from '@angular/core';
import { chartJS, D3 } from '@daryl110/go-chart';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {}

  ngOnInit() {
    /*chartJS.barChart(
      'titulo',
      document.getElementById('graficos'),
      'grafico_1',
      [
        'Agua',
        'Luz',
        'Gas'
      ],
      [
        {
          data: [ 15, 25, 30 ],
          label: 'PAGADO'
        },
        {
          data: [ 50, 10, 20 ],
          label: 'NO PAGADO'
        }
      ],
      false,
      'top',
      (value) => {
        alert(`Este es el valor ${value}`);
      }
    );*/
    D3.treeChart(document.getElementById('graficos'), 'grafico_1', { name: 'root', children: [
        {
          name: 'node_1'
        }
      ]});
  }
}
