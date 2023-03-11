const screen = document.getElementById("Display");

const errorDisplay = document.getElementById("Error");
let error = false;

const gl = initRenderer();

function initRenderer() {
    // Attempt WebGL
    tmp = screen.getContext('webgl');

    // Check if there is a WebGL active
    if (!tmp) { setError("There is no WebGL version on your browser is available!", true); return null; }
    console.log(tmp.VERSION);
    return tmp;
}

function setError(err, stop) {
    error = !!Math.max(stop, error);
    document.getElementById("Error").innerHTML = "ERROR: " + err;
}

function createShaderProgram(vertex, fragment) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertex);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragment);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    return program;
}

function createLoader() {

}