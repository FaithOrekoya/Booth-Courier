export interface QuoteFormData {
  fullName: string;
  businessEmail: string;
  companyName: string;
  phoneNumber: string;
  originLocation: string;
  destinationLocation: string;
  freightType: 'port-drayage' | 'intermodal-rail' | 'first-last-mile' | 'ftl' | 'multi-modal';
  cargoType: 'standard-dry' | 'refrigerated' | 'flatbed-heavy' | 'hazmat' | 'consumer-goods';
  approxWeightLbs: number | string;
  dimensionsOrPallets: string;
  preferredDate: string;
  additionalDetails?: string;
  liftgateRequired?: boolean;
  appointmentRequired?: boolean;
  hazmatCertified?: boolean;
}

export interface QuoteValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof QuoteFormData, string>>;
}

export interface EstimatedRateResult {
  estimatedCostMin: number;
  estimatedCostMax: number;
  estimatedTransitDaysMin: number;
  estimatedTransitDaysMax: number;
  carbonReductionPercent: number;
  modeDescription: string;
}

/**
 * Validates the freight quotation request fields.
 */
export function validateQuoteForm(data: Partial<QuoteFormData>): QuoteValidationResult {
  const errors: Partial<Record<keyof QuoteFormData, string>> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full Name is required (minimum 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.businessEmail || !emailRegex.test(data.businessEmail.trim())) {
    errors.businessEmail = 'A valid business email address is required.';
  }

  if (!data.companyName || data.companyName.trim().length < 2) {
    errors.companyName = 'Company name is required.';
  }

  const cleanPhone = (data.phoneNumber || '').replace(/\D/g, '');
  if (!data.phoneNumber || cleanPhone.length < 10) {
    errors.phoneNumber = 'A valid 10-digit phone number is required.';
  }

  if (!data.originLocation || data.originLocation.trim().length < 3) {
    errors.originLocation = 'Origin/pickup location (City, State or Port Code) is required.';
  }

  if (!data.destinationLocation || data.destinationLocation.trim().length < 3) {
    errors.destinationLocation = 'Destination/delivery location is required.';
  }

  if (!data.freightType) {
    errors.freightType = 'Please select a primary freight service type.';
  }

  if (!data.cargoType) {
    errors.cargoType = 'Please select your cargo classification.';
  }

  const weightNum = Number(data.approxWeightLbs);
  if (isNaN(weightNum) || weightNum <= 0) {
    errors.approxWeightLbs = 'Valid gross cargo weight in lbs is required.';
  }

  if (!data.dimensionsOrPallets || data.dimensionsOrPallets.trim().length < 2) {
    errors.dimensionsOrPallets = 'Container size, pallet count, or dimensions are required.';
  }

  if (!data.preferredDate || data.preferredDate.trim().length < 6) {
    errors.preferredDate = 'Please select a preferred shipping or pickup date.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates an auditable Booth Courier Service reference identifier.
 */
export function generateQuoteReferenceId(prefix = 'BCS-Q'): string {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${timestamp}${randomPart}`;
}

/**
 * Calculates benchmark transit and rate estimate for logistics planning.
 */
export function calculateEstimatedRate(data: Partial<QuoteFormData>): EstimatedRateResult {
  const weight = Number(data.approxWeightLbs) || 20000;
  let baseRateMin = 850;
  let baseRateMax = 1450;
  let transitMin = 1;
  let transitMax = 3;
  let carbonReduction = 15;
  let modeDescription = 'Standard intermodal freight lane';

  switch (data.freightType) {
    case 'port-drayage':
      baseRateMin = 650;
      baseRateMax = 1150;
      transitMin = 1;
      transitMax = 2;
      carbonReduction = 20;
      modeDescription = 'Harbor drayage & container terminal interchange';
      break;
    case 'intermodal-rail':
      baseRateMin = 1400;
      baseRateMax = 2800;
      transitMin = 3;
      transitMax = 6;
      carbonReduction = 65; // Rail is up to 65% more carbon efficient
      modeDescription = 'Ramp-to-ramp domestic COFC container rail corridor';
      break;
    case 'first-last-mile':
      baseRateMin = 450;
      baseRateMax = 950;
      transitMin = 1;
      transitMax = 1;
      carbonReduction = 18;
      modeDescription = 'Direct distribution center to final mile cartage';
      break;
    case 'ftl':
      baseRateMin = 1600;
      baseRateMax = 3200;
      transitMin = 2;
      transitMax = 4;
      carbonReduction = 10;
      modeDescription = 'Dedicated full truckload point-to-point';
      break;
    case 'multi-modal':
    default:
      baseRateMin = 1750;
      baseRateMax = 3400;
      transitMin = 3;
      transitMax = 7;
      carbonReduction = 55;
      modeDescription = 'Integrated port drayage, rail corridor, and final mile delivery';
      break;
  }

  // Weight surcharges
  if (weight > 40000) {
    baseRateMin += 250;
    baseRateMax += 450;
  }

  // Cargo specific adjustments
  if (data.cargoType === 'refrigerated') {
    baseRateMin += 300;
    baseRateMax += 550;
    modeDescription += ' (GenSet / Temperature Controlled)';
  } else if (data.cargoType === 'hazmat') {
    baseRateMin += 400;
    baseRateMax += 700;
    modeDescription += ' (Hazmat Class Endorsed Dispatch)';
  }

  if (data.liftgateRequired) {
    baseRateMin += 75;
    baseRateMax += 120;
  }

  return {
    estimatedCostMin: Math.round(baseRateMin),
    estimatedCostMax: Math.round(baseRateMax),
    estimatedTransitDaysMin: transitMin,
    estimatedTransitDaysMax: transitMax,
    carbonReductionPercent: carbonReduction,
    modeDescription,
  };
}
