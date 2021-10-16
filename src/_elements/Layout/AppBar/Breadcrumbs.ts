import type P5 from 'p5';

import { implementsElement } from '../../_utils';
import ElementComponent from '../../_utils/ElementComponent';
import { PADDING, ANIMATION_OFFSET } from './constants';

@implementsElement()
class Breadcrumbs extends ElementComponent {
  static textHeight = 20;

  textSVG?: P5.Image;

  constructor(...args: ConstructorParameters<typeof ElementComponent>) {
    super(...args);
    const [, { gp2d }] = args;

    gp2d.loadImage(
      '../assets/title.svg',
      (image) => { this.textSVG = image; },
    );
  }

  draw(xLength: number) {
    const { p, gpContext: { gp2d }, textSVG } = this;
    const elapsed = p.millis();

    if (!!textSVG || (Array.isArray(textSVG) && textSVG.length)) {
      let syOffset;
      switch (true) {
        case elapsed > ANIMATION_OFFSET - 1000:
          syOffset = p.map(ANIMATION_OFFSET - elapsed, 1000, 0, PADDING, 0, true);
          break;
        case elapsed > ANIMATION_OFFSET:
          syOffset = 0;
          break;
        default: syOffset = PADDING;
      }

      let yOffset = PADDING * 2;
      if (elapsed > ANIMATION_OFFSET - 1000) {
        yOffset = p.map(ANIMATION_OFFSET - elapsed, 0, 1000, PADDING * 2, PADDING, true);
        gp2d.line(PADDING, yOffset, xLength, yOffset);
      }

      gp2d.push();
      gp2d.imageMode(gp2d.CENTER);
      gp2d.image(
        textSVG,
        gp2d.width / 2,
        PADDING + PADDING / 2,
        Breadcrumbs.textHeight / (textSVG.height / textSVG.width),
        Breadcrumbs.textHeight,
        0,
        syOffset,
      );
      gp2d.pop();
    }
  }
}

export default Breadcrumbs;
