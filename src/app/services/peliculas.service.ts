import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface PeliculaTmDB {
  id: number;
  title: string;          
  poster_path: string;    
  genre_ids: number[];    
  genres?: string[];      
  vote_average: number;   
  vote_count: number;
  
  totalVentas?: number;   //  ordenar el top 3 de mas vendidas
  resenas?: { 
    usuario: string; 
    comentario: string; 
    estrellas: number 
  }[];
}

export interface RespuestaCartelera {
  results: PeliculaTmDB[];
}

@Injectable({ providedIn: 'root' })
export class PeliculasService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?language=es-AR&page=1';

  obtenerCartelera(): Observable<RespuestaCartelera> {
    return this.http.get<RespuestaCartelera>(this.apiUrl);
  }
}
