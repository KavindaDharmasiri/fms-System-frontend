import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskAcquirerBin'
})
export class MaskAcquirerBinPipe implements PipeTransform {

  transform(cardNum: string | undefined | null): string {
    if (!cardNum || cardNum.length < 4) return 'N/A';
    return  cardNum.slice(0, 4) + ' ************';
  }

}
