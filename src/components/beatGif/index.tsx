import { ReactElement, useEffect, useState } from 'react';

import { ImageComponent } from './image';

import { BeatSaberWebsocket } from '~/utils/bs-websocket';

interface Props {
  ip: string;
  port: string;
  debug: boolean;
  gifName: string;
}

export const BeatGifComponent = (props: Props): ReactElement<Props> => {
  const { ip, port, debug, gifName } = props;

  const [client, setClient] = useState<BeatSaberWebsocket>(
    new BeatSaberWebsocket(ip, port),
  );

  useEffect(() => {
    client.connect();
    return () => {
      client.disconnect();
      setClient(new BeatSaberWebsocket(ip, port));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ip, port]);

  const [bpm, setBpm] = useState<number>(100);

  useEffect(() => {
    client.registerBpmChangeHandler(setBpm);
    client.registerFinishedHandler(() => {
      setBpm(100);
    });
  }, [client, setBpm]);

  return (
    <>
      {debug ? (
        <style>{`
        body {
          background: black;
        }
      `}</style>
      ) : null}
      <ImageComponent bpm={bpm} gifName={gifName} />
    </>
  );
};
