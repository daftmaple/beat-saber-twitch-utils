import { ParsedUrlQuery } from 'querystring';

type ChannelConfiguration = {
  channel?: string;
  language?: string | string[];
};

export const queryHandler = (query: ParsedUrlQuery): ChannelConfiguration => {
  const config: ChannelConfiguration = {};

  if (typeof query.channel === `string`) {
    config.channel = query.channel;
  }

  if (typeof query.language !== `undefined`) {
    config.language = query.language;
  }

  return config;
};
