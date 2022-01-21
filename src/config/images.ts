/**
 * This file incorporates third party material from the project listed below
 *
 * gif-to-the-beat
 * Repository: https://github.com/cadon0/gif-to-the-beat

MIT License

Copyright (c) 2020 Caleb Donnelly

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

type ImageConfig = {
  // Name of gif which will be used as part of slug on /gif/<slug>
  gifName: string;
  // Dimensions of the gif in pixels
  width: number;
  height: number;
  spritesheetWidth: number;
  // "BPM" of the Original gif
  originalBpm: number;
  // Length of the original gif
  originalTimeLength: number;
  // Milliseconds until the gif hits the first "beat".
  // Increase to start the gif earlier relative to the music, decrease to start later
  offsetMs: number;
  // The location of the sprite sheet for the gif, either a URL
  // or the name of a file in the public directory
  spritesheetLocation: string;
};

const catJAM: ImageConfig = {
  gifName: 'catjam',
  width: 112,
  height: 112,
  spritesheetWidth: 16016,
  originalBpm: 136.3636,
  originalTimeLength: 5.72,
  offsetMs: 15,
  spritesheetLocation: '/images/catjam.png',
};

const AYAYAJAM: ImageConfig = {
  gifName: 'ayayajam',
  width: 112,
  height: 112,
  spritesheetWidth: 784,
  originalBpm: 215,
  originalTimeLength: 0.27907,
  offsetMs: 0,
  spritesheetLocation: '/images/ayayajam.png',
};

export const images = [catJAM, AYAYAJAM];
