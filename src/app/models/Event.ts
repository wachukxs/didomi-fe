export interface ConsentChangeEvent {
  emailNotifications: boolean;
  smsNotifications: boolean;
  userId?: string; // should be complusory
  age?: string;
  id?: string;
  userEmail?: string; // should be complusory

  createdAt?: string;
}
