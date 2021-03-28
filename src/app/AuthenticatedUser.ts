export class AuthenticatedUser {
  id!: string;
  name!: string | null;
  profileImageUrl!: string | null;
  phoneNumber!: string | null;
  createdAt!: Date | null;
  lastSignInAt!: Date | null;
}
