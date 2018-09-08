import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import { GridMapDiagonalMoves } from "@src/Game/Pathfinding/Grid/GridMapDiagonalMoves";
import Config from "../../config";

import { EventBus } from "@src/EventBus";
import { GameObject } from "@src/Game/GameObject";

@Component
export default class Engine extends Vue {
    @Getter("getObjects") public GameObjects!: GameObject[];

    public grid: GridMapDiagonalMoves | undefined;

    constructor() {
        super();
        this.grid = new GridMapDiagonalMoves();

        setInterval(() => {
            EventBus.$emit("on-game-tick");
        }, Config.gameTickInterval);
    }
}

// TODO EVent System https://github.com/KeesCBakker/Strongly-Typed-Events-for-TypeScript/blob/master/documentation/HowToAddAnEventToAClass.md

// let clock = new Clock("Smu", 1000);

// //log the ticks to the console
// clock.onTick.subscribe(() => console.log("Tick!"));

// //log the sequence parameter to the console
// clock.onSequenceTick.subscribe(s => console.log(`Sequence: ${s}`));

// //log the name of the clock and the tick argument to the console
// clock.onClockTick.subscribe((c, n) =>
//   console.log(`${c.name} ticked ${n} times.`)
// );