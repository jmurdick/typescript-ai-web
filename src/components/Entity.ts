export default class Entity {
    public children!: Array<Entity>;
    public name: string = "Model";  
    
    public Entity() {
        this.children = new Array<Entity>();
    }
}
