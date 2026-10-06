import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { ReservasService } from '../../services/reservas';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private reservasService = inject(ReservasService);

  asientos: string[] = [];
  precioUnitario = 5000;
  subtotal = 0;
  descuento = 0;
  total = 0;
  tieneDescuento = false;

  ngOnInit() {
    const estado = history.state;
    if (estado && estado.asientosSeleccionados) {
      this.asientos = estado.asientosSeleccionados;
      this.calcularTicket();
    } else {
      this.router.navigate(['/butacas']);
    }
  }

  calcularTicket() {
    this.subtotal = this.asientos.length * this.precioUnitario;

    const usuarioLogueado = this.authService.usuarioActual(); 
    this.tieneDescuento = usuarioLogueado !== null;

    if (this.tieneDescuento) {
      this.descuento = this.subtotal * 0.20; 
    } else {
      this.descuento = 0; 
    }

    this.total = this.subtotal - this.descuento;
  }

  async finalizarCompra() {
    try {
      await this.reservasService.guardarReserva(this.asientos, this.total);
      alert('¡Compra confirmada! Entradas emitidas.');
      this.router.navigate(['/']);
    } catch (error) {
      alert('Hubo un error al procesar tu compra. Intentá de nuevo.');
    }
  }
}