import { Component, Input, OnInit } from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PropertyService } from '../../services/property.service';
import { Message } from '../../models/message.model';
import { AuthService } from '../../AuthService/auth-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css'],
})
export class MessageModalComponent implements OnInit {
  @Input() recipientId!: string;
  @Input() recipientName!: string;

  messages: Message[] = [];
  newMessage = '';
  currentUserId: string;
  loadingMessages = true;
  sending = false;

  constructor(
    // public activeModal: NgbActiveModal,
    private propertyService: PropertyService,
    private authService: AuthService // private toastr: ToastrService
  ) {
    // this.currentUserId = this.authService.getCurrentUserId();
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    // this.propertyService.getMessages(this.recipientId).subscribe({
    //   next: (messages) => {
    //     this.messages = messages;
    //     this.loadingMessages = false;
    //   },
    //   error: (err) => {
    //     this.toastr.error('Failed to load messages', 'Error');
    //     this.loadingMessages = false;
    //   },
    // });
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    this.sending = true;
    const message: Message = {
      senderId: this.currentUserId,
      receiverId: this.recipientId,
      content: this.newMessage,
      read: false,
    };

    // this.propertyService.sendMessage(message).subscribe({
    //   next: (sentMessage) => {
    //     this.messages.push(sentMessage);
    //     this.newMessage = '';
    //     this.sending = false;
    //     this.activeModal.close('message_sent');
    //   },
    //   error: (err) => {
    //     this.toastr.error('Failed to send message', 'Error');
    //     this.sending = false;
    //   },
    // });
  }

  dismiss(): void {
    // this.activeModal.dismiss();
  }
}
