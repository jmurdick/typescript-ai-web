import { GridMapDiagonalMoves } from "@src/Game/Pathfinding/Grid/GridMapDiagonalMoves";
import Config from "../../config";
import { EventBus } from "@src/EventBus";
import { Message } from "@src/common/models/Message";
import Store from "@src/store/Store";

export default class Engine {
    public grid: GridMapDiagonalMoves | undefined;
    
    constructor() {
        this.grid = new GridMapDiagonalMoves();

        setInterval(() => {
            EventBus.$on("engine-ai-message", this.onAgentMessage);
        }, Config.aiEventInterval);
        
    }

    private onAgentMessage(message: Message): void {
        console.debug(`Message ${message.value}`);
        Store.dispatch("addMessage", message);
    }
}