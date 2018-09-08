export interface IIsListener {
    isEnabled: boolean;
    start(): void;
    update(): void;
    reset(): void;
}
