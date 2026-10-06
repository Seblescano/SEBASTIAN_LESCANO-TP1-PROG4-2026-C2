import { Injectable } from '@angular/core';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Supabase {

  public supabase: SupabaseClient;

  constructor() {

    this.supabase = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_CLAVE_PUBLICA
    );

    this.supabase.auth.getUser().then((user) => {

      if (user.data.user) {
        console.log('Usuario autenticado:', user.data.user);
      } else {
        console.log('No hay usuario autenticado');
      }

    }).catch((error) => {
      console.error('Error al obtener el usuario:', error);
    });
  }
}