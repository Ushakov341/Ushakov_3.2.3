import { Launch } from '../types/launch';

export interface LaunchesState {
  launches: Launch[];
  selectedLaunch: Launch | null;
  loading: boolean;
  error: string | null;
}

export type LaunchesAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Launch[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SELECT_LAUNCH'; payload: Launch }
  | { type: 'CLOSE_MODAL' };

export const initialState: LaunchesState = {
  launches: [],
  selectedLaunch: null,
  loading: false,
  error: null,
};

export function launchesReducer(
  state: LaunchesState,
  action: LaunchesAction
): LaunchesState {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        launches: action.payload,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SELECT_LAUNCH':
      return {
        ...state,
        selectedLaunch: action.payload,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        selectedLaunch: null,
      };
    default:
      return state;
  }
}
