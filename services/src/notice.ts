import { createClient, defaultExchanges } from "@urql/core";
import {
    Notice,
    NoticeDocument,
} from "../generated-src/graphql";

import {ethers} from "ethers";

/**
 * Queries a GraphQL server looking for a specific notice
 * @param url URL of the GraphQL server
 * @param id ID of the notice
 * @returns The corresponding notice, returned as a full Notice object
 */
export const getNotice = async (url: string, id: string): Promise<Notice> => {
    // create GraphQL client to reader server
    const client = createClient({ url, exchanges: defaultExchanges, fetch });

    // query the GraphQL server for the notice
    console.log(`querying ${url} for notice "${id}"...`);

    const { data, error } = await client
        .query(NoticeDocument, { id })
        .toPromise();

    if (data?.notice) {
        return data.notice as Notice;
    } else {
        throw new Error(error?.message);
    }
};

export const parsePayload = (payload: string) => {
    const data = JSON.parse(ethers.toUtf8String(payload));

    const parsedData: {
        "media_cid": string,
        "descriptor_rawdata": string,
        "descriptor_data": {
            "name": string,
            "description": string,
            "image": string,
            "attributes": Array<{
                "trait_type": string,
                "value": string
            }>
        },
        "descriptor_cid": string,
    } = {
        "media_cid": data.media_cid,
        "descriptor_rawdata": data.descriptor_data,
        "descriptor_data": JSON.parse(data.descriptor_data),
        "descriptor_cid": data.descriptor_cid,
    };
    return parsedData;
}