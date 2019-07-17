export class Bid {
  _id: string;
  Buyer: Buyer;
  Proj_Name: string;
  Req_ID: string;
  Fund_Code: string;
  Bid_Type: string;
  Timeframe: Date;
  Comments: string;
  Requested_Dttm: Date;
  Bid_ID: string;
  minimumAcceptanceDays: Number;
  performanceBond: Boolean;
  Proj_Descr: string;
  preBidConference: Boolean;
  PreBidDttm: Date;
  alternativebid: Boolean;
  deliveryAddress: string;
  deliveryTime: string;
  performanceGuaranteePercent: Number;
  performanceGuaranteeAmount: string;
  liquidatedDamages: Boolean;
  liquidatedDamagesConditions: string;
  liquidatedDamagesAmtPer: Number;
  liquidatedDamagesUOD: Number;
  maxLiquidatedDamages: Number;
  securityReqs: Boolean;
  row: Boolean;
  comments: string;
}

export class Buyer {
  username: string;
  fullname: string;
  email: string;
}
