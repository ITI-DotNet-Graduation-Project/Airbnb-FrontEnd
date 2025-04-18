// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ChatService } from '../../services/chat.service';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-chatbot',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './chatbot.component.html',
//   styleUrl: './chatbot.component.css'
// })
// export class ChatbotComponent {
//   isOpen = true;
//   userMessage: string = '';

//   messages: { from: 'user' | 'bot', text: string }[] = [];

//   constructor(private chatService: ChatService) {}

//   sendMessage()
//   {
//     console.log('Button clicked!');
//     const message = this.userMessage.trim();
//     if (!message) return;

//     console.log('Sending message:', message);
//     this.messages.push({ from: 'user', text: message });
//     console.log(this.messages);

//     this.userMessage = '';
//     console.log('Calling API with message:', message);

//     this.chatService.sendMessage(message).subscribe({
//       next: (res) => {
//         const botReply = res.reply || 'No response from AI 🤖';
//         console.log('Received bot response:', botReply);
//         this.messages.push({ from: 'bot', text: botReply });
//       },
//       error: (err) => {
//         console.error(err);
//         this.messages.push({ from: 'bot', text: 'Failed to send 😓' });
//       }
//     });
//   }

//   toggleModal() {
//     this.isOpen = !this.isOpen;
//   }

//   ngAfterViewChecked()
//   {
//     const chatMessages = document.getElementById('chatMessages');
//     if (chatMessages) {
//       chatMessages.scrollTop = chatMessages.scrollHeight;
//     }
//   }
// }

import {
  Component,
  AfterViewChecked,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent implements AfterViewChecked {
  isOpen = true;
  userMessage: string = '';
  messages: { from: 'user' | 'bot'; text: string }[] = [];

  @ViewChild('chatMessages') chatMessages: ElementRef | undefined;

  constructor(private chatService: ChatService) {}

  sendMessage() {
    const message = this.userMessage.trim();
    if (!message) return;

    this.messages.push({ from: 'user', text: message });
    this.userMessage = '';

    this.chatService.sendMessage(message).subscribe({
      next: (res) => {
        const botReply = res.reply || 'No response from AI 🤖';
        this.messages.push({ from: 'bot', text: botReply });
      },
      error: (err) => {
        console.error(err);
        this.messages.push({ from: 'bot', text: 'Failed to send 😓' });
      },
    });
  }

  toggleModal() {
    this.isOpen = !this.isOpen;
  }

  ngAfterViewChecked() {
    if (this.chatMessages) {
      const messagesContainer = this.chatMessages.nativeElement;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }
}
