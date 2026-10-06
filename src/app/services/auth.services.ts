import { Injectable, inject, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';
import Iusuario from '../interfaces/usuario';
import { Supabase } from './supabase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  supabaseService = inject(Supabase);

  usuarioActual = signal<User | null>(null);

  constructor() {
    this.supabaseService.supabase.auth.getSession().then((res) => {
      this.usuarioActual.set(res.data.session?.user || null);
    });
  }

  async registrar(usuario: Iusuario) {
    const { data, error } = await this.supabaseService.supabase.auth.signUp({
      email: usuario.email,
      password: usuario.password!,
      options: {
        data: {
          
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          fechaNacimiento: usuario.fechaNacimiento,
          tipoSangre: usuario.tipoSangre,
          colorOjos: usuario.colorOjos,
          diasVacaciones: usuario.diasVacaciones
        }
      }
    });

    if (error) {
      console.error('Error al registrar:', error);
      throw error; 
    }

    console.log('Usuario registrado:', data.user);
  }

  async loguear(usuario: Iusuario) {
    const { data, error } = await this.supabaseService.supabase.auth.signInWithPassword({
      email: usuario.email,
      password: usuario.password!
    });

    if (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }

    this.usuarioActual.set(data.user);
    console.log('Usuario logueado:', data.user);
  }

  async cerrarSesion() {
    const { error } = await this.supabaseService.supabase.auth.signOut();

    if (error) {
      console.error('Error al cerrar sesión:', error);
      return;
    }

    this.usuarioActual.set(null);
    console.log('Sesión cerrada');
  }
}