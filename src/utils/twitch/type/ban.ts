import { Events } from 'tmi.js';

import { Transformable } from './transformable';

import { Ban } from '~/types';

export class TmiBan extends Transformable<Ban> {
  channel: string;

  username: string;

  reason: string;

  constructor(...args: Parameters<Events['ban']>) {
    super();
    const [channel, username, reason] = args;
    this.channel = channel;
    this.username = username;
    this.reason = reason;
  }

  public transform() {
    return {
      channel: this.channel,
      username: this.username,
      reason: this.reason,
    };
  }
}
