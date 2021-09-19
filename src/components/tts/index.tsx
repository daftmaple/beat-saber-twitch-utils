import { debounce } from 'lodash';
import { ReactElement, useCallback, useEffect, useState } from 'react';

import { Slider } from '../slider';

import { useLinker } from './hook/linker';

import { TwitchChat } from '~/utils/twitch';

interface Props {
  channel: string;
}

export const TtsComponent = (props: Props): ReactElement<Props> => {
  const { channel } = props;

  const [enabled, setEnabled] = useState<boolean>(false);
  const [client, setClient] = useState<TwitchChat>(new TwitchChat(channel));
  const [volume, setVolume] = useState<number>(1);
  const [volumeValue, setVolumeValue] = useState<number>(volume * 100);

  useEffect(() => {
    client.connect();
    return () => {
      client.disconnect();
      setClient(new TwitchChat(channel));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const volumeDebouncer = useCallback(
    debounce((newVolume: number) => setVolume(newVolume), 300),
    [setVolume],
  );

  useEffect(() => {
    volumeDebouncer(volumeValue / 100);
  }, [volumeDebouncer, volumeValue]);

  useLinker({ enabled, client, volume });

  return (
    <>
      <div>
        {!enabled ? (
          <button
            type="button"
            onClick={() => {
              setEnabled(true);
            }}
          >
            Activate tts
          </button>
        ) : null}
      </div>
      <div>
        <Slider setValue={setVolumeValue} value={volumeValue} />
        Volume: {volumeValue}
      </div>
    </>
  );
};
