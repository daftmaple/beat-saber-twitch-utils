import { ReactElement, useEffect, useState } from 'react';

import { useLinker } from './hook/linker';

import { TwitchChat } from '~/utils/twitch';

interface Props {
  channel: string;
}

export const TtsComponent = (props: Props): ReactElement<Props> => {
  const { channel } = props;

  const [enabled, setEnabled] = useState<boolean>(false);
  const [client, setClient] = useState<TwitchChat>(new TwitchChat(channel));

  useEffect(() => {
    client.connect();
    return () => {
      client.disconnect();
      setClient(new TwitchChat(channel));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  useLinker({ enabled, client });

  return (
    <>
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
    </>
  );
};