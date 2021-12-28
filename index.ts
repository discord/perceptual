import { perceptualToAmplitude } from '@discordapp/perceptual';

const demoList = ['1', '2'];

interface Demo {
    [key: string]: HTMLElement;
}

interface DemoCollection {
    [key: string]: Demo
}

function getDemos(): DemoCollection {
    const demos: DemoCollection = {};

    for (const d of demoList) {
        demos[d] = {};
        demos[d].playButton = document.getElementById(`play-button-${d}`)!;
        demos[d].volume = document.getElementById(`input-volume-${d}`)!;
        demos[d].divVolume = document.getElementById(`div-volume-${d}`)!;
        demos[d].labelPlayButton = document.getElementById(`label-play-button-${d}`)!;
        demos[d].iconPlayButton = document.getElementById(`icon-play-button-${d}`)!;
        demos[d].labelSlider = document.getElementById(`label-slider-${d}`)!;
        demos[d].labelAmplitude = document.getElementById(`label-amplitude-${d}`)!;
    }
    return demos;
}

function showDemo(demos: DemoCollection, identifier: string) {
    for (const d in demos) {
        if (d === identifier) {
            continue;
        }
        hideDemo(demos, d);
    };

    const demo = demos[identifier]!;
    demo.labelPlayButton.innerText = 'Stop Tone';
    demo.iconPlayButton.classList.replace('fa-play', 'fa-stop');
    demo.divVolume.hidden = false;
}

function hideDemo(demos: DemoCollection, identifier: string) {
    const demo = demos[identifier]!;
    demo.labelPlayButton.innerText = 'Play Tone';
    demo.iconPlayButton.classList.replace('fa-stop', 'fa-play');
    demo.divVolume.hidden = true;
}

(()=> {
    let audioCtx = new AudioContext();

    let oscillatorNode = audioCtx.createOscillator();
    let gainNode = audioCtx.createGain();

    oscillatorNode.connect(gainNode);

    oscillatorNode.type = 'sine';
    oscillatorNode.frequency.value = 440;
    gainNode.gain.value = 0.5;
    oscillatorNode.start();

    const demos = getDemos();

    let state = 'stopped';

    for (const d in demos) {
        demos[d].playButton.addEventListener('click', () => {
            audioCtx.resume();
            if (state === 'stopped') {
                gainNode.connect(audioCtx.destination);
                state = `running-${d}`;
                showDemo(demos, d);
            } else if (state === `running-${d}`) {
                gainNode.disconnect(audioCtx.destination);
                state = 'stopped';
                hideDemo(demos, d);
            } else {
                state = `running-${d}`;
                showDemo(demos, d);
            }
        }, false);
    }

    demos['1'].volume.addEventListener('input', () => {
        const value = (demos['1'].volume as HTMLInputElement).valueAsNumber;
        demos['1'].labelSlider.innerText = `Slider Position: ${value}%`;
        demos['1'].labelAmplitude.innerText = `Amplitude: ${value}%`;
        if (state === 'stopped' || state === 'running-1') {
            gainNode.gain.value = value / 100;
        }
    }, false);

    demos['2'].volume.addEventListener('input', () => {
        const value = (demos['2'].volume as HTMLInputElement).valueAsNumber;
        const amp = perceptualToAmplitude(value, 100);
        demos['2'].labelSlider.innerText = `Slider Position: ${value}%`;
        demos['2'].labelAmplitude.innerText = `Amplitude: ${amp.toFixed(3)}%`;
        if (state === 'stopped' || state === 'running-2') {
            gainNode.gain.value = amp / 100;
        }
    }, false);
})();
