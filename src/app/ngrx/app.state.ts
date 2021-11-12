import { ConsentChangeEvent } from '../models/Event';

export interface EventState {
  readonly events: ConsentChangeEvent[];
  eventsV2?: ReadonlyArray<ConsentChangeEvent>;
  eventsV3?: Array<ConsentChangeEvent>;
}
