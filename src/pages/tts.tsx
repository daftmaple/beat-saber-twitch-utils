import ErrorPage from 'next/error';
import { useRouter } from 'next/router';

import { TtsComponent } from '~/components';
import { queryHandler } from '~/utils/tts/query';

/**
 * TTS Page
 *
 * Supported query parameters:
 * @param {string} channel
 * @param {string} language
 */
const TTS = () => {
  const { query } = useRouter();

  const config = queryHandler(query);

  if (!config.channel) {
    return <ErrorPage statusCode={400} />;
  }

  return (
    <div>
      <TtsComponent channel={config.channel} />
    </div>
  );
};

export default TTS;
