import { dependency } from "@foal/core";
import { StateWorker } from "./state.worker";

export class WorkerManager {
    @dependency
    stateWorker: StateWorker;

    start() {
        this.stateWorker.start();
    }
}