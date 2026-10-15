export type Stat = {
  label: string;
  value: string;
  change: string;
};

export type RevenuePoint = {
  name: string;
  revenue: number;
};

export type UserRow = {
  name: string;
  email: string;
  status: "Active" | "Pending" | "Suspended";
};

export const stats: Stat[] = [
  { label: "Revenue", value: "$82,450", change: "+12.4%" },
  { label: "Users", value: "3,284", change: "+8.1%" },
  { label: "Orders", value: "1,209", change: "+5.6%" },
  { label: "Growth", value: "14.2%", change: "+2.3%" },
];

export const revenueData: RevenuePoint[] = [
  { name: "Jan", revenue: 12000 },
  { name: "Feb", revenue: 16800 },
  { name: "Mar", revenue: 14900 },
  { name: "Apr", revenue: 19200 },
  { name: "May", revenue: 22400 },
  { name: "Jun", revenue: 23800 },
  { name: "Jul", revenue: 26100 },
];

export const users: UserRow[] = [
  { name: "Ava Johnson", email: "ava.johnson@example.com", status: "Active" },
  { name: "Liam Carter", email: "liam.carter@example.com", status: "Pending" },
  { name: "Noah Smith", email: "noah.smith@example.com", status: "Active" },
  { name: "Emma Williams", email: "emma.williams@example.com", status: "Suspended" },
  { name: "Mason Brown", email: "mason.brown@example.com", status: "Active" },
  { name: "Sophia Davis", email: "sophia.davis@example.com", status: "Pending" },
  { name: "Lucas Miller", email: "lucas.miller@example.com", status: "Active" },
  { name: "Isabella Wilson", email: "isabella.wilson@example.com", status: "Suspended" },
  { name: "Ethan Moore", email: "ethan.moore@example.com", status: "Active" },
  { name: "Mia Taylor", email: "mia.taylor@example.com", status: "Pending" },
];
