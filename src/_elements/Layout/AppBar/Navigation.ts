import * as domains from '../../../_domains';
import { PageStatic } from '../../../_domains/_utils';
import generatePath from '../../../router/generatePath';

import { implementsElement } from '../../_utils';
import ElementComponent from '../../_utils/ElementComponent';

import { PADDING, ANIMATION_OFFSET } from './constants';

@implementsElement()
class Navigation extends ElementComponent {
  static elementSize = 20;

  elements: PageStatic[];

  constructor(...args: ConstructorParameters<typeof ElementComponent>) {
    super(...args);

    const [p] = args;
    const { elementSize } = Navigation;
    this.elements = Object.values(domains).reduce((acc, Component, i, arr) => {
      const gp = p.createGraphics(elementSize, elementSize);
      gp.show();
      gp.style(`
      position: absolute;
      bottom: ${PADDING + ((PADDING - elementSize) / 2)}px;
      left: ${(100 / (arr.length + 1)) * (i + 1)}%;
      margin-left: -${elementSize / 2}px;
      `);

      const pathname = generatePath(Component.path);
      gp.mouseClicked(() => { this.getNavFxn(pathname); });

      Component.drawButton = Component.drawButton.bind(gp);
      acc.push(Component);

      return acc;
    }, []);
  }

  getNavFxn(pathname: string) {
    this.history.push(pathname);
  }

  draw(xLength: number) {
    const { p, gpContext: { gp2d }, elements } = this;
    const elapsed = p.millis();

    // horizontal frame
    let yOffset = gp2d.height - PADDING * 2;
    if (elapsed > ANIMATION_OFFSET - 1000) {
      yOffset = gp2d.height - p.map(
        ANIMATION_OFFSET - elapsed,
        0,
        1000,
        PADDING * 2,
        PADDING,
        true,
      );
      gp2d.line(PADDING, yOffset, xLength, yOffset);
    }

    // buttons
    if (elapsed > ANIMATION_OFFSET - 1000) {
      elements.forEach((Component) => {
        Component.drawButton();
      });
    }
  }
}

export default Navigation;
