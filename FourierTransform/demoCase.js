import ComplexNumber from './ComplexNumber.js';

const SYSTEM_MESSAGE = "Online and ready sir";
const CLOSE_TO_ZERO_THRESHOLD = 1e-10;

/**
 * Discrete Fourier Transform (DFT): time to frequencies.
 *
 * Time complexity: O(N^2)
 *
 * @param {number[]} inputAmplitudes - Input signal amplitudes over time (complex
 * numbers with real parts only).
 * @param {number} zeroThreshold - Threshold that is used to convert real and imaginary numbers
 * to zero in case if they are smaller then this.
 *
 * @return {ComplexNumber[]} - Array of complex number. Each of the number represents the frequency
 * or signal. All signals together will form input signal over discrete time periods. Each signal's
 * complex number has radius (amplitude) and phase (angle) in polar form that describes the signal.
 *
 */
export default function dft(inputAmplitudes, zeroThreshold = CLOSE_TO_ZERO_THRESHOLD) {
  const N = inputAmplitudes.length;
  const signals = [];

  // Go through every discrete frequency.
  for (let frequency = 0; frequency < N; frequency += 1) {
    // Compound signal at current frequency that will ultimately
    // take part in forming input amplitudes.
    let frequencySignal = new ComplexNumber();

    // Go through every discrete point in time.
    for (let timer = 0; timer < N; timer += 1) {
      const currentAmplitude = inputAmplitudes[timer];

      // Calculate rotation angle.
      const rotationAngle = -1 * (2 * Math.PI) * frequency * (timer / N);

      // Remember that e^ix = cos(x) + i * sin(x);
      const dataPointContribution = new ComplexNumber({
        re: Math.cos(rotationAngle),
        im: Math.sin(rotationAngle),
      }).multiply(currentAmplitude);

      // Add this data point's contribution.
      frequencySignal = frequencySignal.add(dataPointContribution);
    }

    // Close to zero? You're zero.
    if (Math.abs(frequencySignal.re) < zeroThreshold) {
      frequencySignal.re = 0;
    }

    if (Math.abs(frequencySignal.im) < zeroThreshold) {
      frequencySignal.im = 0;
    }

    // Average contribution at this frequency.
    // The 1/N factor is usually moved to the reverse transform (going from frequencies
    // back to time). This is allowed, though it would be nice to have 1/N in the forward
    // transform since it gives the actual sizes for the time spikes.
    frequencySignal = frequencySignal.divide(N);

    // Add current frequency signal to the list of compound signals.
    signals[frequency] = frequencySignal;
  }

  return signals;
}

export const fourierTestCases = [
    {
      input: [
        { amplitude: 1 },
      ],
      output: [
        {
          frequency: 0, amplitude: 1, phase: 0, re: 1, im: 0,
        },
      ],
    },
    {
      input: [
        { amplitude: 1 },
        { amplitude: 0 },
      ],
      output: [
        {
          frequency: 0, amplitude: 0.5, phase: 0, re: 0.5, im: 0,
        },
        {
          frequency: 1, amplitude: 0.5, phase: 0, re: 0.5, im: 0,
        },
      ],
    },
    {
      input: [
        { amplitude: 2 },
        { amplitude: 0 },
      ],
      output: [
        {
          frequency: 0, amplitude: 1, phase: 0, re: 1, im: 0,
        },
        {
          frequency: 1, amplitude: 1, phase: 0, re: 1, im: 0,
        },
      ],
    },
    {
      input: [
        { amplitude: 1 },
        { amplitude: 0 },
        { amplitude: 0 },
      ],
      output: [
        {
          frequency: 0, amplitude: 0.33333, phase: 0, re: 0.33333, im: 0,
        },
        {
          frequency: 1, amplitude: 0.33333, phase: 0, re: 0.33333, im: 0,
        },
        {
          frequency: 2, amplitude: 0.33333, phase: 0, re: 0.33333, im: 0,
        },
      ],
    },
    {
      input: [
        { amplitude: 1 },
        { amplitude: 0 },
        { amplitude: 0 },
        { amplitude: 0 },
      ],
      output: [
        {
          frequency: 0, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
        },
        {
          frequency: 1, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
        },
        {
          frequency: 2, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
        },
        {
          frequency: 3, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
        },
      ],
    },
    {
      input: [
        { amplitude: 0 },
        { amplitude: 1 },
        { amplitude: 0 },
        { amplitude: 0 },
      ],
      output: [
        {
          frequency: 0, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
        },
        {
          frequency: 1, amplitude: 0.25, phase: -90, re: 0, im: -0.25,
        },
        {
          frequency: 2, amplitude: 0.25, phase: 180, re: -0.25, im: 0,
        },
        {
          frequency: 3, amplitude: 0.25, phase: 90, re: 0, im: 0.25,
        },
      ],
    },
    {
      input: [
        { amplitude: 0 },
        { amplitude: 0 },
        { amplitude: 1 },
        { amplitude: 0 },
      ],
      output: [
        {
          frequency: 0, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
        },
        {
          frequency: 1, amplitude: 0.25, phase: 180, re: -0.25, im: 0,
        },
        {
          frequency: 2, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
        },
        {
          frequency: 3, amplitude: 0.25, phase: 180, re: -0.25, im: 0,
        },
      ],
    },
    {
      input: [
        { amplitude: 0 },
        { amplitude: 0 },
        { amplitude: 0 },
        { amplitude: 2 },
      ],
      output: [
        {
          frequency: 0, amplitude: 0.5, phase: 0, re: 0.5, im: 0,
        },
        {
          frequency: 1, amplitude: 0.5, phase: 90, re: 0, im: 0.5,
        },
        {
          frequency: 2, amplitude: 0.5, phase: 180, re: -0.5, im: 0,
        },
        {
          frequency: 3, amplitude: 0.5, phase: -90, re: 0, im: -0.5,
        },
      ],
    },
    {
      input: [
        { amplitude: 0 },
        { amplitude: 1 },
        { amplitude: 0 },
        { amplitude: 2 },
      ],
      output: [
        {
          frequency: 0, amplitude: 0.75, phase: 0, re: 0.75, im: 0,
        },
        {
          frequency: 1, amplitude: 0.25, phase: 90, re: 0, im: 0.25,
        },
        {
          frequency: 2, amplitude: 0.75, phase: 180, re: -0.75, im: 0,
        },
        {
          frequency: 3, amplitude: 0.25, phase: -90, re: 0, im: -0.25,
        },
      ],
    },
    {
      input: [
        { amplitude: 4 },
        { amplitude: 1 },
        { amplitude: 0 },
        { amplitude: 2 },
      ],
      output: [
        {
          frequency: 0, amplitude: 1.75, phase: 0, re: 1.75, im: 0,
        },
        {
          frequency: 1, amplitude: 1.03077, phase: 14.03624, re: 0.99999, im: 0.25,
        },
        {
          frequency: 2, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
        },
        {
          frequency: 3, amplitude: 1.03077, phase: -14.03624, re: 1, im: -0.25,
        },
      ],
    },
    {
      input: [
        { amplitude: 4 },
        { amplitude: 1 },
        { amplitude: -3 },
        { amplitude: 2 },
      ],
      output: [
        {
          frequency: 0, amplitude: 1, phase: 0, re: 1, im: 0,
        },
        {
          frequency: 1, amplitude: 1.76776, phase: 8.13010, re: 1.75, im: 0.25,
        },
        {
          frequency: 2, amplitude: 0.5, phase: 180, re: -0.5, im: 0,
        },
        {
          frequency: 3, amplitude: 1.76776, phase: -8.13010, re: 1.75, im: -0.24999,
        },
      ],
    },
    {
      input: [
        { amplitude: 1 },
        { amplitude: 2 },
        { amplitude: 3 },
        { amplitude: 4 },
      ],
      output: [
        {
          frequency: 0, amplitude: 2.5, phase: 0, re: 2.5, im: 0,
        },
        {
          frequency: 1, amplitude: 0.70710, phase: 135, re: -0.5, im: 0.49999,
        },
        {
          frequency: 2, amplitude: 0.5, phase: 180, re: -0.5, im: 0,
        },
        {
          frequency: 3, amplitude: 0.70710, phase: -134.99999, re: -0.49999, im: -0.5,
        },
      ],
    },
  ];

fourierTestCases.map((i)=> {
    console.log('Transform Res: ', dft(fourierTestCases[i]));
})