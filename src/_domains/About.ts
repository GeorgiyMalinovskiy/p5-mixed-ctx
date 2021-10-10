import { PageComponent, implementsPage } from './_utils';

@implementsPage()
class About extends PageComponent {
  public static label = 'About';
  public static path = '/about';
  constructor(...args: ConstructorParameters<typeof PageComponent>) {
    super(...args);
  }
  draw() {
    // @ts-ignore
    if (super.draw) super.draw();
    console.log('draw ', About.label);
  }
}

export default About;
