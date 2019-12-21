import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noteTitle'
})
export class NoteTitlePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (value === '') ? 'New Note' : value;
  }

}
