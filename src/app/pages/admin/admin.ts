import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

interface Funcion {
  titulo: string;
  horaInicio: string;
  horaFin: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent {
  funciones = signal<Funcion[]>([
    { titulo: 'Matrix (Ejemplo)', horaInicio: '14:00', horaFin: '16:30' }
  ]);

  errorHorario = signal<string | null>(null);

  formulario = new FormGroup({
    titulo: new FormControl('', Validators.required),
    horaInicio: new FormControl('', Validators.required),
    horaFin: new FormControl('', Validators.required),
  });

  convertirAMinutos(hora: string): number {
    const [h, m] = hora.split(':').map(Number);
    return (h * 60) + m;
  }

  guardarFuncion() {
    if (this.formulario.invalid) return;

    const nuevaFuncion = this.formulario.value as Funcion;
    const inicioNuevo = this.convertirAMinutos(nuevaFuncion.horaInicio);
    const finNuevo = this.convertirAMinutos(nuevaFuncion.horaFin);

    if (finNuevo <= inicioNuevo) {
      this.errorHorario.set('La hora de fin debe ser posterior a la de inicio.');
      return;
    }

    let superposicion = false;
    for (const func of this.funciones()) {
      const inicioExistente = this.convertirAMinutos(func.horaInicio);
      const finExistente = this.convertirAMinutos(func.horaFin);

      if (inicioNuevo < (finExistente + 30) && finNuevo > (inicioExistente - 30)) {
        superposicion = true;
        break;
      }
    }

    if (superposicion) {
      this.errorHorario.set('Error: Debe haber al menos 30 minutos libres entre la finalización de una película y el inicio de la siguiente.');
      return;
    }

    this.errorHorario.set(null);
    this.funciones.update(f => [...f, nuevaFuncion]);
    this.formulario.reset();
    alert('¡Función programada exitosamente!');
  }
}