import { ipfs, store, log, json, Bytes, JSONValue} from "@graphprotocol/graph-ts";

import {
  requestCreated as requestCreatedEvent,
  requestDeleted as requestDeletedEvent,
  transcriptCreated as transcriptCreatedEvent,
  transcriptDeleted as transcriptDeletedEvent,
  revisionCreated as revisionCreatedEvent,
  revisionStateChanged as revisionStateChangedEvent,
  requestStateUpdate as requestStateUpdateEvent
} from "../generated/Grimoire/Grimoire"
import {
  Transcription,
  Revision,
  Request
} from "../generated/schema"

export function handlerequestCreated(event: requestCreatedEvent): void {
  let request = Request.load(event.params.request_id.toHex());
  if (request === null ){
    request = new Request(event.params.request_id.toHex());
    request.created_at = event.params.created_at
    request.last_updated_at = event.params.last_updated_at
    request.creator = event.params.creator
    request.fulfilled = event.params.fulfilled
    request.original_media_metadata_uri = event.params.original_media_metadata_uri
    request.reference_source_media = event.params.reference_source_media
    request.metadata_uri = event.params.metadata_uri
    request.save()

  }
}
export function handlerequestDeleted(event: requestDeletedEvent): void {
  let id = event.params.request_id.toHex();
  store.remove('Request', id);
}
export function handletranscriptCreated(event: transcriptCreatedEvent): void {
  let transcript = Transcription.load(event.params.transcript_id.toHex());
  if (transcript === null ){
    transcript = new Transcription(event.params.transcript_id.toHex());

    transcript.created_at = event.params.created_at
    transcript.last_updated_at = event.params.last_updated_at
    transcript.creator = event.params.creator
    transcript.contributors = event.params.contributors.map<Bytes>((a: Bytes) => a)
    transcript.revision_metadata_uris = event.params.revision_metadata_uris
    transcript.id_request = event.params.id_request.toString()
    transcript.communities = event.params.communities
    transcript.save()
  }
}


/*
export function handlerequestFullfiled(event: requestFullfiledEvent): void {
  let entity = new Request(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.request_id = event.params.request_id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
*/
export function handletranscriptDeleted(event: transcriptDeletedEvent): void {
  let id = event.params.transcript_id.toHex();
  store.remove('Transcript', id);
}
export function handlerevisionStateChanged(event: revisionStateChangedEvent): void{
  let revision = Revision.load(event.params.id_revision.toHex());
  let state = event.params.state;
  if (revision){
  if (state === 1){
    revision.state = state;
    let transcript = Transcription.load(event.params.id_transcript.toHex());
    if (transcript){
    }
  }
  else if (state === 2) {
    revision.state;
  }
}
}

export function handlerevisionCreate(event: revisionCreatedEvent): void{
  let revision = Revision.load(event.params.id_revision.toHex());
  if (revision === null ){
    revision = new Revision(event.params.id_revision.toHex());

    revision.content_uri = event.params.content_uri
    revision.state = event.params.state
    revision.creator = event.params.creator
    revision.transcript_id = event.params.transcript_id.toString()
    revision.save()
  }
}

export function handlerequestStateUpdated(event: requestStateUpdateEvent): void{
  let request = Request.load(event.params.request_id.toHex());
  if (request){
    if (event.params.fulfilled != request.fulfilled){
      request.fulfilled = event.params.fulfilled;
    }
    if (event.params.receiving_transcripts != request.receiving_transcripts){
      request.receiving_transcripts = event.params.receiving_transcripts;
    }
    request.save();
  }
}