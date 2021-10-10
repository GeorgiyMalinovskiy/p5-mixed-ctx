import { PageComponent, implementsPage } from './_utils';

@implementsPage()
class Contact extends PageComponent {
  public static label = 'Contact';
  public static path = '/contact';
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
