import { Component, Input } from '@angular/core';
import { ITrack } from '../../interfaces/i-track';

@Component({
  selector: 'app-track-card',
  standalone: false,
  templateUrl: './track-card.html',
  styleUrl: './track-card.css'
})
export class TrackCard {
  @Input() track!: ITrack;

  public formatDuration(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
