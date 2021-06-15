import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private consumer: BroadcastChannel;
  private producer: BroadcastChannel;

  constructor() {
    this.consumer = new BroadcastChannel('pluginGlobalEventBus');
    this.producer = new BroadcastChannel('pluginGlobalEventBus');

    this.consumer.addEventListener('message', (event) => {
      console.log('THIS IS APPLICATION BUS');
      console.log(event);
    });
  }

  postMessage(message: any): void {
    this.producer.postMessage(message);
  }

  addEventListener(eventName, listener): void {
    this.consumer.addEventListener('message', (event) => {
      if (event.data.name === eventName) {
        listener(event);
      }
    });
  }
}
