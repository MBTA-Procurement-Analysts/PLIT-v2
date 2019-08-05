export class TimelineEvent {
  ID: string;
  DTTM: Date;
  EventType: string;
  Internal: boolean;
  ExternalStatus: string;
  Lifecycle: string; // 'PO' or 'REQ'
}
