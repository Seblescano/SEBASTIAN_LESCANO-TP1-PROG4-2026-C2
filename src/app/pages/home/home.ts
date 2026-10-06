import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

interface PeliculaCartelera {
  id: number;
  titulo: string;
  imagen: string;
  formatos: string[];
  idiomas: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  private peliculasService = inject(PeliculasService);
  
  
  peliculas = signal<PeliculaCartelera[]>([]);

  ngOnInit() {
    this.peliculasService.obtenerCartelera().subscribe({
      next: (respuesta) => {
        this.peliculas.set(respuesta.results.map((pelicula) => ({
          id: pelicula.id,
          titulo: pelicula.title,
          imagen: pelicula.poster_path
            ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
            : '',
          formatos: [],
          idiomas: [],
        })));
      },
      error: (err) => console.error('Error al cargar la cartelera', err)
    });
  }
}
