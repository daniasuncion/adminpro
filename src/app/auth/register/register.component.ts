import Swal from 'sweetalert2'
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ '../login/login.component.css'
  ]
})
export class RegisterComponent {

	public formSubmitted = false;

	public registerForm = this.fb.group({
		nombre: ['', [ Validators.required ],  ],
		email: ['', [ Validators.required , Validators.email],  ],
		password: ['', [ Validators.required ],  ],
		password2: ['', [ Validators.required ],  ],
		terminos: [false, [ Validators.required ],  ],
	},{
		validators: this.passwordsIguales('password','password2')
	});

  constructor(private router : Router, private fb : FormBuilder, private usuarioService : UsuarioService) {	}

  crearUsuario(){
  	this.formSubmitted = true;
		if(this.registerForm.invalid){
			return;
		}

		this.usuarioService.crearUsuario(this.registerForm.value).subscribe(resp => {
			this.usuarioService.login(this.registerForm.value).subscribe((resp : any) => {
				this.router.navigateByUrl('/dashboard');
				Swal.fire('¡Bien!','usuario creado', 'success');
			}, (err) => Swal.fire('Error',err.error.msg, 'error'));
		},(err) => Swal.fire('Error',err.error.msg, 'error'));
	}

	campoNoValido(campo :string) : boolean {
		if(this.registerForm.get(campo).invalid && this.formSubmitted){
			return true
		}else {
			return false;
		}
	}

	aceptaTerminos(){
  	return !this.registerForm.get('terminos').value && this.formSubmitted;
	}

	passwordNoValido(){
		if(this.formSubmitted) {
			return !(this.registerForm.get('password').value == this.registerForm.get('password2').value);
		} else{
				return false;
		}
	}

	passwordsIguales(pass1Name: string, pass2Name: string){
			return ( formGroup : FormGroup) => {
				const pass1Control = formGroup.get(pass1Name);
				const pass2Control = formGroup.get(pass2Name);

				if(pass1Control.value === pass2Control.value){
					pass2Control.setErrors(null);
				}else{
					pass2Control.setErrors({noEsIgual : true});
				}
			}
	}

}
