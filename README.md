# GrimoireSubgraph
Subgraph written and deployed on the Graph for the hackathon project called Grimoire. The Grimoire subgraph enables querying of data transcriptions, revisions and requests and their created by the Grimoire smart contract and metadata of revisions and requests

## Pre-requisites

- Authenticate on The Graph hosted service and get your access token from your dashboard


## Get started
- Grab the ABI of the contract you want to create a subgraph for, and paste it in `./abi`

* `gh repo clone grimoiredotxyz/grimoireSubgraph`
* `npm install -g @graphprotocol/graph-cli`
* `npm install`
* `npm install @protofire/subgraph-toolkit`
* `graph codegen`
* `graph build`

## Event handlers
- **handlerequestCreated**: When a requestCreated event is emitted by the Grimoire smart contract. It creates a new Request entity in the graph database if one does not already exist with the specified ID. It populates the entity with information from the event, including the creator, receiving transcripts, and whether the request has been fulfilled. It also creates a new Grimoire metadata template based on the metadata_uri associated with the request.

- **handlerequestStateUpdated**: When a requestStateUpdate event is emitted by the Grimoire smart contract. It updates the fulfilled and/or receiving_transcripts properties of the Request entity with the specified ID to match the new values specified in the event.

- **handletranscriptApproved**: When transcriptApproved event is emitted by the Grimoire smart contract. It updates the id_linked_transcription property of the Request entity with the specified ID to match the ID of the approved transcript.

- **handlerevisionCreate**: This function is called whenever a revisionCreated event is emitted by the Grimoire smart contract. It creates a new Revision entity in the graph database if one does not already exist with the specified ID. It populates the entity with information from the event, including the creator, content URI, state, and the ID of the associated transcript. It also creates a new Grimoire metadata template based on the content URI associated with the revision.

- **handlerequestDeleted**: when a requestDeleted event is emitted by the Grimoire smart contract. It removes the Request entity with the specified ID from the graph database.

- **handletranscriptDeleted**: when a transcriptDeleted event is emitted by the Grimoire smart contract. It removes the Transcription entity with the specified ID from the graph database.

- **handletranscriptCreated**: When a transcriptCreated event is emitted by the Grimoire smart contract. It creates a new Transcription entity in the graph database if one does not already exist with the specified ID. It populates the entity with information from the event, including the creator, contributors, revision metadata URIs, communities, and the ID of the associated request.

- **handlerevisionStateChanged**: When a revisionCreated event is emitted by the Grimoire smart contract. It creates a new Revision entity in the graph database if one does not already exist with the specified ID. It populates the entity with information from the event, including the creator, content URI, state, and the ID of the associated transcript. It also creates a new Grimoire metadata template based on the content URI associated with the revision.

## Template handler
- **handleMetadata**: Called when handlers **handlerevisionCreate** or **handlerequestCreated** are used. It extracts the value of type from the dataSource.context() which is passed by the previously mentioned handlers and Depending on the value of type, the function either creates a new MetadataRevision entity or a new MetadataRequest entity using the respective entity schema generated by The Graph's code generation tool.

If type is 'REVISION', the function extracts the metadata values from the content parameter and assigns them to the newly created MetadataRevision entity. If type is not 'REVISION', the function creates a new MetadataRequest entity and assigns the metadata values to it.


## The graph hosted service
https://thegraph.com/hosted-service/subgraph/timotejgerzelj/grimoire-subgraph

## We found a bug after recording the video soo here is the old address we used for the demo and the new one after the demo
* Old: 0xD9f939e8eCD876Ca0908E8CE35C109161488E895
* New: 0xaCA5bbE605f528bb5D101abe352cA390E7E70d09

## License
This project is licensed under the GNU General Public License v3.0