import { perceptualToAmplitude } from '@discordapp/perceptual';



(()=> {
    let audioCtx = new AudioContext();

    let oscillatorNode = audioCtx.createOscillator();
    let gainNode = audioCtx.createGain();

    oscillatorNode.connect(gainNode);

    oscillatorNode.type = 'sine';
    oscillatorNode.frequency.value = 440;
    gainNode.gain.value = 0.5;
    oscillator.start();

    const playButton1 = document.getElementById('play-button-1');
    const playButton2 = document.getElementById('play-button-2');

    const volume1 = document.getElementById('input-volume-1');
    const volume2 = document.getElementById('input-volume-2');

    let state = 'stopped';

    playButton1!.addEventListener('click', () => {
        audioCtx.resume();
        if (state === 'stopped') {
            gainNode.connect(audioCtx.destination);
            state = 'running';
        } else {
            gainNode.disconnect(audioCtx.destination);
            state = 'stopped';
        }
    }, false);

    playButton2!.addEventListener('click', () => {
        audioCtx.resume();
        if (state === 'stopped') {
            gainNode.connect(audioCtx.destination);
            state = 'running';
        } else {
            gainNode.disconnect(audioCtx.destination);
            state = 'stopped';
        }
    }, false);

    console.log(`${perceptualToAmplitude(0.5)}`);
})();
