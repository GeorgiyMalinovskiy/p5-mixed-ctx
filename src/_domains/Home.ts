import { Page, PageComponent, implementsPage } from './_utils';

@implementsPage()
class Home extends PageComponent {
  public static label = 'Home';
  public static path = '/';
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
    console.log('draw ', Home.label);
  }
}

export default Home;
