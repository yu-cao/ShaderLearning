//visualize the normalized value of the x coordinate (st.x) in two ways: 
//one with brightness (observe the nice gradient from black to white)
//the other by plotting a green line on top (in that case the x value is assigned directly to y).

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//Using the linear interpolation
float plot(vec2 st, float pct)
{
	//smoothstep:give the smooth insert value
	//First is floor, Second is Upper, third is like a weightvalue to insert
	return smoothstep(pct - 0.02,pct,st.y) - smoothstep(pct,pct+0.02,st.y);//draw the green curve
}

void main() 
{
	vec2 st = gl_FragCoord.xy/u_resolution;
	//float y = pow(st.x,5.0);//the function relation of y and x, Now it is y = x^5
	//float y = step(0.5,st.x);//if st.x <= 0.5 return 0.0; else return 1.0

	//x ∈ [0.2,0.5] left part up to 1; right part still 0
	//x ∈ [0.2,0.5] left part hold 1; right part up to 1;
	//minus, so the whole curve is up and down, peek when x == 0.5
	float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x);
	
	//Test from the photo
	//float y = 1.0 - pow(abs(st.x - 0.5),0.5);//line 1, col 1
	//float y = 1.0 - pow(max(0.0,abs((st.x - 0.5) * 2.0) * 2.0 - 1.0),0.5);//line 5,col 1

	vec3 color = vec3(y);

	float pct = plot(st,y);

	//The left is base color of blank/white, the right is green of plot
	color = (1.0 - pct) * color + pct * vec3(0.0,1.0,0.0);

	gl_FragColor = vec4(color,1.0);
}
