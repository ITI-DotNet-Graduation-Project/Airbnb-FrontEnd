// 

import { Component, OnInit } from '@angular/core';
import { CardService } from '../../../../services/card.service';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {

  @Output() toggleChat = new EventEmitter<void>();
    onToggleChat() {
      console.log('toggleChat event emitted'); 
      this.toggleChat.emit(); 
    }

  cards: any[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cards = this.cardService.getCards();
  }
}