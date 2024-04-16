import { Component } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  chatBotToggle: boolean = false;
  messages: string[] = [];

  constructor(private http: HttpClient) {}

  chatBotHandle() {
    this.chatBotToggle = !this.chatBotToggle;
    if (this.chatBotToggle) {
      // Initialize chat with a welcome message
      this.sendMessage('Hello!');
    }
  }

  sendMessage(message: string) {
    // Add user message to UI
    this.messages.push('You: ' + message);

    // Make HTTP request to OpenAI API
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + '');
    const body = { prompt: message, max_tokens: 150 };

    this.http.post<any>('', body, { headers: headers }).subscribe(
      (response) => {
        // Add chat bot response to UI
        if (response && response.choices && response.choices.length > 0) {
          this.messages.push('Chat Bot: ' + response.choices[0].text);
        } else {
          console.error('Empty response from  API');
        }
      },
      (error: HttpErrorResponse) => {
        // Handle error response
        console.error('Error:', error);
        if (error.error && error.error.error) {
          console.error(' API Error:', error.error.error.message);
        } else {
          console.error('Unexpected error occurred.');
        }
      }
    );
  }

  isUserMessage(message: string): boolean {
    // Check if the message starts with 'You:'
    return message.startsWith('You:');
  }
}
