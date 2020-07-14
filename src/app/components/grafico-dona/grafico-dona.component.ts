import {Component, Input, OnInit} from '@angular/core';
import {Label, MultiDataSet} from "ng2-charts";
import {ChartType} from "chart.js";

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: [
  ]
})
export class GraficoDonaComponent implements OnInit {

	@Input('datos') datos: any = {};

	public labels: Label[] = [];
	public data: MultiDataSet = [];
	public tipo: ChartType = 'doughnut';
	public leyenda : string = "";

  constructor() { }

  ngOnInit(): void {
	this.labels = this.datos.labels;
	this.data = this.datos.data;
	this.tipo = this.datos.type;
	this.leyenda = this.datos.leyenda;
  }

}
