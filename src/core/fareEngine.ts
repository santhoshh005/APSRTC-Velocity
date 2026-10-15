import { Passenger, Seat, BusClass } from '../types';

export interface FareBreakup {
  baseFareTotal: number;
  seniorConcessionAmount: number;
  roundTripDiscountAmount: number;
  gstAmount: number;
  tollFeeAmount: number;
  finalPayable: number;
}

export function calculateFare(
  seats: Seat[],
  passengers: Passenger[],
  busClass: BusClass,
  isRoundTrip: boolean
): FareBreakup {
  if (seats.length === 0) {
    return {
      baseFareTotal: 0,
      seniorConcessionAmount: 0,
      roundTripDiscountAmount: 0,
      gstAmount: 0,
      tollFeeAmount: 0,
      finalPayable: 0
    };
  }

  // Base fare is the sum of selected seat prices
  const baseFareTotal = seats.reduce((sum, seat) => sum + seat.fare, 0);

  // Senior citizen concession (25% discount on base fare for eligible passengers)
  let seniorConcessionAmount = 0;
  passengers.forEach(p => {
    if (p.isSeniorCitizen || p.age >= 60) {
      seniorConcessionAmount += Math.round(p.fare * 0.25);
    }
  });

  // Round trip 10% discount on base fare
  let roundTripDiscountAmount = 0;
  if (isRoundTrip) {
    roundTripDiscountAmount = Math.round(baseFareTotal * 0.10);
  }

  const discountedBase = Math.max(0, baseFareTotal - seniorConcessionAmount - roundTripDiscountAmount);

  // GST (5% on AC buses, 0% on Non-AC)
  const isAc = busClass.includes('AC') || busClass.includes('VOLVO') || busClass.includes('GARUDA') || busClass.includes('INDRA');
  const gstAmount = isAc ? Math.round(discountedBase * 0.05) : 0;

  // Toll & Passenger Cess (Flat ₹15 per passenger)
  const tollFeeAmount = seats.length * 15;

  const finalPayable = discountedBase + gstAmount + tollFeeAmount;

  return {
    baseFareTotal,
    seniorConcessionAmount,
    roundTripDiscountAmount,
    gstAmount,
    tollFeeAmount,
    finalPayable
  };
}

export interface CancellationRefundEstimate {
  cancellationPercentage: number;
  deductionAmount: number;
  refundAmount: number;
  policyDescription: string;
}

export function calculateCancellationRefund(paidAmount: number, hoursBeforeDeparture: number): CancellationRefundEstimate {
  if (hoursBeforeDeparture > 24) {
    const deduction = Math.round(paidAmount * 0.10);
    return {
      cancellationPercentage: 10,
      deductionAmount: deduction,
      refundAmount: paidAmount - deduction,
      policyDescription: 'More than 24 hours prior to departure: 10% cancellation charge.'
    };
  } else if (hoursBeforeDeparture >= 12 && hoursBeforeDeparture <= 24) {
    const deduction = Math.round(paidAmount * 0.25);
    return {
      cancellationPercentage: 25,
      deductionAmount: deduction,
      refundAmount: paidAmount - deduction,
      policyDescription: 'Between 12 and 24 hours prior: 25% cancellation charge.'
    };
  } else if (hoursBeforeDeparture >= 2 && hoursBeforeDeparture < 12) {
    const deduction = Math.round(paidAmount * 0.50);
    return {
      cancellationPercentage: 50,
      deductionAmount: deduction,
      refundAmount: paidAmount - deduction,
      policyDescription: 'Between 2 and 12 hours prior: 50% cancellation charge.'
    };
  } else {
    return {
      cancellationPercentage: 100,
      deductionAmount: paidAmount,
      refundAmount: 0,
      policyDescription: 'Less than 2 hours before departure: No refund applicable.'
    };
  }
}
