import { SocketService } from './shared/services/socket.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
	declarations: [ChatComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
	providers: [SocketService]
})
export class ChatModule {}
