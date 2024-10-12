import 'reflect-metadata';

export type Token<T> = { new(...args: any[]): T };

export class DIContainer {
    private static providers = new Map<Token<any>, any>();

    static register<T>(token: Token<T>, provider: { new (...args: any[]): T }): void {
        DIContainer.providers.set(token, provider);
    }

    static resolve<T>(token: Token<T>): T {
        const provider = DIContainer.providers.get(token);
        if (!provider) {
            throw new Error(`No provider found for: ${token}`);
        }
        return provider;
    }

    static resolveDependencies<T>(target: new (...args: any[]) => T): any[] {
        // Reflect metadata (if using reflection) or manually inspect constructor params
        const paramTypes = Reflect.getMetadata('design:paramtypes', target) || [];
        return paramTypes.map((param: any) => DIContainer.resolve(param));
    }
}