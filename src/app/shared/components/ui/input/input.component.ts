import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() control: any;
  @Input() idInput!: string;
  @Input() element: string = 'input';
  @Input() typeInput!: string;
  @Input() labelInput!: string;
  flag: boolean = true;
}
