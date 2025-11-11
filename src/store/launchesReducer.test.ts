import { describe, it, expect } from 'vitest';
import { launchesReducer, initialState, LaunchesAction } from './launchesReducer';
import { Launch } from '../types/launch';

describe('launchesReducer', () => {
  const mockLaunch: Launch = {
    mission_name: 'Test Mission',
    launch_year: '2020',
    details: 'Test details',
    links: {
      mission_patch_small: 'https://example.com/small.png',
      mission_patch: 'https://example.com/large.png',
    },
    rocket: {
      rocket_name: 'Falcon 9',
    },
  };

  it('should handle FETCH_START', () => {
    const action: LaunchesAction = { type: 'FETCH_START' };
    const newState = launchesReducer(initialState, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('should handle FETCH_SUCCESS', () => {
    const launches = [mockLaunch];
    const action: LaunchesAction = { type: 'FETCH_SUCCESS', payload: launches };
    const newState = launchesReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.launches).toEqual(launches);
  });

  it('should handle FETCH_ERROR', () => {
    const errorMessage = 'Failed to fetch';
    const action: LaunchesAction = { type: 'FETCH_ERROR', payload: errorMessage };
    const newState = launchesReducer(initialState, action);

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(errorMessage);
  });

  it('should handle SELECT_LAUNCH', () => {
    const action: LaunchesAction = { type: 'SELECT_LAUNCH', payload: mockLaunch };
    const newState = launchesReducer(initialState, action);

    expect(newState.selectedLaunch).toEqual(mockLaunch);
  });

  it('should handle CLOSE_MODAL', () => {
    const stateWithSelected = {
      ...initialState,
      selectedLaunch: mockLaunch,
    };
    const action: LaunchesAction = { type: 'CLOSE_MODAL' };
    const newState = launchesReducer(stateWithSelected, action);

    expect(newState.selectedLaunch).toBe(null);
  });
});
