import {TableClient, odata} from '@azure/data-tables';

const CONN_STR = "AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;";
const tableName = "goods";

const tableClient = TableClient.fromConnectionString(CONN_STR, tableName, {allowInsecureConnection: true});

export const getAll = async (req, res) => {
    const result = [];
    const entitiesIter = tableClient.listEntities();
    for await (const entity of entitiesIter) {
        result.push(entity);
    }
    console.log(result);
    res.status(200).json(result);
}
export const getAllInOneCategory = async (req, res) => {
    const result = [];
    const entitiesIter = tableClient.listEntities({
        queryOptions: { filter: odata`PartitionKey eq ${req.params.partitionKey}` }
    });
    for await (const entity of entitiesIter) {
        result.push(entity);
    }
    res.status(200).json(result);
}