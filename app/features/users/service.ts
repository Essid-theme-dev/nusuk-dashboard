import { initialUsers } from "./data";
import type { UpsertUserInput, User } from "./types";

export function seedUsers(): User[] {
  return initialUsers;
}

export function createUser(users: User[], input: UpsertUserInput): User[] {
  const email = input.email.trim().toLowerCase();
  const exists = users.some((item) => item.email.toLowerCase() === email);
  if (exists) return users;
  return [{ ...input, email, avatar: input.avatar || undefined }, ...users];
}

export function updateUser(users: User[], selectedEmail: string, input: UpsertUserInput): User[] {
  const email = input.email.trim().toLowerCase();
  const emailConflict = users.some(
    (item) => item.email.toLowerCase() === email && item.email !== selectedEmail,
  );
  if (emailConflict) return users;

  return users.map((item) =>
    item.email === selectedEmail
      ? { ...item, ...input, email, avatar: input.avatar || undefined }
      : item,
  );
}

export function deleteUser(users: User[], selectedEmail: string): User[] {
  return users.filter((item) => item.email !== selectedEmail);
}
