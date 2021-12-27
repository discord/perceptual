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
    oscillatorNode.frequency.value = 440;
    gainNode.gain.value = 0.5;
    const playButton1 = document.getElementById('play-button-1');
    const playButton2 = document.getElementById('play-button-2');
    const volume1 = document.getElementById('input-volume-1');
    const volume2 = document.getElementById('input-volume-2');
    let state = 'stopped';
    playButton1.addEventListener('click', () => {
        audioCtx.resume();
        if (state === 'stopped') {
            oscillatorNode.start();
            state = 'running';
        }
        else {
            oscillatorNode.stop();
            state = 'stopped';
        }
    }, false);
    playButton2.addEventListener('click', () => {
        audioCtx.resume();
        if (state === 'stopped') {
            oscillatorNode.start();
            state = 'running';
        }
        else {
            oscillatorNode.stop();
            state = 'stopped';
        }
    }, false);
    console.log(`${(0, perceptual_1.perceptualToAmplitude)(0.5)}`);
})();
