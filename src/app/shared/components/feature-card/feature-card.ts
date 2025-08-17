import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  standalone: false,
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.css'
})
export class FeatureCard {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() description!: string;
}
