import { store, log, Bytes, DataSourceContext } from "@graphprotocol/graph-ts";

import {
  requestCreated as requestCreatedEvent,
  requestDeleted as requestDeletedEvent,
  transcriptCreated as transcriptCreatedEvent,
  transcriptDeleted as transcriptDeletedEvent,
  revisionCreated as revisionCreatedEvent,
  revisionStateChanged as revisionStateChangedEvent,
  requestStateUpdate as requestStateUpdateEvent,
  transcriptApproved as transcriptApprovedEvent
} from "../generated/Grimoire/Grimoire"
import {
  Transcription,
  Revision,
  Request
} from "../generated/schema"
import {GrimoireMetadataTemplate} from '../generated/templates';
export function handlerequestCreated(event: requestCreatedEvent): void {
  let request = Request.load(event.params.request_id.toHexString());
  if (request === null){
    request = new Request(event.params.request_id.toHexString());
    request.created_at = event.params.created_at
    request.last_updated_at = event.params.last_updated_at
    request.creator = event.params.creator
    request.receiving_transcripts = event.params.receiving_transcripts
    request.fulfilled = event.params.fulfilled
    request.metadata_uri = event.params.metadata_uri
    let context = new DataSourceContext();
    context.setString("setting", "request");
    GrimoireMetadataTemplate.createWithContext(event.params.metadata_uri, context)
    request.save()
  }

}
export function handlerequestDeleted(event: requestDeletedEvent): void {
  let id = event.params.request_id.toHexString();
  store.remove('Request', id);
}
export function handletranscriptCreated(event: transcriptCreatedEvent): void {
  let transcript = Transcription.load(event.params.transcript_id.toHexString());
  if (transcript === null ){
    transcript = new Transcription(event.params.transcript_id.toHexString());

    transcript.created_at = event.params.created_at
    transcript.last_updated_at = event.params.last_updated_at
    transcript.creator = event.params.creator
    transcript.contributors = event.params.contributors.map<Bytes>((a: Bytes) => a)
    transcript.revision_metadata_uris = event.params.revision_metadata_uris
    if (event.params.revision_metadata_uris.length != 0){
      transcript.revision_metadata_uris = event.params.revision_metadata_uris
    }
    else {
      transcript.revision_metadata_uris = []
    }
    transcript.id_request = event.params.id_request.toHexString()
    transcript.communities = event.params.communities
    transcript.save()
  }
}


export function handletranscriptDeleted(event: transcriptDeletedEvent): void {
  let id = event.params.transcript_id.toHexString();
  store.remove('Transcription', id);
}
export function handlerevisionStateChanged(event: revisionStateChangedEvent): void{
  let revision = Revision.load(event.params.id_revision.toHexString());
  if (revision){
    let state = revision.state;
  if (state === 1){
    revision.state = state;
    let transcript = Transcription.load(event.params.id_transcript.toHexString());
    if (transcript && transcript.revision_metadata_uris){ 
      let new_revision_uris = transcript.revision_metadata_uris
      new_revision_uris.push(event.params.id_revision.toHexString())
      transcript.revision_metadata_uris = new_revision_uris;
      transcript.save()
    }
  }
  else if (state === 2) {
    revision.state = event.params.state;
  }
  revision.save()
}
}

export function handlerevisionCreate(event: revisionCreatedEvent): void{
  let revision = Revision.load(event.params.id_revision.toHexString());
  if (revision === null ){
    revision = new Revision(event.params.id_revision.toHexString());

    revision.content_uri = event.params.content_uri
    revision.state = event.params.state
    revision.creator = event.params.creator
    revision.transcript_id = event.params.transcript_id.toHexString()
    let context = new DataSourceContext();
    context.setString("setting", "revision");
    GrimoireMetadataTemplate.createWithContext(event.params.content_uri, context)
    revision.save()
  }
}

export function handlerequestStateUpdated(event: requestStateUpdateEvent): void{
  let request = Request.load(event.params.request_id.toHexString());
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
export function handletranscriptApproved(event: transcriptApprovedEvent): void{
  let request = Request.load(event.params.request_id.toHexString());
  if (request){
    request.id_linked_transcription = event.params.transcript_id.toHexString();
  }
}