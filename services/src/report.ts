import { createClient, defaultExchanges } from "@urql/core";
import {
    Report,
    ReportDocument,
} from "../generated-src/graphql";

/**
 * Queries a GraphQL server looking for a specific notice
 * @param url URL of the GraphQL server
 * @param id ID of the notice
 * @returns The corresponding notice, returned as a full Notice object
 */
export const getReport = async (url: string, id: string): Promise<Report> => {
    // create GraphQL client to reader server
    const client = createClient({ url, exchanges: defaultExchanges, fetch });

    // query the GraphQL server for the notice
    console.log(`querying ${url} for notice "${id}"...`);

    const { data, error } = await client
        .query(ReportDocument, { id })
        .toPromise();

    if (data?.report) {
        return data.report as Report;
    } else {
        throw new Error(error?.message);
    }
};