import matchPath from './matchPatch';

import * as domains from '../_domains';
import type { PageInstance, PageStatic } from '../_domains/_utils';

interface RouteObj {
  label: string;
  path: string;
}

type Routes = Record<string, RouteObj>;

export const ROUTES: Routes = Object.values(domains)
  .reduce<Routes>((acc, { path, label }) => ({
    ...acc,
    [path]: { path, label } as RouteObj,
  }), {});

const pageInstancePool: Record<string, PageInstance> = {};
export const getCurrentPageInstance = (
  ...args: ConstructorParameters<PageStatic>
): PageInstance => {
  const [, , history] = args;
  const { location: { pathname } } = history;
  let { path } = ROUTES['/'];

  if (ROUTES?.[pathname]) {
    path = ROUTES[pathname].path;
  } else {
    const route = Object.values(ROUTES).find(({ path: routePath }) => matchPath(
      pathname,
      { path: routePath, exact: true },
    ));

    if (route) {
      path = route.path;
    }
  }

  let pageInstance: PageInstance = pageInstancePool?.[path];
  if (!pageInstance) {
    const Component = Object.values(domains)
      .find(({ path: componentPath }) => componentPath === path);
    pageInstance = new Component(...args);
    pageInstancePool[Component.path] = pageInstance;
  }

  return pageInstance;
};
