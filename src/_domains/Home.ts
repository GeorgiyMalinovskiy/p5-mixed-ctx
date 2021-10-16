import type P5 from 'p5';
import { implementsPage } from './_utils';
import PageComponent from './_utils/PageComponent';

@implementsPage()
class Home extends PageComponent {
  public static label = 'Home';

  public static path = '/';

  public static drawButton(this: P5.Graphics) {
    this.noStroke();
    this.fill(255);
    this.rect(0, 0, this.width, this.height);
    return this;
  }

  draw() {
    // @ts-ignore
    if (super.draw) super.draw();
  }
}

export default Home;
