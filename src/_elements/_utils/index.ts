import type P5 from 'p5';
import { BrowserHistory } from 'history';
import { GpContext } from '../../utils';

export type State = Record<string, unknown>;
export interface Element {
  p: P5;
  gpContext: GpContext;
  history: BrowserHistory;
  state?: State;
  draw?(...args: unknown[]): void;
  setState?(path: string, value: unknown): State;
}

export interface ElementStatic {
  new(
    p: P5,
    gpContext: GpContext,
    history: BrowserHistory,
  ): Element;
}

export type ElementInstance = InstanceType<Element & ElementStatic>;

export function implementsElement() {
  return <U extends ElementStatic>(constructor: U) => constructor;
}
