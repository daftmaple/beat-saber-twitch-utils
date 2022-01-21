import { ParsedUrlQuery } from 'querystring';

type WebsocketConfiguration = {
  ip?: string;
  port?: string;
  debug?: boolean;
};

export const queryHandler = (query: ParsedUrlQuery): WebsocketConfiguration => {
  const config: WebsocketConfiguration = {};

  if (typeof query.ip === `string`) {
    config.ip = query.ip;
  }

  if (typeof query.port === `string`) {
    config.port = query.port;
  }

  if (typeof query.debug === `string`) {
    config.debug = query.debug === 'true';
  }

  return config;
};

export const routeHandler = (slug: string | string[] | undefined): string => {
  if (typeof slug === 'undefined') {
    return 'catjam';
  }
  if (typeof slug === 'string') {
    return slug;
  }
  return slug[0];
};
