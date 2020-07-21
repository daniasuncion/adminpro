import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterForm} from "../interfaces/registerForm.interface";
import {environment} from "../../environments/environment";
import {loginForm} from "../interfaces/loginForm.interface";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {Usuario} from "../models/usuario.model";


const base_url = environment.base_url;
declare const gapi:any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


	public auth2:any;
	public usuario : Usuario;
  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
  	this.googleInit();
	}

	get token():string{
  	return localStorage.getItem('token') || '';
	}

	get uid():string{
  	return this.usuario.uid || '';
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

  	return this.http.get(`${base_url}/login/renew`,{
  		headers: {
  			'x-token' : this.token
			}
		}).pipe(
			map((resp:any) => {
				const {email, google, nombre, role, img = '', uid} = resp.usuario;
				this.usuario = new Usuario(nombre,email,'',img,google,role,uid);

					localStorage.setItem('token',resp.token)
				return true;
				}),
			// map(resp=> true),
			catchError(err => of(false)));
	}

	crearUsuario(formData : RegisterForm){

  	return this.http.post(`${base_url}/usuarios`,formData).pipe(
  		tap( (resp:any) => {
				localStorage.setItem('token',resp.token);
			})
		);

	}

	actualizarPerfil( data: {email:string,nombre:string,role:string}){

  	data = {
  		...data,
			role:this.usuario.role
		};

		return this.http.put(`${base_url}/usuarios/${this.uid}`,data,{
			headers: {
				'x-token' : this.token
			}
		});
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
