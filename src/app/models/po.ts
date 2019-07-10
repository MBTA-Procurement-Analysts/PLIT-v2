export class Po {
  _id: string;
  PO_No: string;
  Approved_By: string;
  Business_Unit: string;
  Buyer:string;
  Origin:string;
  PO_Date: Date;
  Status: string;
  Vendor_Name: string;
  lines: Lines;
  worklist: Worklist;
  }

export class Lines {
  Line_No: number;
  Mfg_Id:string;
  Mfg_Itm_Id: string;
  Quantity: number;
  Itm_No: string;
  Amount: number;
  Taxo_Lvl_1: string;
  Taxo_Lvl_2: string;
  Quote_Link:string;
  Description:string;
  Requisition: Requisition;
}

export class Requisition {
  Req_ID: string;
  Line_No: number;
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
