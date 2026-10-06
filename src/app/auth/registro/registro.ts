import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import type Iusuario from '../../interfaces/usuario';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})

export class RegistroComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  registroForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    tipoSangre: new FormControl('', [Validators.required]),
    colorOjos: new FormControl('', [Validators.required]),
    diasVacaciones: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  
  get f() {
    return this.registroForm.controls;
  }

  async onRegistrar() {
    if (this.registroForm.valid) {

      const nuevoUsuario: Iusuario = {
        email: this.registroForm.value.email!,
        password: this.registroForm.value.password!,
        nombre: this.registroForm.value.nombre!,
        apellido: this.registroForm.value.apellido!,
        fechaNacimiento: this.registroForm.value.fechaNacimiento!,
        tipoSangre: this.registroForm.value.tipoSangre!,
        colorOjos: this.registroForm.value.colorOjos!,
        diasVacaciones: Number(this.registroForm.value.diasVacaciones)
      };

      try {
        await this.authService.registrar(nuevoUsuario);
        
        this.router.navigate(['/']); 
      } catch (error) {
        console.error('Hubo un error al registrar en el componente:', error);
      }
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}