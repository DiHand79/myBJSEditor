import React from 'react';
import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Mesh,
  MeshBuilder,
} from '@babylonjs/core';
import './App.css';

class App extends React.Component {
  // constructor() {}
  render() {
    return (
      <a
        href='https://doc.babylonjs.com/guidedLearning/usingVite#setting-up-vite--babylonjs'
        target='_blanks'
      >
        Vite REact TS BabylonJS App
      </a>
    );
  }
}

export default App;
