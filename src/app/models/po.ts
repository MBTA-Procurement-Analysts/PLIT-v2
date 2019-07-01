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
