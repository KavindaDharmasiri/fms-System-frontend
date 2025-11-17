import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { Stomp, CompatClient } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: CompatClient | null = null;
  private notificationSubject = new Subject<any>();

  public notifications$ = this.notificationSubject.asObservable();

  connect(): void {
    const socket = new SockJS('http://localhost:8087/ws');
    this.stompClient = Stomp.over(socket);
    
    this.stompClient.connect({}, () => {
      this.stompClient?.subscribe('/topic/notifications', (message) => {
        this.notificationSubject.next(JSON.parse(message.body));
      });
    });
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
}