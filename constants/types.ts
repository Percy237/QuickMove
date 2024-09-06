export type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
};

export type SignInFormData = {
  email: string;
  password: string;
};

export type Mover = {
  _id: string;
  companyLogo: string | null;
  businessName: string;
  serviceArea: string;
  services: string[];
  yearsInBusiness: number;
  rating: number;
  description: string;
  businessAddress: string;
  businessRegistrationDocument: string;
  governmentIssuedIdFront: string;
  governmentIssuedIdBack: string;
  insuranceDocument: string;
  certifications: string;
  verified: boolean;
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
