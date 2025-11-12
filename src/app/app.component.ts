import { FlowbiteService } from './shared/services/flowbite.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/layout/footer/footer.component';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Peeksy';
  private readonly _flowbiteService = inject(FlowbiteService);

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite((flowbite) => {
      console.log('flowbite loaded', flowbite);
    });
  }
}
