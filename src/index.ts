const init = async () => {
  // TODO refactor styles
  document.body.style.padding = '0',
  document.body.style.margin = '0';
  document.body.style.overflow = 'hidden';
  document.body.style.backgroundColor = '#000';
  document.body.style.cursor = 'none';

  const main = document.createElement('main');
  document.body.appendChild(main);

  const canvas = document.createElement('div');
  const loading = document.createElement('span');
  loading.style.backgroundColor = document.body.style.backgroundColor;
  loading.setAttribute('id', 'p5_loading');

  main.appendChild(canvas);
  main.appendChild(loading);

  const { default: p5 } = await import('p5');
  const { default: app } = await import('./app');

  new p5(app, canvas);
};

window.addEventListener('load', init);
