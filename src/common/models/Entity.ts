import { Guid } from "@src/common/types/Guid";
import { EventBus } from "@src/EventBus";
import { Message, MessageClass } from "@src/common/models/Message";

export default class Entity extends Object {
    public id: Guid;
    public name: string;  
    public children!: Array<Entity>;
    
    constructor() {
        super();
        this.id = Guid.newGuid();
        this.name = "Entity";
        this.children = new Array<Entity>();

        EventBus.$on("engine-ai-execute", this.onExecute);
    }

    protected onExecute(): void {
        console.debug("Got an event");
        const message = new Message();
        message.class = MessageClass.AgentMinor;
        message.value = `[${this.id.toString()}] Testing`;

        EventBus.$emit("engine-ai-message", message);
    }
}
