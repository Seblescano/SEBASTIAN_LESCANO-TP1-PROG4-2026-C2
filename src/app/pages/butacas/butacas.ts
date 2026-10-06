import { Component, signal, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ReservasService } from '../../services/reservas';

@Component({
  selector: 'app-butacas',
  standalone: true,
  templateUrl: './butacas.html',
  styleUrl: './butacas.css'
})
export class ButacasComponent implements OnInit {
  private router = inject(Router);
  private reservasService = inject(ReservasService);
  private cdr = inject(ChangeDetectorRef);

  cargando = signal<boolean>(true);

  filas = Array.from({ length: 20 }, (_, i) => i + 1);
  bloqueIzq = Array.from({ length: 4 }, (_, i) => i + 1);
  bloqueCen = Array.from({ length: 20 }, (_, i) => i + 5);
  bloqueDer = Array.from({ length: 4 }, (_, i) => i + 25);

  asientosSeleccionados = signal<string[]>([]);
  estadoButacas = new Map<string, 'libre' | 'ocupada' | 'seleccionada'>();

  async ngOnInit() {
    const ocupados = await this.reservasService.obtenerAsientosOcupados();
    
    ocupados.forEach(asientoId => {
      this.estadoButacas.set(asientoId, 'ocupada');
    });

    this.cargando.set(false);
    this.cdr.detectChanges();
  }

  getEstado(fila: number, numero: number): string {
    const id = `F${fila}-B${numero}`;
    return this.estadoButacas.get(id) || 'libre';
  }

  seleccionar(fila: number, numero: number) {
    const id = `F${fila}-B${numero}`;
    const estadoActual = this.getEstado(fila, numero);

    if (estadoActual === 'ocupada') return;

    if (estadoActual === 'seleccionada') {
      this.estadoButacas.set(id, 'libre');
      this.asientosSeleccionados.update(asientos => asientos.filter(a => a !== id));
    } else {
      this.estadoButacas.set(id, 'seleccionada');
      this.asientosSeleccionados.update(asientos => [...asientos, id]);
    }
  }

  irAlPago() {
    this.router.navigate(['/checkout'], { 
      state: { asientosSeleccionados: this.asientosSeleccionados() } 
    });
  }
}