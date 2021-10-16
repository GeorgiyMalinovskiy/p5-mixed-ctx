import type P5 from 'p5';
import { createBrowserHistory } from 'history';

import { GpContext } from './utils';
import { getCurrentPageInstance } from './router';
import { Cursor, Layout } from './_elements';
import { Element } from './_elements/_utils';

const history = createBrowserHistory();
const unlisten = [];

export default (p: P5) => {
  // let font: P5.Font;
  // let textGp: P5.Graphics;

  let bgImg: P5.Image;
  // let logoImg: P5.Image;
  p.preload = () => {
    bgImg = p.loadImage('./assets/bg-nf-chalk.jpg');
    // logoImg = p.loadImage('./assets/logo-c.svg');

    // font = p.loadFont('./assets/AltmannGrotesk-Regular.otf');
    // textGp = p.createGraphics(300, 100)
  };

  const gpContext: GpContext = {};
  let cursor: Element;
  let appBar: Element;
  let PageInstance: ReturnType<typeof getCurrentPageInstance>;
  p.setup = async () => {
    p.pixelDensity(3.0);

    // init 2d context
    gpContext.gp2d = p.createGraphics(p.windowWidth, p.windowHeight);
    // gpContext.gpTest = p.createGraphics(logoImg.width, logoImg.height);

    PageInstance = getCurrentPageInstance(p, gpContext, history);
    unlisten.push(history.listen(() => {
      PageInstance = getCurrentPageInstance(p, gpContext, history);
    }));

    // init 3d context
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    canvas.id('ctx3d');

    // const { gp2d } = gpContext;
    // gp2d.id('ctx2d');
    // gp2d.clear();

    // gp2d.show();

    // gpTest.id('ctxTest');
    // gpTest.background(logoImg);

    // p.createCamera();

    const args = [p, gpContext, history] as const;
    cursor = new Cursor(...args);
    appBar = new Layout.AppBar(...args);

    // warn
    Object.keys(gpContext).forEach((key) => {
      if (/(test|temp)/.test(key.toLowerCase())) console.warn(`Don't forget to remove "${key}" context.`);
    });
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    gpContext.gp2d.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    // Draw 2d
    const { gp2d } = gpContext;

    gp2d.background(bgImg);

    cursor.draw();
    appBar.draw();

    if (PageInstance.draw2d) PageInstance.draw2d();

    p.imageMode(p.CENTER);
    p.image(gp2d, 0, 0);

    // @ts-ignore
    p._renderer.GL.clear(p._renderer.GL.DEPTH_BUFFER_BIT);

    // Draw 3d
    // p.push();
    // const camOffsetX = logoImg.width / 3;
    // p.camera(
    //   p.map(p.mouseX, 0, p.width, camOffsetX, -camOffsetX),
    //   0,
    //   (p.height / 2) / p.tan(p.PI/6),
    //   0, 0, 0, 0, 1, 0,
    // );

    // // Draw logo
    // p.noStroke();
    // p.texture(gpTest);
    // p.plane(logoImg.width, logoImg.height);

    // // Draw page
    // if (PageInstance.draw) PageInstance.draw();
    // p.pop();
  };
};
