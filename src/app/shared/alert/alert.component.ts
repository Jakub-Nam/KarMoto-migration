import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message = '';
  @Output() closeMessage = new EventEmitter<void>();

  onClose() {
    this.closeMessage.emit();
  }
}
