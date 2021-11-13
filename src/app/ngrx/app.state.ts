import { ConsentChangeEvent } from '../models/Event';

// export type EventState = Array<ConsentChangeEvent>;
export interface EventState {
  perferences: Array<ConsentChangeEvent>;
  eventsV2?: ReadonlyArray<ConsentChangeEvent>;
  eventsV3?: Array<ConsentChangeEvent>;
}
