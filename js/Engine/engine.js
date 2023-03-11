// Rendering
const screenVertices = [
    -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0,
    1.0,  1.0, 0.0,
    1.0,  1.0, 0.0,
    -1.0,  1.0, 0.0,
    -1.0, -1.0, 0.0
];

const polygonCount = 30;
const count = polygonCount * 3;

const vertex = "attribute vec3 position;" +
    "uniform float count;" +
    "uniform vec2 uv[" + count + "];" +
    "uniform vec3 verts[" + count + "];" +
    "uniform float size;" +
    "void main() {" +
    "gl_Position = vec4(position,1);" +
    "}";

// Fragment shaders TODO: write different fragment shaders for different render modes
const standardFrag = "void main() {\ngl_FragColor = vec4(1,0,0,1);\n}";
const normalsFrag = "void main() {\ngl_FragColor = vec4(1,0,0,1);\n}";
const depthFrag = "void main() {\ngl_FragColor = vec4(1,0,0,1);\n}";
const bouncesFrag = "void main() {\ngl_FragColor = vec4(1,0,0,1);\n}";
const bounceFrag = "void main() {\ngl_FragColor = vec4(1,0,0,1);\n}";

// Render modes
const STANDARD = "Standard";
const NORMALS = "Normals";
const DEPTH = "Depth";
const BOUNCES = "Bounces";
const BOUNCE = "BounceValue";

// Mode backend
let modes = [
    [STANDARD, standardFrag],
    [NORMALS, normalsFrag],
    [DEPTH, depthFrag],
    [BOUNCES, bouncesFrag],
    [BOUNCE, bounceFrag],
];
let mode = getMode(STANDARD);

// Input
let Width = screen.width;
let Height = screen.height;
let MouseX = 0;
let MouseY = 0;
let NormalizedMouseX = MouseX / Width;
let NormalizedMouseY = MouseY / Height;

// Loop
let loopCallback = null;
let loopSet = false;

let objects = [];

function initEngine() {
    if (!gl) { console.log("ERROR: Could not start game engine, no WebGL implementation on browser available"); return false; }

    // IDK if I should put more here

    return true;
}

function addObject(vertices) { objects.push({ used: true, vertex: vertices }); }

function getMode(name) { for (let i = 0; i < modes.length; i++) { if (modes[i][0] === name) { return i; } } return 0; }

function engineLoop() {
    // Loop the program
    loopCallback();

    // Clear the display
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    // Set up shader
    const s = createShaderProgram(vertex, modes[mode][1]);
    gl.useProgram(s);

    // Set full screen object for the raytracer shader
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(screenVertices), gl.STATIC_DRAW);
    const vertexLocation = gl.getAttribLocation(s, "position");
    gl.enableVertexAttribArray(vertexLocation);
    gl.vertexAttribPointer(vertexLocation, 3, gl.FLOAT, false, 0, 0);

    // Get shader variable locations
    const vertsLoc = gl.getUniformLocation(s, "verts");
    const uvLoc = gl.getUniformLocation(s, "uv");
    const sizeLoc = gl.getUniformLocation(s, "count");


    // Set up final arrays
    const uvArray = [];
    const vertsArray = [];
    for (let i = vertsArray.length; i < count * 3; i++) { vertsArray.push(0.0); }
    for (let i =    uvArray.length; i < count * 2; i++) {    uvArray.push(0.0); }

    let index = 0;

    // Fill arrays with actual data as long as there is place for vertices
    // TODO: load vertices from scene

    // Fill GPU uniform data for the frame
    gl.uniform1f(sizeLoc  , parseFloat("" + (index - 1)));
    gl.uniform2fv(uvLoc   , uvArray   );
    gl.uniform3fv(vertsLoc, vertsArray);

    // Draw the frame using the shader in use
    gl.drawArrays(gl.TRIANGLES, 0, screenVertices.length);

    // Clean up
    gl.deleteBuffer(vertexBuffer);
    gl.deleteProgram(s);
}

function setEngineLoopCallback(loop) { loopCallback = loop; loopSet = !!loopCallback; }

function startEngine() {
    if (!loopSet) { return; }
    setInterval(engineLoop, 20);
}

function updateMouseLocation(e) {
    Width = screen.width;
    Height = screen.height;
    MouseX = e.clientX;
    MouseY = e.clientY;
    NormalizedMouseX = MouseX / Width;
    NormalizedMouseY = MouseY / Height;
}

function updateInput() {
    // TODO create input stuff
}