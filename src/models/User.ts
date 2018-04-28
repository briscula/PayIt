export interface User {
  uid: string;
  displayName: string;
  email: string;
  fullName: string;
  photoURL: string;
  payday?: number;
  i18n?: string;
  fcmToken?: string;
}
