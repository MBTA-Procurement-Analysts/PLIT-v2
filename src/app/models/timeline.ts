export class Timeline {
    _id: string;
    PO_No: string;
    REQ_No: string;
    Business_Unit: string;
    Complicated: string;
    Footnote: string;
    events: TimelineEvent[];
}

export class TimelineEvent {
    ID: string;
    Start_DTTM: Date;
    EventType : string;
    Text : string;
    Person: string;
    Internal : boolean;
    Neutral : boolean;
    Auto: boolean;
    Lifecycle : string;
    End_DTTM : Date;
}
