export type EventBusService = {
  readonly name: string;
  onmessage: ((this: BroadcastChannel, ev: MessageEvent) => any) | null;
  onmessageerror: ((this: BroadcastChannel, ev: MessageEvent) => any) | null;
  /**
   * Closes the BroadcastChannel object, opening it up to garbage collection.
   */
  close(): void;
  /**
   * Sends the given message to other BroadcastChannel objects set up for this channel. Messages can be structured objects, e.g. nested objects and arrays.
   */
  postMessage(message: any): void;
  addEventListener(type: string, listener: (this: BroadcastChannel, ev: MessageEvent) => any, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof BroadcastChannelEventMap>(type: K, listener: (this: BroadcastChannel, ev: BroadcastChannelEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
