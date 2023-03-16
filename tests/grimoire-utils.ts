import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  requestCreated,
  requestDeleted,
  requestFullfiled,
  transcriptCreated,
  transcriptDeleted,
  transcriptRevised,
  transcriptUpdated
} from "../generated/Grimoire/Grimoire"

export function createrequestCreatedEvent(
  request_id: Bytes,
  created_at: BigInt,
  last_updated_at: BigInt,
  creator: Address,
  fulfilled: boolean,
  original_media_metadata_uri: string,
  reference_source_media: string,
  metadata_uri: string
): requestCreated {
  let requestCreatedEvent = changetype<requestCreated>(newMockEvent())

  requestCreatedEvent.parameters = new Array()

  requestCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "request_id",
      ethereum.Value.fromFixedBytes(request_id)
    )
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "created_at",
      ethereum.Value.fromUnsignedBigInt(created_at)
    )
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "last_updated_at",
      ethereum.Value.fromUnsignedBigInt(last_updated_at)
    )
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam("fulfilled", ethereum.Value.fromBoolean(fulfilled))
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "original_media_metadata_uri",
      ethereum.Value.fromString(original_media_metadata_uri)
    )
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "reference_source_media",
      ethereum.Value.fromString(reference_source_media)
    )
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "metadata_uri",
      ethereum.Value.fromString(metadata_uri)
    )
  )

  return requestCreatedEvent
}

export function createrequestDeletedEvent(request_id: Bytes): requestDeleted {
  let requestDeletedEvent = changetype<requestDeleted>(newMockEvent())

  requestDeletedEvent.parameters = new Array()

  requestDeletedEvent.parameters.push(
    new ethereum.EventParam(
      "request_id",
      ethereum.Value.fromFixedBytes(request_id)
    )
  )

  return requestDeletedEvent
}

export function createrequestFullfiledEvent(
  request_id: Bytes
): requestFullfiled {
  let requestFullfiledEvent = changetype<requestFullfiled>(newMockEvent())

  requestFullfiledEvent.parameters = new Array()

  requestFullfiledEvent.parameters.push(
    new ethereum.EventParam(
      "request_id",
      ethereum.Value.fromFixedBytes(request_id)
    )
  )

  return requestFullfiledEvent
}

export function createtranscriptCreatedEvent(
  transcript_id: Bytes,
  created_at: BigInt,
  last_updated_at: BigInt,
  creator: Address,
  contributors: Array<Address>,
  revision_metadata_uris: Array<string>,
  reference_source_media: string,
  reference_source_media_metadata_uri: string,
  id_request: Bytes,
  communities: Array<Bytes>
): transcriptCreated {
  let transcriptCreatedEvent = changetype<transcriptCreated>(newMockEvent())

  transcriptCreatedEvent.parameters = new Array()

  transcriptCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "transcript_id",
      ethereum.Value.fromFixedBytes(transcript_id)
    )
  )
  transcriptCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "created_at",
      ethereum.Value.fromUnsignedBigInt(created_at)
    )
  )
  transcriptCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "last_updated_at",
      ethereum.Value.fromUnsignedBigInt(last_updated_at)
    )
  )
  transcriptCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  transcriptCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "contributors",
      ethereum.Value.fromAddressArray(contributors)
    )
  )
  transcriptCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "revision_metadata_uris",
      ethereum.Value.fromStringArray(revision_metadata_uris)
    )
  )
  transcriptCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "reference_source_media",
      ethereum.Value.fromString(reference_source_media)
    )
  )
  transcriptCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "reference_source_media_metadata_uri",
      ethereum.Value.fromString(reference_source_media_metadata_uri)
    )
  )
  transcriptCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "id_request",
      ethereum.Value.fromFixedBytes(id_request)
    )
  )
  transcriptCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "communities",
      ethereum.Value.fromFixedBytesArray(communities)
    )
  )

  return transcriptCreatedEvent
}

export function createtranscriptDeletedEvent(
  transcript_id: Bytes
): transcriptDeleted {
  let transcriptDeletedEvent = changetype<transcriptDeleted>(newMockEvent())

  transcriptDeletedEvent.parameters = new Array()

  transcriptDeletedEvent.parameters.push(
    new ethereum.EventParam(
      "transcript_id",
      ethereum.Value.fromFixedBytes(transcript_id)
    )
  )

  return transcriptDeletedEvent
}

export function createtranscriptRevisedEvent(
  transcript_id: Bytes,
  revision: string,
  creator: Address
): transcriptRevised {
  let transcriptRevisedEvent = changetype<transcriptRevised>(newMockEvent())

  transcriptRevisedEvent.parameters = new Array()

  transcriptRevisedEvent.parameters.push(
    new ethereum.EventParam(
      "transcript_id",
      ethereum.Value.fromFixedBytes(transcript_id)
    )
  )
  transcriptRevisedEvent.parameters.push(
    new ethereum.EventParam("revision", ethereum.Value.fromString(revision))
  )
  transcriptRevisedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )

  return transcriptRevisedEvent
}

export function createtranscriptUpdatedEvent(
  transcript_id: Bytes,
  last_updated_at: BigInt,
  contributors: Array<Address>,
  communities: Array<Bytes>,
  reference_source_media_metadata_uri: string
): transcriptUpdated {
  let transcriptUpdatedEvent = changetype<transcriptUpdated>(newMockEvent())

  transcriptUpdatedEvent.parameters = new Array()

  transcriptUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "transcript_id",
      ethereum.Value.fromFixedBytes(transcript_id)
    )
  )
  transcriptUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "last_updated_at",
      ethereum.Value.fromUnsignedBigInt(last_updated_at)
    )
  )
  transcriptUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "contributors",
      ethereum.Value.fromAddressArray(contributors)
    )
  )
  transcriptUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "communities",
      ethereum.Value.fromFixedBytesArray(communities)
    )
  )
  transcriptUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "reference_source_media_metadata_uri",
      ethereum.Value.fromString(reference_source_media_metadata_uri)
    )
  )

  return transcriptUpdatedEvent
}
