import { ConfigurationV1 } from './v1';

export const CONFIG_NAME = `twitch-chat-config`;

export const defaultConfiguration: ConfigurationV1 = {
  version: 1,
  tts: {
    volume: 1,
  },
};

export * from './v1';
