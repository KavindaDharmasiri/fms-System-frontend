import { Injectable } from '@angular/core';
import { EventSourcePolyfill } from 'event-source-polyfill';
import {HttpService} from "../../../shared/http/http.service";

@Injectable({ providedIn: 'root' })
export class SseService {
    private eventSource: EventSourcePolyfill | null = null;

    constructor() {}

    startListening(url: string, onEvent: (data: any) => void, onError?: (error: any) => void): void {
        this.stopListening();

        this.eventSource = new EventSourcePolyfill(url);

        this.eventSource.addEventListener('loopEvent', (event: any) => {
            const data = JSON.parse(event.data);
            onEvent(data);
        });


        this.eventSource.onerror = (error) => {
            console.error('SSE error:', error);
            if (onError) onError(error);
            this.stopListening();
        };
    }

    stopListening(): void {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
    }

  testRuleViaFetch(ruleDto: any, onMessage: (data: any) => void): void {
    fetch(HttpService.RULE_TEST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify(ruleDto),
    }).then(response => {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      const read = () => {
        reader?.read().then(({ done, value }) => {
          if (done) return;

          buffer += decoder.decode(value, { stream: true });

          const parts = buffer.split('\n\n');
          parts.slice(0, -1).forEach(part => {
            const lines = part.split('\n');
            const dataLine = lines.find(line => line.startsWith('data:'));
            if (dataLine) {
              const jsonStr = dataLine.replace('data:', '').trim();
              try {
                const parsed = JSON.parse(jsonStr);
                onMessage(parsed);
              } catch (e) {
                console.error('Error parsing JSON', e);
              }
            }
          });

          buffer = parts[parts.length - 1];
          read();
        });
      };

      read();
    });
  }

  testRuleGroupViaFetch(ruleDto: any, onMessage: (data: any) => void): void {
    fetch(HttpService.RULE_GROUP_TEST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify(ruleDto),
    }).then(response => {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      const read = () => {
        reader?.read().then(({ done, value }) => {
          if (done) return;

          buffer += decoder.decode(value, { stream: true });

          const parts = buffer.split('\n\n');
          parts.slice(0, -1).forEach(part => {
            const lines = part.split('\n');
            const dataLine = lines.find(line => line.startsWith('data:'));
            if (dataLine) {
              const jsonStr = dataLine.replace('data:', '').trim();
              try {
                const parsed = JSON.parse(jsonStr);
                onMessage(parsed);
              } catch (e) {
                console.error('Error parsing JSON', e);
              }
            }
          });

          buffer = parts[parts.length - 1];
          read();
        });
      };

      read();
    });
  }
}
