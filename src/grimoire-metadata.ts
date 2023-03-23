import { Bytes, dataSource, log,json } from '@graphprotocol/graph-ts';
import { MetadataRevision as handleMetadataRevisions, RequestMetadata as handleRequestMetadata } from '../generated/schema';
export function handleMetadataRevision(content: Bytes): void {
    log.info("Hello there", ["user"])
    if (content){
        const value = json.fromBytes(content).toObject();
        let context = dataSource.context();
        let type = context.getString("setting")
        if (type === "revision"){
          let newRevisionMetadata = new handleMetadataRevisions(dataSource.stringParam());

        if (value){
            let source_media_uris = value.get("source_media_uris"); 
            let source_media_title = value.get("source_media_title");
            let title = value.get("title");  
            let language = value.get("language"); 
            let keywords = value.get("keywords"); 
            
            let notes = value.get("notes"); 
            let change_type = value.get("change_type"); 
            let change_description = value.get("change_description"); 
            let transcription_plain_text = value.get("transcription_plain_text"); 
            let srt_file_uri = value.get("srt_file_uri"); 
            let vtt_file_uri = value.get("vtt_file_uri"); 
            let lrc_file_uri = value.get("lrc_file_uri"); 
              if (source_media_uris) {
                newRevisionMetadata.source_media_uris = source_media_uris.toString();
              }
              else {
                newRevisionMetadata.source_media_uris = "";
              }
              if (source_media_title) {
                newRevisionMetadata.source_media_title = source_media_title.toString();
              }
              else {
                newRevisionMetadata.source_media_title = "";
              }
              if (title) {
                newRevisionMetadata.title = title.toString();
              }
              else {
                newRevisionMetadata.title = "";
              }
              if (language) {
                newRevisionMetadata.language = language.toString();
              }
              else {
                newRevisionMetadata.language = "";
              }
              if (keywords) {
                newRevisionMetadata.keywords = keywords.toString();
              }
              else {
                newRevisionMetadata.keywords = "";
              }
              if (change_type) {
                newRevisionMetadata.change_type = change_type.toString();
              }
              else {
                newRevisionMetadata.change_type = "";
              }
              if (change_description) {
                newRevisionMetadata.change_description = change_description.toString();
              }
              else {
                newRevisionMetadata.change_description = "";
              }
              if(notes){
                newRevisionMetadata.notes = notes.toString();
              }
              else {
                newRevisionMetadata.notes = "";
              }
              if(transcription_plain_text){
                newRevisionMetadata.transcription_plain_text = transcription_plain_text.toString();
              }
              else {
                newRevisionMetadata.transcription_plain_text = "";
              }
              if (srt_file_uri){
                newRevisionMetadata.srt_file_uri = srt_file_uri.toString();
                newRevisionMetadata.vtt_file_uri = "";
                newRevisionMetadata.lrc_file_uri = "";
              }
              else if (vtt_file_uri){
                newRevisionMetadata.srt_file_uri = "";
                newRevisionMetadata.vtt_file_uri = vtt_file_uri.toString();
                newRevisionMetadata.lrc_file_uri = "";
              }
              else if (lrc_file_uri){
                newRevisionMetadata.srt_file_uri = "";
                newRevisionMetadata.vtt_file_uri = "";
                newRevisionMetadata.lrc_file_uri = lrc_file_uri.toString();
              }
              newRevisionMetadata.save();
        }

    }else {
      let newRequestMetadata = new handleRequestMetadata(dataSource.stringParam());

        if (value){
            let source_media_uris = value.get("source_media_uris"); 
            let source_media_title = value.get("source_media_title");
            let language = value.get("language"); 
            let keywords = value.get("keywords"); 
            
            let notes = value.get("notes"); 
              if (source_media_uris) {
                newRequestMetadata.source_media_uris = source_media_uris.toString();
              }
              else {
                newRequestMetadata.source_media_uris = "";
              }
              if (source_media_title) {
                newRequestMetadata.source_media_title = source_media_title.toString();
              }
              else {
                newRequestMetadata.source_media_title = "";
              }
              if (language) {
                newRequestMetadata.language = language.toString();
              }
              else {
                newRequestMetadata.language = "";
              }
              if (keywords) {
                newRequestMetadata.keywords = keywords.toString();
              }
              else {
                newRequestMetadata.keywords = "";
              }
              if(notes){
                newRequestMetadata.notes = notes.toString();
              }
              else {
                newRequestMetadata.notes = "";
              }

              newRequestMetadata.save();
        }
    }
  }
  
}