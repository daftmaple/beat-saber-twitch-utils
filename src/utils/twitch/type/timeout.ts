import { Events } from 'tmi.js';
import { Transformable } from './transformable';

type Timeout = {
  channel: string;
  username: string;
  reason: string;
  duration: number;
};

export class TmiTimeout extends Transformable<Timeout> {
  channel: string;

  username: string;

  reason: string;

  duration: number;

  constructor(...args: Parameters<Events['timeout']>) {
    super();
    const [channel, username, reason, duration] = args;
    this.channel = channel;
    this.username = username;
    this.reason = reason;
    this.duration = duration;
  }

  public transform() {
    return {
      channel: this.channel,
      username: this.username,
      reason: this.reason,
      duration: this.duration,
    };
  }
}
