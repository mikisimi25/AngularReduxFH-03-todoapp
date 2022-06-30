import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './filtro.actions';

export const initialState: actions.filtrosValidos = 'todos';

export const filtroReducer = createReducer<actions.filtrosValidos,Action>(
  initialState,
  on(actions.setFiltro, (state, {filtro}) => filtro ),
);
