import type P5 from 'p5';

import { PageComponent, implementsPage } from './_utils';

@implementsPage()
class Contact extends PageComponent {
  public static label = 'Contact';
  public static path = '/contact';
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
    console.log('draw ', Contact.label);
  }
}

export default Contact;
