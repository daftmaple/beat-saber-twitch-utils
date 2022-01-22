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

import { ReactElement } from 'react';

import { images } from '~/config/images';

interface Props {
  bpm: number;
  gifName: string;
}

export const ImageComponent = (props: Props): ReactElement<Props> => {
  const { bpm, gifName } = props;

  const imageResult = images.filter((i) => i.gifName === gifName);

  if (imageResult.length === 0) {
    return <div />;
  }

  const image = imageResult[0];
  const animationDuration =
    (image.originalTimeLength * image.originalBpm) / bpm;
  const animationTiming = image.spritesheetWidth / image.width;

  return (
    <>
      <style>{`
        @keyframes ${gifName} {
          100% {
            background-position: -${image.spritesheetWidth}px;
          }
        }
      `}</style>
      <div
        style={{
          width: `${image.width}px`,
          height: `${image.height}px`,
          background: `url(${image.spritesheetLocation}) left center`,
          animation: `${gifName} ${animationDuration}s steps(${animationTiming}) infinite`,
        }}
      />
    </>
  );
};
