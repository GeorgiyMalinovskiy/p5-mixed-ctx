import { ElementComponent, implementsElement } from '../../_utils';

import Breadcrumbs from './Breadcrumbs';
import Navigation from './Navigation';

@implementsElement()
class AppBar extends ElementComponent {
  static padding = 30;
  static animationOffset = 5000;
  breadcrumbs: InstanceType<typeof Breadcrumbs>;
  navigation: InstanceType<typeof Navigation>;
  constructor(...args: ConstructorParameters<typeof ElementComponent>) {
    super(...args);
    this.breadcrumbs = new Breadcrumbs(...args);
    this.navigation = new Navigation(...args);
  }
  draw() {
    const { p, gpContext: { ['2d']: gp }, breadcrumbs, navigation } = this;
    const elapsed = p.millis();

    gp.stroke(255);
    gp.strokeWeight(2);
    
    const shouldAnimate = elapsed <= AppBar.animationOffset;
    
    const xOffset = gp.width - AppBar.padding;
    const yOffset = gp.height - AppBar.padding;

    let xLength = gp.width - AppBar.padding;
    if (shouldAnimate) {
      xLength = p.map(
        elapsed,
        0,
        AppBar.animationOffset - 1000,
        AppBar.padding,
        xOffset,
        true,
      );
    }

    breadcrumbs.draw(
      AppBar.padding,
      AppBar.animationOffset,
      xLength,
      elapsed,
    );
    navigation.draw(
      AppBar.padding,
      AppBar.animationOffset,
      xLength,
      elapsed,
    );

    // horizontal
    gp.line(AppBar.padding, AppBar.padding, xLength, AppBar.padding);
    gp.line(
      xOffset,
      yOffset,
      gp.width - xLength,
      yOffset,
    );
    
    // vertical
    let yLength = gp.height - AppBar.padding;
    if (shouldAnimate) {
      yLength = p.map(
        elapsed,
        0,
        AppBar.animationOffset - 1000,
        AppBar.padding,
        yOffset,
        true,
      );
    }
    gp.line(AppBar.padding, AppBar.padding, AppBar.padding, yLength);
    gp.line(xOffset, yOffset, xOffset, gp.height - yLength);
  }
}

export default AppBar;
