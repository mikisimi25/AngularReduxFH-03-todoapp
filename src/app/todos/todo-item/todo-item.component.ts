import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Todo } from '../models/tido.models';
import * as actions from './../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @ViewChild('inputFisico') txtInputFisico!: ElementRef;

  public chkCompletado!: FormControl;
  public txtInput!: FormControl;

  public editando: boolean = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.chkCompletado = new FormControl( this.todo.completado )
    this.txtInput = new FormControl( this.todo.texto, Validators.required )

    this.chkCompletado.valueChanges.subscribe( valor => {
      this.store.dispatch( actions.toggle({ id: this.todo.id }) )
    })

  }

  public editar() {
    this.editando = true;

    this.txtInput.setValue( this.todo.texto )

    setTimeout( () => {
      this.txtInputFisico.nativeElement.select();
    },1 )
  }

  public terminarEdicion() {
    this.editando = false;

    if( this.txtInput.invalid ) { return; }
    if( this.txtInput.value === this.todo.texto ) { return; }

    this.store.dispatch( actions.editar({
      id: this.todo.id,
      texto: this.txtInput.value
    }))
  }

  public borrar() {
    this.store.dispatch( actions.borrar({ id: this.todo.id }));
  }

}
