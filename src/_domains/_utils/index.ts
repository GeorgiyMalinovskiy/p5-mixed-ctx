import type P5 from 'p5';
import { BrowserHistory } from 'history';

import { GpContext } from '../../utils';

export type State = Record<string, unknown>;

export interface Page {
  p: P5;
  gpContext: GpContext;
  history: BrowserHistory;
  state: Record<string, unknown>;
  draw?(): void;
  draw2d?(): void;
  setState?(path: string, value: unknown): State;
}

export interface PageStatic {
  new(p: P5, gpContext: GpContext, history: BrowserHistory): Page;
  drawButton?(): P5.Graphics;
  label: string;
  path: string;
}

export type PageInstance = InstanceType<Page & PageStatic>;

export function implementsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  return <U extends PageStatic>(constructor: U) => { constructor; };
}
