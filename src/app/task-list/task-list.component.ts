import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  tasks: Task[] = [];
  tareaSeleccionada:any

  seleccionarTarea(task:any) {
    this.tareaSeleccionada=task
  }

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.actualizarDatos();
  }

  actualizarDatos() {
    this.tasks = this.taskService.getDatos();
  }

  eliminarDato(id: number) {
    this.taskService.eliminarDato(id);
    this.actualizarDatos();
  }

  editarDato(task: Task) {
    this.taskService.setDatoParaEditar(task);
  }
}
