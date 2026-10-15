export type PilgrimStatus = "registered" | "confirmed" | "visa_pending" | "cancelled";
export type PaymentStatus = "paid" | "pending";

export type PilgrimPayment = {
  id: string;
  pilgrimId: string;
  amount: number;
  note?: string;
  paidAt: string;
  createdAt: string;
};

export type Pilgrim = {
  id: string;
  firstName: string;
  lastName: string;
  firstNameAr?: string;
  lastNameAr?: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  passportNumber: string;
  passportExpiry: string;
  passportIssueDate: string;
  passportIssuePlace: string;
  photoUrl?: string;
  passportImageUrl?: string;
  omraId: string;
  status: PilgrimStatus;
  emergencyContact: string;
  emergencyPhone: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  payments?: PilgrimPayment[];
  totalPaid?: number;
  omraPrice?: number;
  paymentStatus?: PaymentStatus;
  remaining?: number;
  omra?: {
    titleFr: string;
    departureDate: string;
    price: number;
    currency: string;
  };
};

export type UpsertPilgrimInput = Omit<
  Pilgrim,
  "id" | "createdAt" | "updatedAt" | "omra" | "payments" | "totalPaid" | "omraPrice" | "paymentStatus" | "remaining"
> & {
  id?: string;
};

export type CreatePaymentInput = {
  pilgrimId: string;
  amount: number;
  note?: string;
  paidAt?: string;
};
