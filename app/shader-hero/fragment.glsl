uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

varying vec2 vUv;

vec3 palette(float t) {
  vec3 a = vec3(0.55, 0.55, 0.45);
  vec3 b = vec3(0.35, 0.35, 0.25);
  vec3 c = vec3(1.0, 1.0, 0.8);
  vec3 d = vec3(0.2, 0.3, 0.4);

  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 uv =
    (gl_FragCoord.xy - 0.5 * u_resolution.xy)
    / u_resolution.y;

  vec2 mouse =
    (u_mouse - 0.5 * u_resolution.xy)
    / u_resolution.y;

  float dist = length(uv - mouse);

  uv +=
    (mouse - uv)
    * 0.15
    * smoothstep(1.0, 0.0, dist);

  float wave1 =
    sin(uv.x * 3.0 + u_time * 0.4) * 0.5;

  float wave2 =
    sin(uv.y * 4.0 - u_time * 0.3 + wave1) * 0.5;

  float flow =
    wave1 +
    wave2 +
    length(uv);

  vec3 color =
    palette(flow * 0.5 + u_time * 0.05);

  float grain =
    fract(
      sin(
        dot(
          gl_FragCoord.xy,
          vec2(12.9898, 78.233)
        )
      ) * 43758.5453
    );

  color += (grain - 0.5) * 0.03;

  gl_FragColor = vec4(color, 1.0);
}