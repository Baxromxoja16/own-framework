import { ComponentDecorator } from "./ComponentDecorator";

export interface Metadata {
   selector: string
   templateUrl: string
   styleUrls?: string[]
}

export function Component(config: Metadata): any {
   return function (constructor: any) {
      const decorator = new ComponentDecorator(config);
      return decorator.apply(constructor);
   };
}