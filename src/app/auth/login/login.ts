import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Iusuario from '../../interfaces/usuario';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  get f() {
    return this.loginForm.controls;
  }

  async onLogin() {
    if (this.loginForm.valid) {
      try {
        await this.authService.loguear({
          email: this.loginForm.value.email!,
          password: this.loginForm.value.password!
        } as Iusuario);
        
        this.router.navigate(['/']); 
      } catch (error) {
        console.error('Hubo un error al iniciar sesión:', error);
        alert('Credenciales incorrectas. Verificá tu mail o contraseña.');
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}