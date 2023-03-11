

function initProgram() {


    //addObject(vertex, frag, vertices);
}

function loop() {

}



// Start looping the engine
if (initEngine()) {
    initProgram();
    setEngineLoopCallback(loop);

    startEngine();
}