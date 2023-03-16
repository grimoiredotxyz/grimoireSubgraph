import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import { requestCreated } from "../generated/schema"
import { requestCreated as requestCreatedEvent } from "../generated/Grimoire/Grimoire"
import { handlerequestCreated } from "../src/grimoire"
import { createrequestCreatedEvent } from "./grimoire-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let request_id = Bytes.fromI32(1234567890)
    let created_at = BigInt.fromI32(234)
    let last_updated_at = BigInt.fromI32(234)
    let creator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let fulfilled = "boolean Not implemented"
    let original_media_metadata_uri = "Example string value"
    let reference_source_media = "Example string value"
    let metadata_uri = "Example string value"
    let newrequestCreatedEvent = createrequestCreatedEvent(
      request_id,
      created_at,
      last_updated_at,
      creator,
      fulfilled,
      original_media_metadata_uri,
      reference_source_media,
      metadata_uri
    )
    handlerequestCreated(newrequestCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("requestCreated created and stored", () => {
    assert.entityCount("requestCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "requestCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "request_id",
      "1234567890"
    )
    assert.fieldEquals(
      "requestCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "created_at",
      "234"
    )
    assert.fieldEquals(
      "requestCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "last_updated_at",
      "234"
    )
    assert.fieldEquals(
      "requestCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "requestCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fulfilled",
      "boolean Not implemented"
    )
    assert.fieldEquals(
      "requestCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "original_media_metadata_uri",
      "Example string value"
    )
    assert.fieldEquals(
      "requestCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "reference_source_media",
      "Example string value"
    )
    assert.fieldEquals(
      "requestCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "metadata_uri",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
