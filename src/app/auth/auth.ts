import { Injectable, inject } from '@angular/core';
import Iusuario from '../interfaces/usuario';
import { Supabase } from '../services/supabase';

@Injectable()
export class Auth {

  supabaseService = inject(Supabase);

}