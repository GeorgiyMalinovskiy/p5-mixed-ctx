import type P5 from 'p5';
import { PageComponent, implementsPage } from '../_utils';
import WorkEntry from './WorkEntry';

@implementsPage()
class Work extends PageComponent {
  public static label = 'Work';
  public static path = '/work/:entry?';
  public static drawButton(this: P5.Graphics) {
    this.noStroke();
    this.fill(255);
    this.rect(0, 0, this.width, this.height);
    return this;
  }
  constructor(...args: ConstructorParameters<typeof PageComponent>) {
    super(...args);
  }
  draw() {
    // @ts-ignore
    if (super.draw) super.draw();
    console.log('draw ', Work.label);
  }
}

export default Work;
