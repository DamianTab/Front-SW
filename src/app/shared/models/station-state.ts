import { User } from './user';
import { SteeringState } from './steering-state';

/* tslint:disable */
export class StationState {
    steering_state: SteeringState;
    manual_steering_user: null | User;
    timestamp: string;
}
