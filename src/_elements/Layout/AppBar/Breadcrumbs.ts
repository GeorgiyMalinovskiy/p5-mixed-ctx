import type P5 from 'p5';

import { ElementComponent, implementsElement } from '../../_utils';

@implementsElement()
class Breadcrumbs extends ElementComponent {
  static textHeight = 20;
  textSVG?: P5.Image;

  constructor(...args: ConstructorParameters<typeof ElementComponent>) {
    super(...args);
    const [p, { '2d': gp }] = args;

    gp.loadImage(
      '../assets/title.svg',
      image => { this.textSVG = image; },
    );
  }
  draw(...args: number[]) {
    const [
      padding,
      animationOffset,
      xLength,
      elapsed,
    ] = args;
    const {
      p,
      gpContext: { '2d': gp },
      textSVG,
    } = this;

    if (!!textSVG || (Array.isArray(textSVG) && textSVG.length)) {
      let syOffset;
      switch (true) {
        case elapsed > animationOffset - 1000:
          syOffset = p.map(animationOffset - elapsed, 1000, 0, padding, 0, true)
          break;
        case elapsed > animationOffset:
          syOffset = 0;
          break;
        default: syOffset = padding;
      }

      let yOffset = padding * 2;
      if (elapsed > animationOffset - 1000) {
        yOffset = p.map(animationOffset - elapsed, 0, 1000, padding * 2, padding, true);
        gp.line(padding, yOffset, xLength, yOffset);
      }


      gp.push();
      gp.imageMode(gp.CENTER);
      gp.image(
        textSVG,
        gp.width / 2,
        padding + padding / 2,
        Breadcrumbs.textHeight / (textSVG.height / textSVG.width),
        Breadcrumbs.textHeight,
        0,
        syOffset,
      );
      gp.pop();
    }
  }
}

export default Breadcrumbs;
