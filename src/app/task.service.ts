import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private datoParaEditar: BehaviorSubject<Task | null> = new BehaviorSubject<Task | null>(null);
  constructor() {
    this.cargarDatosIniciales(),
    this.cargarDatosGuardados();
  }

  cargarDatosIniciales() {
    this.tasks = [
    {id: 1, titulo: 'barrer', descripcion: 'Descripción 1', prioridad: 'Alta', fecha: '13/07/2023' },
    {id: 2, titulo: 'Tarea 2', descripcion: 'Descripción 2', prioridad: 'Media', fecha: '13/08/2023' },
    {id: 3, titulo: 'Tarea 3', descripcion: 'Descripción 3', prioridad: 'Baja', fecha: '21/07/2023' },
    ];
    }
    cargarDatosGuardados() {
      const datosGuardados = localStorage.getItem('tasks');
      if (datosGuardados) {
      this.tasks = JSON.parse(datosGuardados);
      }
      }

      guardarDatos() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }

        getDatos(): Task[] {
        return this.tasks;
        }

        private generarNuevoId(): number {
          if (this.tasks.length === 0) {
            return 1;
          }


          const ids = this.tasks.map(task => task.id);
          const maxId = Math.max(...ids);
          return maxId + 1;
          }
          agregarDato(nuevoDato: Task) {
          const nuevoId = this.generarNuevoId();
          nuevoDato.id = nuevoId;
          this.tasks.push(nuevoDato);
          this.guardarDatos();
          }

          eliminarDato(id: number) {
            const index = this.tasks.findIndex(task => task.id === id);
            if (index !== -1) {
            this.tasks.splice(index, 1);
            this.guardarDatos();
            }
            }

            actualizarDato(datoActualizado: Task) {
              const index = this.tasks.findIndex(task => task.id === datoActualizado.id);
              if (index !== -1) {
              this.tasks[index] = datoActualizado;
              this.guardarDatos();
              }
              }

              getDatoParaEditar(): Observable<Task | null> {
                return this.datoParaEditar.asObservable();
                }

                setDatoParaEditar(task: Task | null) {
                this.datoParaEditar.next(task);
                }

                limpiarDatoParaEditar() {
                this.datoParaEditar.next(null);
                }

}


