export type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
};

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  role: "customer" | "mover" | "admin";
};

export type SignInFormData = {
  email: string;
  password: string;
};

export type Review = {
  _id: string;
  rating: number;
  reviewText: string;
  userId: string;
  moverId: string;
  createdAt: string;
  __v: number;
};

export type Mover = {
  _id: string;
  companyLogo: string | null;
  businessName: string;
  serviceArea: string;
  services: string[];
  yearsInBusiness: number;
  description: string;
  businessAddress: string;
  businessRegistrationDocument: string;
  governmentIssuedIdFront: string;
  governmentIssuedIdBack: string;
  insuranceDocument: string;
  certifications: string;
  averageRating: number;
  ratingsCount: number;
  longitude: string;
  latitude: string;
  verified: boolean;
  reviews: Review[];
};

export type ImageData = {
  uri: string;
  name?: string | null;
  type: string | null;
};

export type DocumentData = {
  uri: string | null;
  name?: string | null;
  type: string | null;
};

export type MoverFormData = {
  businessName: string;
  serviceArea: string;
  description: string;
  businessAddress: string;
  companyLogo: ImageData;
  services: string[];
  businessRegistrationDocument: DocumentData;
  governmentIssuedIdFront: ImageData;
  governmentIssuedIdBack: ImageData;
  insuranceDocument?: DocumentData;
  longitude: number;
  latitude: number;
};

export type FormData = {
  businessName: string;
  serviceArea: string;
  description: string;
  businessAddress: string;
  companyLogo: string;
  services: string[];
  businessRegistrationDocument: string;
  governmentIssuedIdFront: string;
  governmentIssuedIdBack: string;
  insuranceDocument?: string;
};

export const Services = ["Full-Service", "Self-Service", "Specialized-Service"];

type ServiceType = {
  serviceType: "fullService" | "selfService";
  basePrice: number;
  chargePerKm: number;
};

export type PricingType = {
  services: ServiceType[];
};

export type BookingType = {
  _id: string;
  userId: string;
  currentHouse: string;
  currentHouseFloorNumber: string;
  currentHouseLocation: string;
  currentLocation: {
    place: string;
    latitude: number;
    longitude: number;
  };
  destinationHouseFloorNumber: string;
  destinationHouseLocation: string;
  destinationLocation: {
    place: string;
    latitude: number;
    longitude: number;
  };
  distance: number;
  finalPrice: number;
  formattedDate: string;
  formattedTime: string;
  moverId: string;
  nbRooms: string;
  service: string;
  status:
    | "pending"
    | "confirmed"
    | "canceled"
    | "paid"
    | "declined"
    | "completed"
    | "in-progress";
  specialInstructions: string;
  createdAt: string;
};
