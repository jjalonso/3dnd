import { Engine } from '../src/index.js';


import TableScene from './scenes/tableScene.js';
// import 'three-orbit-control';


const CONFIG = {stereo: false};

let engine = new Engine(CONFIG);
let scene = new TableScene();

engine.setScene(scene);
engine.start();