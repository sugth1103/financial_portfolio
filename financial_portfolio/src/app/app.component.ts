import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Add this line
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'financial_portfolio';
}
