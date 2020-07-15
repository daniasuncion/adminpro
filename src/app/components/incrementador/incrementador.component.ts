import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {min} from "rxjs/operators";

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

	@ViewChild('txtProgress ') txtProgress : ElementRef;


	@Input('nombre') leyenda: string = "Leyenda";
	@Input() progreso: number = 50;
	@Output() cambioValor: EventEmitter<number> = new EventEmitter<number>();
  constructor() {
  	// console.log('Leyenda : ', this.leyenda);
  	// console.log('Progreso : ', this.progreso);
	}

  ngOnInit(): void {
		// console.log('Leyenda : ', this.leyenda);
		// console.log('Progreso : ', this.progreso);
  }

	onChanges( newValue: number){


		let maxvalue = 100, minvalue = 0;
		if(newValue <= minvalue){
			this.progreso = minvalue;
		}else if(newValue >= maxvalue){
			this.progreso = maxvalue;
		}else{
			this.progreso =  newValue;
		}

		this.txtProgress.nativeElement.value = this.progreso;
		this.cambioValor.emit( this.progreso );

	}

	cambiarValor(valor : number){

		if((this.progreso >= 100 || this.progreso+valor>=100) && valor > 0){
			this.progreso = 100;
			return;
		}
		if((this.progreso <= 0 || this.progreso+valor<=0) && valor < 0){
			this.progreso = 0;
				return;
		}
		this.progreso +=  valor;
		this.cambioValor.emit( this.progreso );
		this.txtProgress.nativeElement.focus();
	}


}
