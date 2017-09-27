import Engine from './engine.js';
import TableScene from './scenes/tableScene.js';

var engine = new Engine();
var scene = new TableScene();

engine.setScene(scene);
engine.start();