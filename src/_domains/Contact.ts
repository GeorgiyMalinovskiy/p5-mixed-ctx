import { Page, PageComponent, implementsPage } from './_utils';

@implementsPage()
class Contact extends PageComponent {
  public static label = 'Contact';
  public static path = '/contact';
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
    console.log('draw ', Contact.label);
  }
}

export default Contact;
