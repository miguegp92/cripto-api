import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService  {

  @Output() launch: EventEmitter<any> = new EventEmitter();

  state: string = 'info';
  temp: number = 5000;

  showNotificationSuccess( timeout?: number){
    this.state = 'success';
    const messages = ['Su petición se ha completado con éxito'];
    const config = {messages: messages, temp: timeout}
    this.launch.emit(config)
  }

  showNotificationError(timeout?: number){
    this.state = 'error';
    const messages = ['Se ha producido un error al ejecutar su petición'];
    const config = {messages: messages, temp: timeout}
    this.launch.emit(config)
  }

  showNotificationInfo(messages: string [], timeout?: number){
    this.state = 'info';
    const config = {messages: messages, temp: timeout}
    this.launch.emit(config)
  }
}
