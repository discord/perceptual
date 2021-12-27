"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perceptual_1 = require("@discordapp/perceptual");
(() => {
    let audioCtx = new AudioContext();
    let oscillatorNode = audioCtx.createOscillator();
    let gainNode = audioCtx.createGain();
    oscillatorNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillatorNode.type = 'sine';
    oscillatorNode.frequency.value = 500;
    gainNode.gain.value = 0.5;
    oscillatorNode.start();
    console.log(`${(0, perceptual_1.perceptualToAmplitude)(0.5)}`);
})();
