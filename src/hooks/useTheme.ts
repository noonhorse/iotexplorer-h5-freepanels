import { useReducer } from 'react';
import { ThemeType } from '@/global';
import { getThemeType } from '../business';

export interface ThemeState {
  theme: ThemeType;
}

function reducer(
  state: ThemeState,
  action: {
    type: string;
    payload: any;
  },
) {
  const { type, payload } = action;

  switch (type) {
    case 'switch':
      return { ...state, theme: payload.theme };
    default:
      return state;
  }
}

function initialState() {
  // 默认主题类型
  const defaultTheme: ThemeType = getThemeType();

  return {
    theme: defaultTheme,
  };
}

export function useTheme() {
  const [state, dispatch] = useReducer(reducer, {}, initialState);

  const onSwitchTheme = (type: ThemeType) => {
    dispatch({ type: 'switch', payload: { theme: type } });
  };

  return [state, onSwitchTheme];
}
