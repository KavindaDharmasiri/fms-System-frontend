import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCard'
})
export class MaskCardPipe implements PipeTransform {

  transform(cardNum: string | undefined | null): string {
    if (!cardNum || cardNum.length < 4) return 'N/A';
    return '************ ' + cardNum.slice(-4);
  }

}
