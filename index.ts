import { perceptualToAmplitude } from '@discordapp/perceptual';



(()=> {
    let audioCtx = new AudioContext();

    let oscillatorNode = audioCtx.createOscillator();
    let gainNode = audioCtx.createGain();

    oscillatorNode.connect(gainNode);

    oscillatorNode.type = 'sine';
    oscillatorNode.frequency.value = 440;
    gainNode.gain.value = 0.5;
    oscillatorNode.start();

    const playButton1 = document.getElementById('play-button-1');
    const playButton2 = document.getElementById('play-button-2');

    const volume1 = document.getElementById('input-volume-1');
    const volume2 = document.getElementById('input-volume-2');

    const labelSlider1 = document.getElementById('label-slider-1');
    const labelSlider2 = document.getElementById('label-slider-2');

    const labelAmplitude1 = document.getElementById('label-amplitude-1');
    const labelAmplitude2 = document.getElementById('label-amplitude-2');

    let state = 'stopped';

    playButton1!.addEventListener('click', () => {
        audioCtx.resume();
        if (state === 'stopped') {
            gainNode.connect(audioCtx.destination);
            state = 'running-1';
        } else if (state === 'running-2') {
            state = 'running-1';
        } else {
            gainNode.disconnect(audioCtx.destination);
            state = 'stopped';
        }
    }, false);

    playButton2!.addEventListener('click', () => {
        audioCtx.resume();
        if (state === 'stopped') {
            gainNode.connect(audioCtx.destination);
            state = 'running-2';
        } else if (state === 'running-1') {
            state = 'running-2';
        } else {
            gainNode.disconnect(audioCtx.destination);
            state = 'stopped';
        }
    }, false);

    volume1!.addEventListener('input', () => {
        const value = (volume1! as HTMLInputElement).valueAsNumber;
        labelSlider1!.innerText = `Slider Position: ${value}%`;
        labelAmplitude1!.innerText = `Amplitude: ${value}%`;
        if (state === 'stopped' || state === 'running-1') {
            gainNode.gain.value = value / 100;
        }
    }, false);

    volume2!.addEventListener('input', () => {
        const value = (volume2! as HTMLInputElement).valueAsNumber;
        const amp = perceptualToAmplitude(value, 100);
        labelSlider1!.innerText = `Slider Position: ${value}%`;
        labelAmplitude1!.innerText = `Amplitude: ${amp}%`;
        if (state === 'stopped' || state === 'running-2') {
            gainNode.gain.value = amp / 100;
        }
    }, false);
})();
