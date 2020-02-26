import { SteeringState } from './steering-state';

export class WaterStats {
    steering_state: SteeringState;
    timestamp: string;
    valves: Valve[] | Container[] | Pump[];
}

class Valve {
    valve_id: number;
    valve_open: boolean;
}

class Container {
    container_id: number;
    container_state: number;
}

class Pump {
    pump_id: number;
    pump_state: boolean;
}