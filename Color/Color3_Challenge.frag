#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    // Smooth interpolation between 0.1 and 0.9
    float y = smoothstep(0.15,0.3,st.y) - smoothstep(0.3,0.45,st.y);

    vec3 color = vec3(y) * vec3(0.0,0.0,1.0);
    // TODO

    gl_FragColor = vec4(color,1.0);
}