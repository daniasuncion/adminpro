import Swal from 'sweetalert2';
import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";

declare const gapi : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'
  ]
})
export class LoginComponent implements OnInit{

	public formSubmitted = false;
	public auth2:any;


	public loginForm = this.fb.group({
		email: ['', [ Validators.required , Validators.email],  ],
		password: ['', [ Validators.required ],  ],
		remember: [false]
	});


  constructor(private router : Router, private fb: FormBuilder, private usuarioService : UsuarioService,private ngZone: NgZone) { }

	login(){
		if(this.loginForm.invalid){
			Swal.fire('Error','Por favor, rellene los campos requeridos con un formato válido', 'error')
		}
		this.usuarioService.login(this.loginForm.value).subscribe((resp : any) => {
				this.router.navigateByUrl('/dashboard')
		}, (err) => Swal.fire('Error',err.error.msg, 'error'));

	}

	ngOnInit(): void {
		this.renderButton();
  	this.loginForm.get('email').setValue(localStorage.getItem('email') || '');

	}

	renderButton() {
		gapi.signin2.render('my-signin2', {
			'scope': 'profile email',
			'width': 240,
			'height': 50,
			'longtitle': true,
			'theme': 'dark',

		});
		this.startApp();
	}

	async startApp() {
  	await this.usuarioService.googleInit();
  	this.auth2 = this.usuarioService.auth2;
  	this.attachSignin(document.getElementById('my-signin2'));

	};

	attachSignin(element) {
		this.auth2.attachClickHandler(element, {},
			(googleUser) => {
				var id_token = googleUser.getAuthResponse().id_token;
				this.usuarioService.loginGoogle(id_token).subscribe((resp : any) => {
					this.ngZone.run(() => {
						this.router.navigateByUrl('/dashboard');
					})
				}, (err) => Swal.fire('Error',err.error.msg, 'error'));
			}, function(error) {
				Swal.fire('Error',error, 'error')
			});
	}
}
