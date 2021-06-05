import 'egg';
import { EggPluginItem } from 'egg';

declare module 'egg' {
    export interface EggPlugin {
        redis?: EggPluginItem;
    }
}