export class Req {
      _id: string;
      REQ_No: string;
      Account: number;
      Approved_By: string;
      Approved_On: Date;
      Business_Unit: string;
      Buyer: string;
      Currency: string;
      Department: Department;
      Fund: number;
      Origin: string;
      REQ_Date: Date;
      Requester: string;
      Ship_To: Ship_To;
      Status: string;
      Vendor: Vendor;
      lines: Lines;
      User_Notes: User_Notes;
      flag: boolean;
      worklist: Worklist;
  }

export class Department {
  number: number;
  Description: string;
}

export class Ship_To {
  Description: string;
  Address_1: string;
  Address_2: string;
  City: string;
  State: string;
  Zip_Code: string;
  Country: string;
}

export class Vendor {
  Name: string;
  Number: number;
}

export class Lines {
  Line_No: number;
  Unit_Price: number;
  Line_Total: number;
  Schedule_No: number;
  UOM: string;
  Due_Date: Date;
  MFG_ID: string;
  Quantity: number;
  More_Info: string;
  Item: string;
  Product: string;
  PO: PO;
}

export class PO {
  PO_number: string;
  Line_No: number;
}

export class User_Notes {
  User: string;
  Date: number;
  Note_Info: string
}

export class Worklist {
  Appr_Inst: Number;
  Work_List: string;
  Approval_Number: string;
  Appr_Stat: string;
  Denial_Date_Time: Date;
  User: string;
  Unit: string;
  PO_HDR_Status: string;
  WF_APPR_Status: string;
  Dispatch_DTTM: Date;
  Threshold: string;
  Buyer: string;
  PO_Hdr_Created_Date: Date;
  SUM_MERCHANDISE_AMT: number;
}
