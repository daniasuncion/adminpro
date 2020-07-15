import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

	private linkTheme	= document.querySelector('#theme');
	public links : NodeListOf<Element>;
	ajustes : Ajustes = {temaUrl:'./assets/css/colors/default.css',tema:'default'};

  constructor(@Inject(DOCUMENT) private _document) {
		//colocar tema por defecto
		const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
		this.linkTheme.setAttribute('href',url);
  	this.cargarAjustes()
	}


	cambiarColor(tema : string ){

		const url = `./assets/css/colors/${tema}.css`;
		this.linkTheme.setAttribute('href',url);
		localStorage.setItem('theme',url);
		this.aplicarCheck();
	}

	aplicarCheck(){
		const links = document.querySelectorAll('.selector');
		links.forEach(elem => {
			elem.classList.remove('working');
			const btnTheme = elem.getAttribute('data-theme');
			const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
			const currentTheme = this.linkTheme.getAttribute('href');
			if(btnThemeUrl === currentTheme){
				elem.classList.add('working');
			}
		});
	}



	guardarAjustes(){
  	localStorage.setItem('ajustes',JSON.stringify(this.ajustes))
	}

	cargarAjustes(){
		if(localStorage.getItem('ajustes')){
			this.ajustes=JSON.parse(localStorage.getItem('ajustes'));
		}
		// this.aplicarTema(this.ajustes.tema)
	}

	aplicarTema(tema : string){
		let url = `./assets/css/colors/${tema}.css`;
		this._document.getElementById('tema').setAttribute('href',url);
		this.ajustes.tema = tema;
		this.ajustes.temaUrl = url;
		this.guardarAjustes();
	}
}

interface Ajustes {
	temaUrl : string;
	tema : string;
}