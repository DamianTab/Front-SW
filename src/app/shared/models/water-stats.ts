export class WaterStats {
    valves: Valve[];
    pumps: Pump[];
}

class Valve {
    valve_id: number;
    valve_open: boolean;
}

class Pump {
    pump_id: number;
    pump_state: boolean;
}