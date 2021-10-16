import { isEmpty, set } from 'lodash/fp';

import { Element, ElementStatic } from '.';

abstract class ElementComponent implements Element {
  p: Element['p'];

  gpContext: Element['gpContext'];

  history: Element['history'];

  state: Element['state'];

  constructor(...args: ConstructorParameters<ElementStatic>) {
    const [p, gpContext, history] = args;
    this.p = p;
    this.gpContext = gpContext;
    this.history = history;
  }

  setState(...args: Parameters<Element['setState']>) {
    const [path, value] = args;
    if (path && !!value) {
      if (isEmpty(this.state)) this.state = {};
      this.state = set(path, value, this.state);
    }

    return this.state;
  }
}

export default ElementComponent;
