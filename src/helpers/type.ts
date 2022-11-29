import { INavigation, IRoute } from '@/helpers';

export interface IScreenProps<TParams = Record<string, any>> {
  navigation: INavigation;
  route: IRoute<TParams>;
}

export interface IDimension {
  x?: number;
  y?: number;
  height?: number;
  width?: number;
}
