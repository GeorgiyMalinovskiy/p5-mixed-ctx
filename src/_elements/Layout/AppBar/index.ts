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
    const { p, breadcrumbs, navigation } = this;
    const elapsed = p.millis();

    breadcrumbs.draw(
      AppBar.padding,
      AppBar.animationOffset,
      elapsed
    );
    navigation.draw(
      AppBar.padding,
      AppBar.animationOffset,
      elapsed,
    );
  }
}

export default AppBar;
