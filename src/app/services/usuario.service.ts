import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterForm} from "../interfaces/registerForm.interface";
import {environment} from "../../environments/environment";
import {loginForm} from "../interfaces/loginForm.interface";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";


const base_url = environment.base_url;
declare const gapi:any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


	public auth2:any;
  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
  	this.googleInit();
	}


  googleInit(){
  	return new Promise(resolve => {
			gapi.load('auth2', () => {
				this.auth2 = gapi.auth2.init({
					client_id: '116836498552-8ln7eberv9djk7n8nslnin727dl524aj.apps.googleusercontent.com',
					cookiepolicy: 'single_host_origin'
				});
				resolve();
			});
		})

	}

  logout(){
  	localStorage.removeItem('token');
		this.auth2.signOut().then( () => {
			this.ngZone.run(() => {
				this.router.navigateByUrl('/auth/login');
			})
		})
	}

  validarToken(): Observable<boolean>{
  	const token = localStorage.getItem('token') || '';

  	return this.http.get(`${base_url}/login/renew`,{
  		headers: {
  			'x-token' : token
			}
		}).pipe(
			tap((resp:any) => {
					localStorage.setItem('token',resp.token)
				}),
			map(resp=> true),
			catchError(err => of(false)));
	}

	crearUsuario(formData : RegisterForm){

  	return this.http.post(`${base_url}/usuarios`,formData).pipe(
  		tap( (resp:any) => {
				localStorage.setItem('token',resp.token);
			})
		);

	}

	login(formData : loginForm){
  	if(formData.remember){
  		localStorage.setItem('email',formData.email);
		}else {
  		localStorage.removeItem('email');
		}
  	return this.http.post(`${base_url}/login`,formData).pipe(
			tap((resp:any) => {
				localStorage.setItem('token',resp.token)
			})
		);


	}


	loginGoogle(token : string){

  	return this.http.post(`${base_url}/login/google`,{token}).pipe(
			tap((resp:any) => {
				localStorage.setItem('token',resp.token)
			})
		);


	}


}
