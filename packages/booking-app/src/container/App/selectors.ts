import { ReducerStateMap } from '@app/types';

// App status
export const isLoadingSelector = (state: ReducerStateMap): boolean => {
  return state.reducerApp.get('isLoading');
};
export const isMaintainingSelector = (state: ReducerStateMap): boolean => {
  return state.reducerApp.get('isMaintaining');
};
export const tokenSelector = (state: ReducerStateMap): string => {
  return state.reducerApp.get('token');
};
export const isCheckedLoginSelector = (state: ReducerStateMap): boolean => {
  return state.reducerApp.get('isCheckedLogin');
};

export const userProfileSelector = (state: ReducerStateMap) => {
  return state.reducerApp.get('userProfile');
};
