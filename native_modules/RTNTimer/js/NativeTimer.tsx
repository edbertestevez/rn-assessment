import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  runNativeTimer(duration: number): Promise<string>;
}

export default TurboModuleRegistry.get<Spec>('RTNTimer') as Spec | null;
