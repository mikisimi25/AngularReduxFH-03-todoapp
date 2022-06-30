import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from './../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styles: [
  ]
})
export class TodoAddComponent implements OnInit {
  public txtInput: FormControl;

  constructor(
    private store: Store<AppState>
  ) {
    this.txtInput = new FormControl('Hola', Validators.required);
  }

  ngOnInit(): void {
  }

  public agregar() {

    if( this.txtInput.invalid ) { return; }

    this.store.dispatch( actions.crear( { texto: this.txtInput.value } ))

    this.txtInput.reset();
  }

}
