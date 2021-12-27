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

    const playButton1 = document.getElementById('play-button-1')!;
    const playButton2 = document.getElementById('play-button-2')!;

    const volume1 = document.getElementById('input-volume-1')!;
    const volume2 = document.getElementById('input-volume-2')!;

    const divVolume1 = document.getElementById('div-volume-1')!;
    const divVolume2 = document.getElementById('div-volume-2')!;

    const labelSlider1 = document.getElementById('label-slider-1')!;
    const labelSlider2 = document.getElementById('label-slider-2')!;

    const labelAmplitude1 = document.getElementById('label-amplitude-1')!;
    const labelAmplitude2 = document.getElementById('label-amplitude-2')!;

    let state = 'stopped';

    playButton1.addEventListener('click', () => {
        audioCtx.resume();
        if (state === 'stopped') {
            gainNode.connect(audioCtx.destination);
            state = 'running-1';
            playButton1.innerText = 'Stop Tone';
            playButton2.innerText = 'Play Tone';
            divVolume1.hidden = false;
            divVolume2.hidden = true;
        } else if (state === 'running-2') {
            state = 'running-1';
            playButton1.innerText = 'Stop Tone';
            playButton2.innerText = 'Play Tone';
            divVolume1.hidden = false;
            divVolume2.hidden = true;
        } else {
            gainNode.disconnect(audioCtx.destination);
            state = 'stopped';
            playButton1.innerText = 'Play Tone';
            divVolume1.hidden = true;
        }
    }, false);

    playButton2.addEventListener('click', () => {
        audioCtx.resume();
        if (state === 'stopped') {
            gainNode.connect(audioCtx.destination);
            state = 'running-2';
            playButton1.innerText = 'Play Tone';
            playButton2.innerText = 'Stop Tone';
            divVolume1.hidden = true;
            divVolume2.hidden = false;
        } else if (state === 'running-1') {
            state = 'running-2';
            playButton1.innerText = 'Play Tone';
            playButton2.innerText = 'Stop Tone';
            divVolume1.hidden = true;
            divVolume2.hidden = false;
        } else {
            gainNode.disconnect(audioCtx.destination);
            state = 'stopped';
            playButton2.innerText = 'Play Tone';
            divVolume2.hidden = true;
        }
    }, false);

    volume1.addEventListener('input', () => {
        const value = (volume1 as HTMLInputElement).valueAsNumber;
        labelSlider1.innerText = `Slider Position: ${value}%`;
        labelAmplitude1.innerText = `Amplitude: ${value}%`;
        if (state === 'stopped' || state === 'running-1') {
            gainNode.gain.value = value / 100;
        }
    }, false);

    volume2.addEventListener('input', () => {
        const value = (volume2 as HTMLInputElement).valueAsNumber;
        const amp = perceptualToAmplitude(value, 100);
        labelSlider2.innerText = `Slider Position: ${value}%`;
        labelAmplitude2.innerText = `Amplitude: ${amp.toFixed(3)}%`;
        if (state === 'stopped' || state === 'running-2') {
            gainNode.gain.value = amp / 100;
        }
    }, false);
})();
