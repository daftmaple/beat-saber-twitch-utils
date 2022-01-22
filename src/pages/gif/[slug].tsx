import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { BeatGifComponent } from '~/components/beatGif';
import { routeHandler, queryHandler } from '~/utils/bs-websocket';

const Gif = (): ReactElement => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { query } = useRouter();

  const { slug } = query;

  const {
    ip = '127.0.0.1',
    port = '6557',
    debug = false,
  } = queryHandler(query);

  const gifName = routeHandler(slug);

  return (
    <>
      <BeatGifComponent debug={debug} gifName={gifName} ip={ip} port={port} />
    </>
  );
};

export default Gif;
