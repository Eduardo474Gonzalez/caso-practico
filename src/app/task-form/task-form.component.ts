import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit{

  nuevoDato: Task = {
    id: 0,
    titulo: '',
    descripcion: '',
    prioridad: '',
    fecha:''
  };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getDatoParaEditar().subscribe((dato: Task | null) => {
      if (dato) {
        this.nuevoDato = dato;
      }
    });
  }

  agregarOActualizarDato(taskForm: NgForm) {
    if (taskForm.valid) {
      if (this.nuevoDato.id === 0) {
        this.taskService.agregarDato(this.nuevoDato);
      } else {
        this.taskService.actualizarDato(this.nuevoDato);
      }
      this.limpiarFormulario(taskForm);
    }
  }

  limpiarFormulario(taskForm: NgForm) {
    this.nuevoDato = {
    id: 0,
    titulo: '',
    descripcion: '',
    prioridad: '',
    fecha:''
    };
    taskForm.resetForm();
    this.taskService.limpiarDatoParaEditar();
  }

}

