import { User } from './user';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class StationState {
    steering_state: 'AU' | 'RM' | 'LM' | 'ID' | 'OF';
    manual_steering_user: null | User;
    timestamp: Timestamp<string>;
}