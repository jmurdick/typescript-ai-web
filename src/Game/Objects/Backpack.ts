import GameObject from "@src/Game/GameObject";

export class Backpack extends GameObject
{
    public tool!: GameObject;
    public numLogs!: number;
    public numFirewood!: number;
    public numOre!: number;
    public toolType: string = "ToolAxe";
}
