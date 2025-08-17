import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: false
})
export class DurationPipe implements PipeTransform {

  transform(milliseconds: number): string {
    if (!milliseconds || milliseconds < 0) {
      return '0:00';
    }
    
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

}
