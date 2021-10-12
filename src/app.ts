import p5 from 'p5';
import type P5 from 'p5';
import { createBrowserHistory } from 'history';

import { GpContext } from './utils';
import { getCurrentPageInstance } from './router';

const history = createBrowserHistory();
let unlisten = [];

export default (p: P5) => {
  let font: P5.Font;
  let textGp: P5.Graphics;

  let bgImg: P5.Image;
  let warpShader: P5.Shader;
  let logoImg: P5.Image;
  p.preload = () => {
    bgImg = p.loadImage('./assets/bg-nf-chalk.jpg');
    logoImg = p.loadImage('./assets/logo-c.svg');

    font = p.loadFont('./assets/AltmannGrotesk-Regular.otf');
    textGp = p.createGraphics(300, 100)

    warpShader = p.loadShader( './assets/shader.vert', './assets/shader.frag');
  };

  const gpContext: GpContext = {};
  let PageInstance: ReturnType<typeof getCurrentPageInstance>;
  p.setup = async () => {
    p.pixelDensity(3.0);
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.createCamera();

    gpContext['2d'] = p.createGraphics(p.windowWidth, p.windowHeight);
    gpContext['2d'].background(bgImg);

    gpContext['logo'] = p.createGraphics(logoImg.width, logoImg.height);
    gpContext['logo'].background(logoImg);
  
    PageInstance = getCurrentPageInstance(p, gpContext, history);
    unlisten.push(history.listen(() => {
      PageInstance = getCurrentPageInstance(p, gpContext, history);
    }));
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    const _gp2d = p.createGraphics(p.windowWidth, p.windowHeight);
    _gp2d.image(gpContext['2d'], 0, 0, _gp2d.width, _gp2d.height);
    gpContext['2d'] = _gp2d;
  };

  p.draw = () => {
    // Draw 2d
    gpContext['2d'].background(bgImg);
    if(PageInstance.draw2d) PageInstance.draw2d();

    p.imageMode(p.CENTER);
    p.image(gpContext['2d'], 0, 0);
    // @ts-ignore
    p._renderer.GL.clear(p._renderer.GL.DEPTH_BUFFER_BIT);

    // Draw 3d
    p.push();
    const camOffsetX = logoImg.width / 3;
    p.camera(
      p.map(p.mouseX, 0, p.width, camOffsetX, -camOffsetX),
      0,
      (p.height / 2) / p.tan(p.PI/6),
      0, 0, 0, 0, 1, 0,
    );

    // Draw logo
    p.noStroke();
    p.texture(gpContext['logo']);
    p.plane(logoImg.width, logoImg.height);

    // Draw page
    if (PageInstance.draw) PageInstance.draw();
    p.pop();
  };
};
