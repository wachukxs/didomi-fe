export interface ConsentChangeEvent {
  key?: string;
  enabled: boolean;
  userId?: string; // should be complusory
  age?: string;
  id: string;
  userEmail?: string; // should be complusory

  createdAt?: string;
}
