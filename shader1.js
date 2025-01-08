// GLSL (OpenGL Shading Language) code for a custom shader
// This shader zooms and shifts colors to create a visual effect
const colorDisplacementShaderSrc = `

precision highp float;

uniform sampler2D tex0;
varying vec2 vTexCoord;

vec2 applyZoom(vec2 coord, float amount) {
  vec2 relativeToCenter = coord - 0.5;
  relativeToCenter /= amount; // Zoom in
  return relativeToCenter + 0.5; // Put back into absolute coordinates
}

void main() {
  // Get each color channel using coordinates with different amounts
  // of zooms to displace the colors slightly
  gl_FragColor = vec4(
    texture2D(tex0, vTexCoord).r,
    texture2D(tex0, applyZoom(vTexCoord, 1.35)).g,
    texture2D(tex0, applyZoom(vTexCoord, 1.4)).b,
    texture2D(tex0, vTexCoord).a
  );
}

`;

const colorDisplacement2ShaderSrc = `

precision highp float;

uniform sampler2D tex0;
varying vec2 vTexCoord;

vec2 applyZoom(vec2 coord, float amount) {
  vec2 relativeToCenter = coord - 0.5;
  relativeToCenter /= amount; // Zoom in
  return relativeToCenter + 0.5; // Put back into absolute coordinates
}

void main() {
  // Get each color channel using coordinates with different amounts
  // of zooms to displace the colors slightly
  gl_FragColor = vec4(
    texture2D(tex0, vTexCoord).r,
    texture2D(tex0, applyZoom(vTexCoord, 1.15)).g,
    texture2D(tex0, applyZoom(vTexCoord, 1.2)).b,
    texture2D(tex0, vTexCoord).a
  );
}

`;