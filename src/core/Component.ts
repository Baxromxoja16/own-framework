import { ComponentDecorator } from "./ComponentDecorator";

export function Component(config: { selector: string; templateUrl: string; styleUrls?: string[] }) {
   return function (constructor: any) {
      const decorator = new ComponentDecorator(config);
      return decorator.apply(constructor);
   };
}