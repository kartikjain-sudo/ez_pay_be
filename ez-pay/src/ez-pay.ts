import { BigInt, ethereum, Bytes, log } from "@graphprotocol/graph-ts"
import {
  EzPay,
  ChangeRequested,
  ClaimTokens,
  CollateralWithdrawn,
  EMIPaid,
  Liquidated,
  LoanRequested,
  LoanTransferred as LoanTransferredEvent,
  RequestAccepted
} from "../generated/EzPay/EzPay"

import {
  Installment as InstallmentEntity,
  EMIDetails,
  Loan as LoanEntity,
  UnclaimedToken as UnclaimedTokenEntity,
  SemiApprovedRequest as SemiApprovedRequestEntity,
} from '../generated/schema';

export function handleLoanTransferred(event: LoanTransferredEvent): void {
  let loanId = event.transaction.hash.toHex();
  
  // Create or update Installment entity
  let installment = new InstallmentEntity(loanId);
  installment.lender = event.params.lender;
  installment.borrower = event.params.borrower;
  // Add more fields as needed
  
  // Create or update Loan entity
  let loan = new LoanEntity(loanId);
  loan.amountPaid = createEMIDetailsEntity(loanId).id;
  loan.completed = true; // Set based on your logic
  
  // Create or update UnclaimedToken entity
  let unclaimedToken = new UnclaimedTokenEntity(loanId);
  // Add more fields as needed
  
  // Create or update SemiApprovedRequest entity
  let semiApprovedRequest = new SemiApprovedRequestEntity(loanId);
  // Add more fields as needed
  
  // Save entities
  installment.save();
  loan.save();
  unclaimedToken.save();
  semiApprovedRequest.save();
}

function createEMIDetailsEntity(loanId: string): EMIDetails {
  let emiDetails = new EMIDetails(loanId);
  // Populate EMIDetails fields based on your logic
  return emiDetails;
}

export function handleChangeRequested(event: ChangeRequested): void {
}

export function handleClaimTokens(event: ClaimTokens): void {}

export function handleCollateralWithdrawn(event: CollateralWithdrawn): void {}

export function handleEMIPaid(event: EMIPaid): void {}

export function handleLiquidated(event: Liquidated): void {}

export function handleLoanRequested(event: LoanRequested): void {}

export function handleRequestAccepted(event: RequestAccepted): void {}
