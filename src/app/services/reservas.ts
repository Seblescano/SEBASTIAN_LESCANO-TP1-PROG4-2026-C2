import { Injectable, inject } from '@angular/core';
import { Supabase } from './supabase';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private supabaseService = inject(Supabase);

  async guardarReserva(asientos: string[], total: number) {
    const { data, error } = await this.supabaseService.supabase
      .from('reservas')
      .insert([{ asientos: asientos, total: total }]);

    if (error) {
      console.error('Error al guardar la reserva:', error);
      throw error;
    }
    return data;
  }

  async obtenerAsientosOcupados(): Promise<string[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('reservas')
      .select('asientos');

    if (error) {
      console.error('Error al obtener asientos:', error);
      return [];
    }

    let asientosOcupados: string[] = [];
    if (data) {
      data.forEach(reserva => {
        asientosOcupados = [...asientosOcupados, ...reserva.asientos];
      });
    }
    return asientosOcupados;
  }
}