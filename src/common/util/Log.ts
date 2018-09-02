﻿export function TODO(message: string, ...args: string[]): void {
    if (Log.EnableTodoLogging) {
        console.log("TODO:", message, ...args);
    }
}

export class Log {
    public static EnableTodoLogging: boolean = false;
}
