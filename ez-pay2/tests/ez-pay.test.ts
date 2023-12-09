import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { ChangeRequested } from "../generated/schema"
import { ChangeRequested as ChangeRequestedEvent } from "../generated/EzPay/EzPay"
import { handleChangeRequested } from "../src/ez-pay"
import { createChangeRequestedEvent } from "./ez-pay-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let lender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let borrower = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let id = Bytes.fromI32(1234567890)
    let notificationToLender = "boolean Not implemented"
    let newChangeRequestedEvent = createChangeRequestedEvent(
      lender,
      borrower,
      id,
      notificationToLender
    )
    handleChangeRequested(newChangeRequestedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ChangeRequested created and stored", () => {
    assert.entityCount("ChangeRequested", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ChangeRequested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "lender",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ChangeRequested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "borrower",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ChangeRequested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "notificationToLender",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})