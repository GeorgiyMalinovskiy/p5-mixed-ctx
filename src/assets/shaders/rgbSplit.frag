precision highp float;

uniform float slider;

uniform vec2 mouse;

uniform sampler2D tex;
uniform sampler2D flowerTex;

uniform vec2 resolution;

varying vec2 vTexCoord;

void main() {
  
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  
  vec2 texel = 1.0 / resolution;
  
  vec2 offset = texel * 10.0;
  
  vec2 uv2 = uv * 2.0 - 1.0;
  uv2 *= 0.5;
  uv2 = uv2 * 0.5 + 0.5;
  
  
  vec4 colorR = texture2D(tex, uv - offset);
  vec4 colorG = texture2D(tex, uv2);
  vec4 colorB = texture2D(tex, uv + offset);
  
  vec4 color = vec4(colorR.r, colorG.g, colorB.b, 1.0);
 
  gl_FragColor = color;
  gl_FragColor.a = 1.0;
} 
