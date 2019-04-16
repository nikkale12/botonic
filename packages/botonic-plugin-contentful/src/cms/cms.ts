import { RichMessage, Carousel, Button } from './model';

export class Callback {
  constructor(readonly payload?: string, readonly url?: string) {}

  static ofPayload(payload: string): Callback {
    return new Callback(payload, undefined);
  }

  static ofUrl(url: string): Callback {
    return new Callback(undefined, url);
  }
}

/**
 * Map the id of a UI element such a button to a callback
 */
export class CallbackMap {
  private forAllIds?: Callback;

  private callbacks: Map<string, Callback> = new Map();

  static forAllIds(callback: Callback): CallbackMap {
    let map = new CallbackMap();
    map.forAllIds = callback;
    return map;
  }

  addCallback(id: string, callback: Callback): CallbackMap {
    if (this.forAllIds) {
      throw new Error('Cannot add callback when created with forAllIds');
    }

    this.callbacks[id] = callback;
    return this;
  }

  getCallback(id: string): Callback {
    if (this.forAllIds) {
      return this.forAllIds;
    }

    return this.callbacks[id];
  }
}

export interface CMS {
  richMessage(id: string, callbacks: CallbackMap): Promise<RichMessage>;

  carousel(id: string, callbacks: CallbackMap): Promise<Carousel>;
}

export class DummyCMS implements CMS {
  async carousel(id: string, callbacks: CallbackMap): Promise<Carousel> {
    return Promise.resolve(
      new Carousel().addElement(await this.richMessage(id, callbacks))
    );
  }

  async richMessage(id: string, callbacks: CallbackMap): Promise<RichMessage> {
    let message = new RichMessage(
      'Title for ' + id,
      'subtitle',
      '../assets/img_home_bg.png'
    );
    message.addButton(new Button('press me', callbacks.getCallback(id)));

    return Promise.resolve(message);
  }
}
