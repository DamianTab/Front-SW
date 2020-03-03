import { SteeringState } from './steering-state';

export class WaterStats {
    steeringState: SteeringState;
    timestamp: string;
    valves: Valve[];
    containers: Container[];
    pumps: Pump[];
}

class Valve {
    valveId: number;
    valveOpen: boolean;
}

class Container {
    containerId: number;
    containerState: number;
}

class Pump {
    pumpId: number;
    pumpState: boolean;
}
