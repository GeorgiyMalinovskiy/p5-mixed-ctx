import { implementsElement, MIN_INTERACTIVE_SIZE } from './_utils';
import ElementComponent from './_utils/ElementComponent';

@implementsElement()
class Cursor extends ElementComponent {
  shape: [number, number][];

  constructor(...args: ConstructorParameters<typeof ElementComponent>) {
    super(...args);
    const [p] = args;

    this.shape = [
      [MIN_INTERACTIVE_SIZE / 2, 0],
      [MIN_INTERACTIVE_SIZE, MIN_INTERACTIVE_SIZE],
      [0, MIN_INTERACTIVE_SIZE],
    ];
  }

  draw() {
    const { p, gpContext: { gp2d } } = this;

    gp2d.fill(255);
    gp2d.push();
    gp2d.translate(p.mouseX, p.mouseY);
    gp2d.beginShape();
    this.shape.forEach((coords) => {
      gp2d.vertex(...coords);
    });
    gp2d.endShape(gp2d.CLOSE);
    gp2d.pop();
  }
}

export default Cursor;
