import { perceptualToAmplitude } from '@discordapp/perceptual';

(()=> {
    let audioCtx = new AudioContext();

    let oscillatorNode = audioCtx.createOscillator();
    let gainNode = audioCtx.createGain();

    oscillatorNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillatorNode.type = 'sine';
    oscillatorNode.frequency.value = 440;
    gainNode.gain.value = 0.5;

    oscillatorNode.start();
    console.log(`${perceptualToAmplitude(0.5)}`);
})();
