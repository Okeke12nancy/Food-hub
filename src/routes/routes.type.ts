import { z } from 'zod';

const routeAccessTypes = z.enum(['authenticated', 'public']);

export interface baseRouteInterface<T> {
  element: JSX.Element;
  route: T;
  stepLabel?: string;
}

export interface routeInterface<T = unknown>
  extends baseRouteInterface<routeTypes> {
  type: z.infer<typeof routeAccessTypes>;
  subRoutes?: baseRouteInterface<T>[];
}

export const routeTypeEnums = z.enum([
  '',
  '/user',
  '/cart',
  '/checkout',
  '/search',
  '/vendor',
]);

export type routeTypes = z.infer<typeof routeTypeEnums>;
