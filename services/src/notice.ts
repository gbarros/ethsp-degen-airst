import { createClient, defaultExchanges } from "@urql/core";
import {
    Notice,
    NoticeDocument,
} from "../generated-src/graphql";

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