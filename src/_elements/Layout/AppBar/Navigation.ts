import type P5 from 'p5';

import * as domains from '../../../_domains';
import { PageStatic } from '../../../_domains/_utils';
import generatePath from '../../../router/generatePath';

import { ElementComponent, implementsElement } from '../../_utils';
import { getOr } from 'lodash/fp';

@implementsElement()
class Navigation extends ElementComponent {
  static elementSize = 20;
  elements: PageStatic[];
  constructor(...args: ConstructorParameters<typeof ElementComponent>) {
    super(...args);
    const [p] = args;
    const { elementSize } = Navigation;
    this.elements = Object.values(domains).reduce((acc, Component) => {
      const gp = p.createGraphics(elementSize, elementSize);
      // gp.id(`canvasButton${Component.label}`);
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
  draw(...args: number[]) {
    const [
      padding,
      animationOffset,
      xLength,
      elapsed,
    ] = args;
    const { p, gpContext, elements } = this;
    const { ['2d']: gp } = gpContext;

    // horizontal frame
    let yOffset =  gp.height - padding * 2;
    if (elapsed > animationOffset - 1000) {
      yOffset = gp.height - p.map(animationOffset - elapsed, 0, 1000, padding * 2, padding, true);
      gp.line(padding, yOffset, xLength, yOffset);
    }
  
    // buttons
    if (elapsed > animationOffset - 1000) {
      gp.push();
      gp.translate(
        0,
        gp.height - (padding * 2) + ((padding - Navigation.elementSize) / 2),
      );
      const xOffset = xLength / (elements.length + 1);
      elements.forEach((Component) => {
        gp.translate(xOffset, 0);
        const btnGp = Component.drawButton();
        gp.image(btnGp, 0, 0);
      });
      gp.pop();
    }
  }
}

export default Navigation;
