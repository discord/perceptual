Have you ever encountered a website with video or music that was too loud and moved the volume slider down halfway, only to discover it was still basically as loud as before you moved the slider? The most common approach taken by developers building these interfaces is to apply the position of the slider as a multiplier on the sound's amplitude. Unfortunately, this approach doesn't actually yield even loudness changes across the slider's full range. Enter perceptual.

`perceptual` converts volume slider fractions to amplitudes and nothing more.

<table>
 <thead>
  <tr>
    <td align="left">
      📝 iPhone users will need to turn on the ringer switch to use these demos.
    </td>
  </tr>
 </thead>
</table>

## Slider Value
  <button style="width: 300px;" id="play-button-1"><i class="fa fa-play" style="margin-right: 5 px;padding-right: 5px;" id="icon-play-button-1"></i><span id="label-play-button-1">Play Tone</span></button>
  <div id="div-volume-1" hidden=true>
    <div style="width: 350px;">
      <i class="fa fa-volume-down" style="/*! height: 100%; */ font-size: 24px;"></i>
      <input type="range" style="vertical-align: top;margin-left: 5px;margin-right: 5px;width: 252px;" id="input-volume-1" value="100">
      <i class="fa fa-volume-up" style="font-size: 24px;"></i>
    </div>
    <div id="label-slider-1">Slider position: 100.000%</div>
    <div id="label-amplitude-1">Amplitude: 100.000% (0.0 dB)</div>
  </div>

  First we will demonstrate what happens when we do connect the volume slider directly to the amplitude of the oscillator. In this demo, you can use the left and right arrow keys to move the slider position one step at a time after you have started the tone and clicked the slider once.

  Note that the entire slider range from 75% to 100% yields a roughly equal loudness. While the amplitude does change slightly in this range, our decibel calculation shows that this part of the slider covers less than 3 dB of range.

  The slider range from 15% to 40% offers good control of loudness. Below 15%, the dB change per step becomes significantly greater, giving us too few steps between different loudness levels.

## Perceptual
  <button style="width: 300px;" id="play-button-2"><i class="fa fa-play" style="margin-right: 5 px;padding-right: 5px;" id="icon-play-button-2"></i><span id="label-play-button-2">Play Tone</span></button>
  <div id="div-volume-2" hidden=true>
    <div style="width: 350px;">
      <i class="fa fa-volume-down" style="/*! height: 100%; */ font-size: 24px;"></i>
      <input type="range" style="vertical-align: top;margin-left: 5px;margin-right: 5px;width: 252px;" id="input-volume-2" value="100">
      <i class="fa fa-volume-up" style="font-size: 24px;"></i>
    </div>
    <div id="label-slider-2">Slider position: 100.000%</div>
    <div id="label-amplitude-2">Amplitude: 100.000% (0.0 dB)</div>
  </div>

  Now we will demonstrate again using Perceptual's amplitude conversion.

  We can see from the dB conversion that Perceptual has translated our slider into a 40 dB range. Each step reduces the volume by 0.4 dB. This range is a configurable parameter of Perceptual. By choosing 40 dB of range here we get the same dynamic range of the first example, so it is easier to compare the two demos.

  By stepping down through the full range, we can see that the perceived loudness adjusts smoothly. With the slider set to 50%, the tone is much softer than it was at 50% in the first demo.