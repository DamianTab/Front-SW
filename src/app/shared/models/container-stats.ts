import { SteeringState } from './steering-state';
import { User } from './user';

/* tslint:disable */
export class ContainerStats {
  steering_state: SteeringState;
  manual_steering_user: null | User;
  timestamp: string;
}
