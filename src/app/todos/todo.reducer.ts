import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/tido.models';
import * as actions from './todo.actions';

export const estadoInicial: Todo[] = [
  new Todo( 'salvar el mundo'),
  new Todo( 'vencer a Thanos'),
  new Todo( 'robar escudo Capitán América'),
];

export const todoReducer = createReducer(
  estadoInicial,

  /**
   * Añadir un nuevo todo, lo hacemos así para no mutuar el state
   * [ ...state, new Todo( texto ) ]
   * 1. [] -> creamos nuevo array
   * 2. ...state -> añadimos al array los todo que ya existen
   * 3. new Todo( texto ) -> añadimos un nuevo todo
   */
  on(actions.crear, (state,{ texto }) => [ ...state, new Todo( texto ) ]),
  on(actions.borrar, (state,{ id }) => state.filter( todo => todo.id !== id)),
  on(actions.borrarCompletados, (state) => state.filter( todo => !todo.completado)),
  on(actions.toggle, (state,{ id }) => {
    return state.map( todo => {
      if( todo.id === id ) {
        //Lo hacemos así para no mutar directamente el objeto todo, así hacemos una copia
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo
      }
    });
  }),
  on(actions.toggleAll, (state,{ completado }) => {
    return state.map( todo => {
      return {
        ...todo,
        completado: completado
      }
    });
  }),
  on(actions.editar, (state,{ id, texto }) => {
    return state.map( todo => {
      if( todo.id === id ) {
        //Lo hacemos así para no mutar directamente el objeto todo, así hacemos una copia
        return {
          ...todo,
          texto: texto
        }
      } else {
        return todo
      }
    });
  })
);
