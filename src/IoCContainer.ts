import { Container } from "good-injector-vue";

export class ContainerWrapper {
    private mContainer: Container = new Container();

    public get Container(): Container {
        return this.mContainer;
    }

    public registerThings(): void {
        // this.Container.registerSingleton(UserService);
    }

    // public get FormsBuilderService(): FormsBuilderService {
    //     return this.Container.resolve(FormsBuilderService);
    // }
}

export const IoCContainer: ContainerWrapper = new ContainerWrapper();
