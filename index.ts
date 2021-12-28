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

function convertSliderPosition(pos: number, identifier: string): number {
    if (identifier === '1') {
        return pos;
    }
    if (identifier === '2') {
        return perceptualToAmplitude(pos, 100);
    }
    return 0;
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

        demos[d].volume.addEventListener('input', () => {
            const value = (demos[d].volume as HTMLInputElement).valueAsNumber;
            const amp = convertSliderPosition(value, d);
            demos[d].labelSlider.innerText = `Slider Position: ${value}%`;
            demos[d].labelAmplitude.innerText = `Amplitude: ${amp.toFixed(3)}%`;
            if (state === `running-${d}`) {
                gainNode.gain.value = amp / 100;
            }
        }, false);
    }
})();
