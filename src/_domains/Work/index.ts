import { Page, PageComponent, implementsPage } from '../_utils';
import WorkEntry from './WorkEntry';

@implementsPage()
class Work extends PageComponent {
  public static label = 'Work';
  public static path = '/work/:entry?';
  public static drawButton({ ['2d']: gp }: Page['gpContext']) {
    gp.stroke(255);
    gp.strokeWeight(2);
    gp.line(10, 10, 10, 10);
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
