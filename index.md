Have you ever encountered a video or some music that was too loud and moved the volume slider down halfway, only to discover it was still basically as loud as before you moved the slider? The most common approach for developers building these sliders is to take the ratio of how far along the slider moved and apply that precise ratio as a multiplier on the sound's amplitude. Surprisingly, this approach doesn't actually mirror how we perceive loudness. Enter perceptual.

Convert volume slider fractions to amplitudes and nothing more.

## Direct Ratio
  First we will demonstrate what happens when we do connect the volume slider directly to the gain of the oscillator.

  <button style="width: 300px;" id="play-button-1"><i class="fa fa-play" style="margin-right: 5 px;padding-right: 5px;"></i>Play Tone</button>
  <div style="width: 350px;">
    <i class="fa fa-volume-down" style="/*! height: 100%; */ font-size: 24px;"></i>
    <input type="range" style="vertical-align: top;margin-left: 5px;margin-right: 5px;width: 252px;" id="input-volume-1">
    <i class="fa fa-volume-up" style="font-size: 24px;"></i>
  </div>
  <div id="label-slider-1">Slider position: 50%</div>
  <div id="label-amplitude-1">Amplitude: 50%</div>

## Perceptual
  Now we will demonstrate again using Perceptual's amplitude conversion.

  <button style="width: 300px;" id="play-button-2"><i class="fa fa-play" style="margin-right: 5 px;padding-right: 5px;"></i>Play Tone</button>
  <div style="width: 350px;">
    <i class="fa fa-volume-down" style="/*! height: 100%; */ font-size: 24px;"></i>
    <input type="range" style="vertical-align: top;margin-left: 5px;margin-right: 5px;width: 252px;" id="input-volume-2">
    <i class="fa fa-volume-up" style="font-size: 24px;"></i>
  </div>
  <div id="label-slider-2">Slider position: 50%</div>
  <div id="label-amplitude-2">Amplitude: 50%</div>
