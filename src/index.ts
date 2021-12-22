/*
 * These are utilities to help make our volume controls feel more natural.
 * Our hearing follows a logarithmic scale. We perceive less difference
 * between loud sounds than we do between soft sounds. We want our volume
 * controls to mirror how we perceive sound.
 *
 * In order to make our controls more natural, we'll use an exponential scale.
 * We'll present the user a scale between 0 and 100%, but the percentage is
 * actually selecting a percentage of VOLUME_DYNAMIC_RANGE_DB, which is
 * denominated in decibels. For example, if this range is 60dB, then 50%
 * corresponds to 50% * 60 = 30dB. However, this range is actually -60 to 0,
 * so we subtract 60dB, so 30 - 60 = -30. From here, we just convert decibels
 * to amplitude using an established formula, amplitude = 10 ^ (db /20),
 * so for example 10 ^ (-30/20) = 10 ^ (-1.5) = 0.03. So 50% perceived loudness
 * yields about 3% of the total amplitude.
 *
 * There are two more things to note. First, we tend to express everything as
 * percentages everywhere, so these functions take a percentage in and express
 * a percentage out. So in the previous example, perceptualToAmplitude(50%) = 3%.
 * Second, we allow users to boost the volume of other users, and we use a different
 * scale for perceived > 100%. We scale these to a different "boost" range.
 */

const DEFAULT_VOLUME_DYNAMIC_RANGE_DB = 50;
const DEFAULT_VOLUME_BOOST_DYNAMIC_RANGE_DB = 6;

/*
 * perceptualToAmplitude takes a user-presented control value and converts to amplitude
 * perceptual: Number between 0 and 2 * normalizedMax
 * normalizedMax: Normalization of perceptual value, choose 1 for decimals or 100 for percentages
 * range: Dynamic range of perceptual value from 0 to normalizedMax
 * boostRange: Dynamic range of perceptual value from normalizedMax to 2 * normalizedMax
 * returns: Number between 0 and 2 * normalizedMax
 */
export function perceptualToAmplitude(
  perceptual: number,
  normalizedMax: number = 1,
  range: number = DEFAULT_VOLUME_DYNAMIC_RANGE_DB,
  boostRange: number = DEFAULT_VOLUME_BOOST_DYNAMIC_RANGE_DB
) {
  if (perceptual === 0) {
    return 0;
  }
  let db;
  if (perceptual > normalizedMax) {
    db = ((perceptual - normalizedMax) / normalizedMax) * boostRange;
  } else {
    db = (perceptual / normalizedMax) * range - range;
  }
  return normalizedMax * Math.pow(10, db / 20);
}

/*
 * amplitudeToPerceptual takes a volume amplitude and converts to user-presented control
 * amp: Number between 0 and 2 * normalizedMax
 * normalizedMax: Normalization of amp value, choose 1 for decimals or 100 for percentages
 * range: Dynamic range of amp value from 0 to normalizedMax
 * boostRange: Dynamic range of amp value from normalizedMax to 2 * normalizedMax
 * returns: Number between 0 and 2 * normalizedMax
 */
export function amplitudeToPerceptual(
  amp: number,
  normalizedMax: number = 1,
  range: number = DEFAULT_VOLUME_DYNAMIC_RANGE_DB,
  boostRange: number = DEFAULT_VOLUME_BOOST_DYNAMIC_RANGE_DB
) {
  if (amp === 0) {
    return 0;
  }
  const db = 20 * Math.log10(amp / normalizedMax);
  let perceptual;
  if (db > 0) {
    perceptual = db / boostRange + 1;
  } else {
    perceptual = (range + db) / range;
  }
  return normalizedMax * perceptual;
}
