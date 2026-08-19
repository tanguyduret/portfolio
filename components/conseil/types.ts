export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  company: string;
  activity: string;
  city: string;
  email: string;
  phone: string;
  need: string;
  message: string;
}
