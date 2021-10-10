import type P5 from 'p5';

import * as domains from '../../../_domains';
import generatePath from '../../../router/generatePath';

import { ElementComponent, implementsElement } from '../../_utils';

@implementsElement()
class Navigation extends ElementComponent {
  items: P5.Graphics[];
  constructor(...args: ConstructorParameters<typeof ElementComponent>) {
    super(...args);
    const [p] = args;
    this.items = Object.values(domains).reduce((acc, Component) => {
      const gp = p.createGraphics(30, p.width);
      const pathname = generatePath(Component.path);
      gp.mouseClicked(() => {
        console.log.call(null, pathname);
      });
      acc.push(gp);
      return acc;
    }, []);
  }
  getNavFxn(pathname: string) {
    return (event: MouseEvent) => {
      if (event) event.preventDefault();
      this.history.push(pathname);
    };
  }
  draw(...args: number[]) {
    const [padding, animationOffset, elapsed, ] = args;
    const { gpContext: gp } = this;
    Object.values(domains).forEach((Component, i) => {
      // const pathname = generatePath(Component.path);
      if ('drawButton' in Component) Component.drawButton(gp);
    });
  }
}

export default Navigation;
