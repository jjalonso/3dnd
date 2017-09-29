import Engine from './engine.js';
import TableScene from './scenes/tableScene.js';

const CONFIG = { stereo: false};

let engine = new Engine(CONFIG);
let scene = new TableScene();

engine.setScene(scene);
engine.start();