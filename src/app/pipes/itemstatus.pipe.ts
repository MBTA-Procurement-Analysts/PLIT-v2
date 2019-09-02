import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemstatus'
})
export class ItemstatusPipe implements PipeTransform {

  itemStatusDict = {
    1: "Active",
    2: "Hold",
    3: "Discontinue",
    4: "Inactive",
    5: "Pending Approval",
    6: "Denied Approval",
    7: "Under Initialization"
  }

  transform(value: string): string {
    let result = this.itemStatusDict[value]? this.itemStatusDict[value] : value;
    return result;
  }

}
