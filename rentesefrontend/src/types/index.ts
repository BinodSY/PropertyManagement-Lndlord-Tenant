export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'LANDLORD' | 'TENANT';
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  rent: number;
  deposit: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: 'APARTMENT' | 'HOUSE' | 'CONDO' | 'STUDIO';
  amenities: string[];
  images: string[];
  available: boolean;
  landlordId: string;
  landlord?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  property?: Property;
  tenantId: string;
  tenant?: User;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  deposit: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  booking?: Booking;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  paymentType: 'RENT' | 'DEPOSIT' | 'MAINTENANCE';
  dueDate: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  role: 'LANDLORD' | 'TENANT';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: 'LANDLORD' | 'TENANT';
}