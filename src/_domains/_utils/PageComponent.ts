import { isEmpty, set } from 'lodash/fp';

import { Layout, Cursor } from '../../_elements';
import { Page, PageStatic } from '.';

const initState = {};
abstract class PageComponent implements Page {
  p: Page['p'];
  gpContext: Page['gpContext'];
  history: Page['history'];
  state: Page['state'];
  appBar: InstanceType<typeof Layout.AppBar>;
  cursor: InstanceType<typeof Cursor>;
  constructor(...args: ConstructorParameters<PageStatic>) {
    const [p, gpContext, history] = args;
    this.p = p;
    this.gpContext = gpContext;
    this.history = history;
    this.state = initState;

    this.appBar = new Layout.AppBar(...args);
    this.cursor = new Cursor(...args);
  }
  setState(...args: Parameters<Page['setState']>) {
    const [path, value] = args;
    if (path && !!value) {
      if (isEmpty(this.state)) this.state = {};
      this.state = set(path, value, this.state);
    }

    return this.state;
  }
  draw2d() {
    this.cursor.draw();
    this.appBar.draw();
  }
}

export default PageComponent;
