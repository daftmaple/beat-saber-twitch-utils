import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { BeatGifComponent } from '~/components/beatGif';
import { images } from '~/config/images';
import { routeHandler, queryHandler } from '~/utils/bs-websocket';

const Gif = (): ReactElement | Promise<boolean> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const { query } = router;
  const { slug } = query;

  const {
    ip = '127.0.0.1',
    port = '6557',
    debug = false,
  } = queryHandler(query);

  const gifName = routeHandler(slug);

  const imageResult = images.filter((i) => i.gifName === gifName);

  if (imageResult.length !== 0) {
    return (
      <>
        <BeatGifComponent debug={debug} gifName={gifName} ip={ip} port={port} />
      </>
    );
  }

  return router.push('/404');
};

export default Gif;
