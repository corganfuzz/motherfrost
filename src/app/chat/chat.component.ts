import {
	Component,
	OnInit,
	AfterViewInit,
	ViewChild,
	ElementRef,
	ViewChildren,
	QueryList
} from '@angular/core';
import { SocketService } from './shared/services/socket.service';

import { Action } from './shared/model/action';
import { Event } from './shared/model/event';
import { User } from './shared/model/user';
import { Message } from './shared/model/message';

import {
	MatDialog,
	MatDialogRef,
	MatList,
	MatListItem,
	MatListItemBase
} from '@angular/material';

const AVATAR_URL = 'https://api.adorable.io/avatars/285';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
	action = Action;
	user: User;
	messages: Message[] = [];
	msgContent: string;
	ioConnection: any;

	@ViewChild(MatList, { read: ElementRef }) matList: ElementRef;
	@ViewChildren(MatListItem, { read: ElementRef }) MatListItemBase: QueryList<
		MatListItem
	>;

	constructor(private socketService: SocketService) {}

	ngOnInit() {
		this.beginIoConnection();
	}

	ngAfterViewInit() {
		this.MatListItemBase.changes.subscribe(el => {
			this.bottomScrolling();
		});
	}

	private bottomScrolling() {
		try {
			this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeightl;
		} catch (err) {}
	}

	private beginIoConnection() {
		this.socketService.initSocket();

		this.ioConnection = this.socketService
			.onMessage()
			.subscribe((message: Message) => {
				this.messages.push(message);
			});

		this.socketService.onEvent(Event.CONNECT).subscribe(() => {
			console.log('connected');
		});

		this.socketService.onEvent(Event.DISCONNECT).subscribe(() => {
			console.log('disconnected');
		});
	}

	sendMessage(message: string) {
		if (!message) {
			return;
		}
		this.socketService.send({
			from: this.user,
			content: message
		});
		this.msgContent = null;
	}

	sendNotification(params: any, action: Action) {
		let message: Message;

		if (action === Action.JOINED) {
			message = {
				from: this.user,
				action
			};
		} else if (action === Action.RENAME) {
			message = {
				action,
				content: {
					username: this.user.name,
					previousUsername: params.previousUsername
				}
			};
		}
		this.socketService.send(message);
	}

	userInfo() {}
}
