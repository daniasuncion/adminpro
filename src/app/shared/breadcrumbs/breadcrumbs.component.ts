import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, ActivationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

	public titulo : string ;
	public tituloSubs$ : Subscription ;


  constructor(private router: Router, private route: ActivatedRoute) {


  	this.tituloSubs$ = this.getDataRuta()
															.subscribe( data => { // ({titulo}) objeto data desestructurado (solo cojo lo que me interesa del parametro que llega)
																this.titulo = data.titulo;
																console.log(data)
																document.title = `AdminPro - ${data.titulo}`;
															});
	}

	getDataRuta(){
		return this.router.events.pipe(
												filter( event => event instanceof ActivationEnd ),
												filter( (event:ActivationEnd) => event.snapshot.firstChild==null),
												map((event:ActivationEnd) => event.snapshot.data ),
											)

	}

	ngOnDestroy(): void {
  	this.tituloSubs$.unsubscribe();
	}



}
