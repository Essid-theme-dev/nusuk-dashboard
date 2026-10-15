export type UserStatus = "Active" | "Pending" | "Suspended";

export type User = {
  name: string;
  email: string;
  status: UserStatus;
  avatar?: string;
};

export type UpsertUserInput = {
  name: string;
  email: string;
  status: UserStatus;
  avatar?: string;
};
