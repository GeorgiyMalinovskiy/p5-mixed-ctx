import { isEmpty, set } from 'lodash/fp';

import { Page, PageStatic } from '.';

const initState = {};
abstract class PageComponent implements Page {
  p: Page['p'];

  gpContext: Page['gpContext'];

  history: Page['history'];

  state: Page['state'];

  constructor(...args: ConstructorParameters<PageStatic>) {
    const [p, gpContext, history] = args;
    this.p = p;
    this.gpContext = gpContext;
    this.history = history;
    this.state = initState;
  }

  setState(...args: Parameters<Page['setState']>) {
    const [path, value] = args;
    if (path && !!value) {
      if (isEmpty(this.state)) this.state = {};
      this.state = set(path, value, this.state);
    }

    return this.state;
  }

  // draw2d() {}
}

export default PageComponent;
