import { PageComponent, implementsPage } from '../_utils';
import WorkEntry from './WorkEntry';

@implementsPage()
class Work extends PageComponent {
  public static label = 'Work';
  public static path = '/work/:entry?';
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
