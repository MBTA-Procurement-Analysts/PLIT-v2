export class Timeline {
    _id: string;
    PO_No: string;
    REQ_No: string;
    events: TimelineEvents;
}

export class TimelineEvents {
    ID: string;
    Start_DTTM: Date;
    EventType : string;
    Text : string;
    Internal : boolean;
    Neutral : boolean;
    Lifecycle : string;
    End_DTTM : Date;
}