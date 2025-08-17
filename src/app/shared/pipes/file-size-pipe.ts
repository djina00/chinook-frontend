import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: false
})
export class FileSizePipe implements PipeTransform {

  transform(bytes: number | null | undefined, precision: number = 2): string {
    if (!bytes || bytes === 0) return '0 Bytes';
    if (bytes < 0) return 'Invalid size';
    
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024));
    
    // Ensure we don't exceed the units array
    const safeUnitIndex = Math.min(unitIndex, units.length - 1);
    const size = bytes / Math.pow(1024, safeUnitIndex);
    
    // Round to specified precision
    const roundedSize = Math.round(size * Math.pow(10, precision)) / Math.pow(10, precision);
    
    return `${roundedSize} ${units[safeUnitIndex]}`;
  }

}
