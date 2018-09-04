import GameObject from "@src/Game/GameObject";

export class Tool extends GameObject
{
    public strength!: number;    // 0 to 100%

    constructor() {
        super();
        this.strength = 1;
    }
    
    public use(damage: number): void {
        this.strength -= damage;
    }

    public destroyed(): boolean {
        return this.strength <= 0;
    }
}
