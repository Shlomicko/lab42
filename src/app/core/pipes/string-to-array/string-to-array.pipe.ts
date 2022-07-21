import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'stringToArray'
})
export class StringToArrayPipe implements PipeTransform {

  transform(value: string, separator: string = ','): string[] {
    if(!value){
      throw new Error('StringToArrayPipe::Value is null!');
    }
    return value.split(separator);
  }

}
