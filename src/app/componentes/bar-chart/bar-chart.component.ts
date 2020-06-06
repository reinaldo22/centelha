import { Chart } from './../../model/chart';
import { UsuarioService } from './../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  chart = new Chart();

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.carregarGrafico().subscribe(data => {
      this.chart = data;
      /*nomes*/
      this.barChartLabels = this.chart.nome.split(',');

      /*salario*/

      var salarioArray = JSON.parse('[' + this.chart.salario + ']');

      this.barChartData = [
        { data: salarioArray, label: 'SALÁRIO DOS USUÁRIOS' }
      ];

    });
  }
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Salário Usuário' }
  ];
}
