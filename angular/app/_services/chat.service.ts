import { Injectable } from '@angular/core';



@Injectable()
export class ChatService {
    private messages: string[] = [];

    constructor() {}

    setMessage(val: string) {
        this.messages.push(val);
    }

    getMessage() {
        return this.messages;
    }
}
