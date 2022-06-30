import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actionsFiltro from '../../filtro/filtro.actions';
import * as actionsTodo from './../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: [
  ]
})
export class TodoFooterComponent implements OnInit {

  public filtroActual: actionsFiltro.filtrosValidos = 'todos';
  public filtros: actionsFiltro.filtrosValidos[] = ['todos','completados','pendientes']

  public pendientes: number = 0;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    // this.store.select('filtro').subscribe( filtro => this.filtroActual = filtro )
    this.store.subscribe( state => {

      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter( todo => !todo.completado).length;

    })
  }

  public cambiarFiltro( filtro: actionsFiltro.filtrosValidos ) {
    this.store.dispatch( actionsFiltro.setFiltro( { filtro } ) )
  }

  public borrarCompletados() {
    this.store.dispatch( actionsTodo.borrarCompletados() )
  }

}
