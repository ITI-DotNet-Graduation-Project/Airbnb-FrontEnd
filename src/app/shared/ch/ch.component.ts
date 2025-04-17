import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ch',
  standalone: true,
  imports: [],
  templateUrl: './ch.component.html',
  styleUrl: './ch.component.css'
})
export class ChComponent {
  @Output() toggleChat = new EventEmitter<void>();
    onToggleChat() {
      console.log('toggleChat event emitted'); 
      this.toggleChat.emit(); 
    }

}
