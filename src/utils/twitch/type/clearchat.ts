import { Events } from 'tmi.js';

import { Transformable } from './transformable';

import { ClearChat } from '~/types';

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
