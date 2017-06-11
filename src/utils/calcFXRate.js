export default function calcFXRate(first, second, rates) {
  if (!first || !second) {
    return null;
  }

  return rates[second]/rates[first];
}