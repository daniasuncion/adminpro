import { Component, OnInit } from '@angular/core';
import {reject} from "q";
import {error} from "selenium-webdriver";

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
		this.getUsuarios().then( usuarios => console.log(usuarios));
  	// const promesa  = new Promise((resolve, reject) => {
  	// 	if(false){
		// 		resolve('Hola mundo');
		// 	}else {
  	// 		reject('error en promesa');
		// 	}
		// });
		//
  	// promesa.then((mensaje) => {
  	// 	console.log(mensaje)
		// })
		// .catch(error => console.log('Error Controlado : ',error));
		// console.log('Fin INIT')
  }

  getUsuarios(){
  	return new Promise(resolve =>{
			fetch('https://reqres.in/api/users')
				.then( resp => resp.json() )
				.then(body => console.log(body.data))
  	});
	}

}
