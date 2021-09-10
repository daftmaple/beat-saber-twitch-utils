import { Events } from 'tmi.js';

import { Transformable } from './transformable';

type ClearChat = {
  channel: string;
};

export class TmiClearChat extends Transformable<ClearChat> {
  channel: string;

  constructor(...args: Parameters<Events['clearchat']>) {
    super();
    const [channel] = args;
    this.channel = channel;
  }

  public transform() {
    return {
      channel: this.channel,
    };
  }
}
