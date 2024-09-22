import { $dataSystem } from 'rmmz-types';

export function sayHi(): void
{
    console.log(`Hello ${$dataSystem.gameTitle}!`);
}
