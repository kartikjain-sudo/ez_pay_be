import { BigInt } from "@graphprotocol/graph-ts"
import {
  EzPay,
  ChangeRequested,
  ClaimTokens,
  CollateralWithdrawn,
  EMIPaid,
  Liquidated,
  LoanRequested,
  LoanTransferred,
  RequestAccepted
} from "../generated/EzPay/EzPay"
import { ExampleEntity } from "../generated/schema"

export function handleChangeRequested(event: ChangeRequested): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from)

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.lender = event.params.lender
  entity.borrower = event.params.borrower

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.amountPaid(...)
  // - contract.changes(...)
  // - contract.finalApproval(...)
  // - contract.installments(...)
  // - contract.interestedUsers(...)
  // - contract.loanGiven(...)
  // - contract.loans(...)
  // - contract.repliesToUsers(...)
  // - contract.requests(...)
  // - contract.unclaimedTokens(...)
  // - contract.userLoans(...)
}

export function handleClaimTokens(event: ClaimTokens): void {}

export function handleCollateralWithdrawn(event: CollateralWithdrawn): void {}

export function handleEMIPaid(event: EMIPaid): void {}

export function handleLiquidated(event: Liquidated): void {}

export function handleLoanRequested(event: LoanRequested): void {}

export function handleLoanTransferred(event: LoanTransferred): void {}

export function handleRequestAccepted(event: RequestAccepted): void {}