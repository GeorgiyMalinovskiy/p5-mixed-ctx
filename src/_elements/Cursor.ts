import { ElementComponent, implementsElement } from './_utils';

@implementsElement()
class Cursor extends ElementComponent {
  size: number;
  constructor(...args: ConstructorParameters<typeof ElementComponent>) {
    super(...args);
    this.size = 10;
  }
  draw() {
    const { p, gpContext, size } = this;
    
    gpContext['2d'].fill(255);
    gpContext['2d'].beginShape();
    gpContext['2d'].vertex(p.mouseX, p.mouseY - size / 2);
    gpContext['2d'].vertex(p.mouseX + size, p.mouseY + size);
    gpContext['2d'].vertex(p.mouseX - size, p.mouseY + size);
    gpContext['2d'].endShape(gpContext['2d'].CLOSE);
  }
}

export default Cursor;
