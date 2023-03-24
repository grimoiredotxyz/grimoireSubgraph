import { Bytes, dataSource, log,json, JSONValue } from '@graphprotocol/graph-ts';
import { MetadataRevision as handleMetadataRevisions, MetadataRequest as handleRequestMetadata } from '../generated/schema';
export function handleMetadata(content: Bytes): void {
    if (content){
        const value = json.fromBytes(content).toObject();
        let context = dataSource.context();
        let type = context.getString('setting').toString()

        if (type){
        if (type.toString() == 'REVISION'){
          let newRevisionMetadata = new handleMetadataRevisions(dataSource.stringParam());
          log.info("I am now in REVISION {} , {}", [type.toString(), dataSource.stringParam()])

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
                log.info("source_media_uris {}", [source_media_uris.toString()])

                newRevisionMetadata.source_media_uris = source_media_uris.toString();
              }
              else {
                newRevisionMetadata.source_media_uris = "";
              }
              if (source_media_title) {
                log.info("source_media_title {}", [source_media_title.toString()])
                newRevisionMetadata.source_media_title = source_media_title.toString();
              }
              else {
                newRevisionMetadata.source_media_title = "";
              }
              if (title) {
                log.info("title {}", [title.toString()])
                newRevisionMetadata.title = title.toString();
              }
              else {
                newRevisionMetadata.title = "";
              }
              if (language) {
                log.info("language {}", [language.toString()])
                newRevisionMetadata.language = language.toString();
              }
              else {
                newRevisionMetadata.language = "";
              }
              if (keywords) {
                log.info("keywords {}", [keywords.toString()])
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
                log.info("change_description {}", [change_description.toString()])
                newRevisionMetadata.change_description = change_description.toString();
              }
              else {
                newRevisionMetadata.change_description = "";
              }
              if(notes){
                log.info("notes {}", [notes.toString()])
                newRevisionMetadata.notes = notes.toString();
              }
              else {
                newRevisionMetadata.notes = "";
              }
              if(transcription_plain_text){
                log.info("transcription_plain_text {}", [transcription_plain_text.toString()])
                newRevisionMetadata.transcription_plain_text = transcription_plain_text.toString();
              }
              else {
                newRevisionMetadata.transcription_plain_text = "";
              }
              if (srt_file_uri){
                log.info("srt_file_uri {}", [srt_file_uri.toString()])

                newRevisionMetadata.srt_file_uri = srt_file_uri.toString();
                newRevisionMetadata.vtt_file_uri = "";
                newRevisionMetadata.lrc_file_uri = "";
              }
              else if (vtt_file_uri){
                log.info("vtt_file_uri {}", [vtt_file_uri.toString()])
                newRevisionMetadata.srt_file_uri = "";
                newRevisionMetadata.vtt_file_uri = vtt_file_uri.toString();
                newRevisionMetadata.lrc_file_uri = "";
              }
              else if (lrc_file_uri){
                log.info("lrc_file_uri {}", [lrc_file_uri.toString()])
                newRevisionMetadata.srt_file_uri = "";
                newRevisionMetadata.vtt_file_uri = "";
                newRevisionMetadata.lrc_file_uri = lrc_file_uri.toString();
              }
              log.info("saving....", []);
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
}