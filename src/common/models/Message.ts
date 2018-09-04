export class Message {
    public class?: MessageClass;
    public value?: string;
}

export enum MessageClass {
    Debug,
    Error,
    AgentMajor,
    AgentMinor
}
