import { Injectable, OpaqueToken } from '@angular/core';

export let LOGGER = new OpaqueToken('logger.service');

export interface ILogger {
    log(message: string): void;
}

@Injectable()
export class LoggerService implements ILogger {
    logs: string[] = [];

    log(message: string) {
        this.logs.push(message);
        console.log(message);
    }
}