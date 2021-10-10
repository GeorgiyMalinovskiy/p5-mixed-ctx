import matchPath from '../router/matchPatch';

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
export const getCurrentPageInstance = (...args: ConstructorParameters<PageStatic>): PageInstance => {
  const [p, gpContext, history] = args;
  const { location: { pathname } } = history;
  let { label, path } = ROUTES['/'];

  if (ROUTES?.[pathname]) {
    label = ROUTES[pathname].label;
    path = ROUTES[pathname].path;
  }
  else {
    const route = Object.values(ROUTES).find(({ path }) => matchPath(
      pathname,
      { path, exact: true },
    ));

    if (!!route) {
      label = route.label;
      path = route.path;
    }
  }

  let PageInstance: PageInstance = pageInstancePool?.[path];
  if (!PageInstance) {
    const Component = Object.values(domains).find(({ path: componentPath }) => componentPath === path);
    PageInstance = new Component(...args);
    pageInstancePool[Component.path] = PageInstance;
  }

  return PageInstance;
};
