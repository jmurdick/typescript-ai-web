import GameObject from "@src/Game/GameObject";

export class SupplyPile extends GameObject
{
    public numTools!: number; // for mining ore and chopping logs
	public numLogs!: number; // makes firewood
	public numFirewood!: number; // what we want to make
	public numOre!: number; // makes tools
}
