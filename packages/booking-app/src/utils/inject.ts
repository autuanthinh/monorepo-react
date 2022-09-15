import { ComponentType } from 'react';

export default class Inject {
  static combineInjectionComponent<T>(injects: any[] = [], Component: ComponentType<T>): ComponentType<T> {
    let currentComponent = Component;
    for (let i = injects.length - 1; i >= 0; i--) {
      currentComponent = injects[i](currentComponent);
    }
    return currentComponent;
  }
}
