import ErrorPage from 'next/error';

import { useRouter } from 'next/router';
import { queryHandler } from '~/utils/tts/query';
import { TtsComponent } from '~/components';

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
      {config.channel}
      {config.language}
      <TtsComponent channel={config.channel} />
    </div>
  );
};

export default TTS;
