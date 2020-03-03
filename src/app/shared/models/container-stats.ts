import { SteeringState } from './steering-state';
import { User } from './user';

export class ContainerStats {
  steeringState: SteeringState;
  manualSteeringUser: null | User;
  timestamp: string;
}
