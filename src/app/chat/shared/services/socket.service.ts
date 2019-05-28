import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable';
// import { Observer } from 'rxjs/Observer';
import { Message } from '../model/message';
import { Event } from '../model/event';

import * as socketIo from 'socket.io-client';

const BOX_URL = 'http://localhost:8000';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	private socket;

	initSocket() {
		this.socket = socketIo(BOX_URL);
	}

	send(message: Message) {
		this.socket.emit('message', message);
	}

	onMessage(): Observable<Message> {
		return new Observable<Message>(observer => {
			this.socket.on('message', (data: Message) => observer.next(data));
		});
	}

	onEvent(event: Event): Observable<any> {
		return new Observable<Event>(observer => {
			this.socket.on(event, () => observer.next());
		});
	}
}
