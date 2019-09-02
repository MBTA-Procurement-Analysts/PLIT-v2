import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reqstatus'
})
export class ReqstatusPipe implements PipeTransform {
  reqStatusDict = {
    A: "Approved",
    C: "Completed",
    P: "Pending",
    X: "Cancelled"
  };

  transform(value: string): string {
    let result = this.reqStatusDict[value]? this.reqStatusDict[value] : value;
    return result;
  }
}
