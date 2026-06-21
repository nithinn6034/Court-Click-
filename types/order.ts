// Domain types for the Certified True Copy management screen.
// Derived from the Court Click Figma (orders table + order details modal).

export type OrderStatus =
  | 'cancelled'
  | 'order_placed'
  | 'payment_completed'
  | 'completed';

export type SubscriptionStatus =
  | 'Subscription Pending'
  | 'Active'
  | 'Expired';

export interface OrderTag {
  id: string;
  label: string;
  color: string; // hex
}

// One row in the Certified True Copy table.
export interface Order {
  id: string;
  serial: number;
  customerName: string;       // USER INFO line 1 (bold)
  phone: string;              // USER INFO line 2
  orderRefs: string[];        // USER INFO order numbers
  courtComplex: string;       // e.g. "Court Complex, Kunnamkulam"
  courtSub: string;           // sub line, e.g. "Thrissur"
  product: string;            // e.g. "Judgement #584854"
  productPrice: string;       // e.g. "Rs.3,500"
  orderDate: string;          // e.g. "7 Feb 2026"
  orderDateTime: string;      // e.g. "12:57 PM"
  status: OrderStatus;
  ageInfo: string;            // e.g. "11 days since payment"
  subscription: SubscriptionStatus;
  tags: OrderTag[];
  clerk: string;              // clerk name OR empty (then show Assign)
  showAssign: boolean;        // true => show "Assign" button instead of name
}

// ---- Order Details modal ----

export interface CaseCustomerDetails {
  orderId: string;
  trackingId: string;
  paymentCompleted: string;
  orderPlaced: string;
  assigned: string;
  applied: string;
  dispatched: string;
  delivered: string;
  applicant: string;
  caseNumber: string;
  caseName: string;
  cnrNumber: string;
  courtEstablishment: string;
  documentType: string;
  orderNumber: string;
  orderDate: string;
}

export interface AddressDetails {
  pincode: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  country: string;
}

export interface ProductDetails {
  name: string;
  type: string;
  fileDate: string;
  file: string;
}

export interface EsignDocument {
  esignId: string;
  digioId: string;
  status: string;
  signedDocumentUrl: string;
  auditLogUrl: string;
}

export interface OrderDetails {
  caseCustomer: CaseCustomerDetails;
  address: AddressDetails;
  products: ProductDetails[];
  esignDocuments: EsignDocument[];
}

// ---- Filter panel ----

export interface FilterValues {
  district?: string;
  courtEstablishment?: string;
  product?: string;
  testUsers?: boolean;
}