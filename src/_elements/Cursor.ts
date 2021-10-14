import { ElementComponent, implementsElement } from './_utils';

@implementsElement()
class Cursor extends ElementComponent {
  size: number;
  constructor(...args: ConstructorParameters<typeof ElementComponent>) {
    super(...args);
    this.size = 10;
  }
  draw() {
    const { p, gpContext: { gp2d }, size } = this;
    
    gp2d.fill(255);
    gp2d.beginShape();
    gp2d.vertex(p.mouseX, p.mouseY - size / 2);
    gp2d.vertex(p.mouseX + size, p.mouseY + size);
    gp2d.vertex(p.mouseX - size, p.mouseY + size);
    gp2d.endShape(gp2d.CLOSE);
  }
}

export default Cursor;
