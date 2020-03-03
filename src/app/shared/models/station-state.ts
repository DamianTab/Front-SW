import { User } from './user';
import { SteeringState } from './steering-state';

export class StationState {
    steeringState: SteeringState;
    manualSteeringUser: null | User;
    timestamp: string;
}
