import { ElementComponent, implementsElement } from '../../_utils';

import { PADDING, ANIMATION_OFFSET } from './constants';
import Breadcrumbs from './Breadcrumbs';
import Navigation from './Navigation';

@implementsElement()
class AppBar extends ElementComponent {
  breadcrumbs: InstanceType<typeof Breadcrumbs>;
  navigation: InstanceType<typeof Navigation>;
  constructor(...args: ConstructorParameters<typeof ElementComponent>) {
    super(...args);
    this.breadcrumbs = new Breadcrumbs(...args);
    this.navigation = new Navigation(...args);
  }
  draw() {
    const { p, gpContext: { gp2d }, breadcrumbs, navigation } = this;
    const elapsed = p.millis();

    gp2d.stroke(255);
    gp2d.strokeWeight(2);
    
    const shouldAnimate = elapsed <= ANIMATION_OFFSET;
    
    const xOffset = gp2d.width - PADDING;
    const yOffset = gp2d.height - PADDING;

    let xLength = gp2d.width - PADDING;
    if (shouldAnimate) {
      xLength = p.map(
        elapsed,
        0,
        ANIMATION_OFFSET - 1000,
        PADDING,
        xOffset,
        true,
      );
    }

    breadcrumbs.draw(xLength);
    navigation.draw(xLength);

    // horizontal
    gp2d.line(PADDING, PADDING, xLength, PADDING);
    gp2d.line(
      xOffset,
      yOffset,
      gp2d.width - xLength,
      yOffset,
    );

    // vertical
    let yLength = gp2d.height - PADDING;
    if (shouldAnimate) {
      yLength = p.map(
        elapsed,
        0,
        ANIMATION_OFFSET - 1000,
        PADDING,
        yOffset,
        true,
      );
    }
    gp2d.line(PADDING, PADDING, PADDING, yLength);
    gp2d.line(xOffset, yOffset, xOffset, gp2d.height - yLength);
  }
}

export default AppBar;
