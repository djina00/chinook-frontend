import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  standalone: false,
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.css'
})
export class DashboardCard {
  @Input() icon: string = '';
  @Input() value: number | string = 0;
  @Input() label: string = '';
  @Input() colorClass: string = 'text-primary';
}
