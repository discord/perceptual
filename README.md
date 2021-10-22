perceptual
=============

Have you ever encountered a video or some music that was too loud and moved the volume slider down halfway, only to discover it was still basically as loud as before you moved the slider? The most common approach for developers building these sliders is to take the ratio of how far along the slider moved and apply that precise ratio as a multiplier on the sound's amplitude. Surprisingly, this approach doesn't actually mirror how we perceive loudness. Enter `perceptual`.

Convert volume slider fractions to amplitudes and nothing more.

## Theory

This is a utility to help make our volume controls feel more natural. Our hearing follows a logarithmic scale. We perceive less difference between loud sounds than we do between soft sounds. We want our volume controls to mirror how we perceive sound.

In order to make our controls more natural, we'll use an exponential scale. We'll present the user a scale between 0 and 100%, but the percentage will actually select a percentage of a reasonably-chosen range denominated in decibels. For example, if this range is 60dB, then 50% corresponds to 50% * 60 = 30dB. However, this range is negative; it starts at -60dB and increases toward 0dB so we subtract 60dB, so 30 - 60 = -30. From here, we just convert decibels to amplitude using an established formula, amplitude = 10 ^ (db /20), so for example 10 ^ (-30/20) = 10 ^ (-1.5) = 0.03. So 50% perceived loudness yields about 3% of the total amplitude.

There are two more things to note. First, we'll express everything as percentages everywhere, so these functions take a percentage in and express a percentage out. In the previous example, perceptualToAmplitude(50%) = 3%. Second, we allow users to boost the volume of other users, and we use a different scale for perceived > 100%. We scale these to a different "boost" range, which by default is 6dB of boost.


## Usage

