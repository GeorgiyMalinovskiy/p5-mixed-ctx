/* eslint-disable no-unused-expressions, new-cap */

const init = async () => {
  // TODO refactor styles
  document.body.style.padding = '0';
  document.body.style.margin = '0';
  document.body.style.overflow = 'hidden';
  document.body.style.backgroundColor = '#000';
  document.body.style.cursor = 'none';

  const loading = document.createElement('span');
  loading.style.backgroundColor = document.body.style.backgroundColor;
  loading.setAttribute('id', 'p5_loading');

  document.body.appendChild(loading);

  const { default: p5 } = await import('p5');
  const { default: app } = await import('./app');

  new p5(app, document.body);
};

window.addEventListener('load', init);
