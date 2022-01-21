/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

type BpmChangeHandler = (bpm: number) => void;
type FinishedHandler = () => void;
type ResumePauseHandler = (paused: boolean) => void;

export class BeatSaberWebsocket {
  private conn?: WebSocket;

  private bpmChangeHandler?: BpmChangeHandler;

  private finishedHandler?: FinishedHandler;

  private resumePauseHandler?: ResumePauseHandler;

  public constructor(private ip: string, private port: string) {}

  public connect(): void {
    this.conn = new WebSocket(`ws://${this.ip}:${this.port}/socket`);

    this.conn.addEventListener('open', () => {
      // eslint-disable-next-line no-console
      console.log('WebSocket opened');
    });

    this.conn.addEventListener('message', (message) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = JSON.parse(message.data);

      if (data.event === 'songStart') {
        this.bpmChangeHandler?.(data.status.beatmap.songBPM);
      }

      if (data.event === 'finished' || data.event === 'menu') {
        this.finishedHandler?.();
      }

      if (data.event === 'pause') {
        this.resumePauseHandler?.(true);
      }

      if (data.event === 'resume') {
        this.resumePauseHandler?.(false);
      }
    });

    this.conn.addEventListener('close', () => {
      // eslint-disable-next-line no-console
      console.log('Failed to connect to server, retrying in 3 seconds');
      setTimeout(() => {
        this.connect();
      }, 3000);
    });
  }

  public disconnect(): void {
    this.conn?.close();
  }

  public registerBpmChangeHandler(handler: BpmChangeHandler): void {
    this.bpmChangeHandler = handler;
  }

  public registerFinishedHandler(handler: FinishedHandler): void {
    this.finishedHandler = handler;
  }

  public registerResumePauseHandler(handler: ResumePauseHandler): void {
    this.resumePauseHandler = handler;
  }
}
