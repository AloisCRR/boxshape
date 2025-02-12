/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n\t\t\tquery Clients {\n\t\t\t\tclients {\n\t\t\t\t\tname\n\t\t\t\t\temail\n\t\t\t\t\tphone\n\t\t\t\t\tid\n\t\t\t\t\tcreated\n\t\t\t\t\tupdated\n\t\t\t\t}\n\t\t\t}\n\t\t": types.ClientsDocument,
    "\n\t\t\tquery Client($id: String!) {\n\t\t\t\tclient(id: $id) {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\temail\n\t\t\t\t\tphone\n\t\t\t\t\taddress\n\t\t\t\t\tcreated\n\t\t\t\t\tupdated\n\t\t\t\t}\n\t\t\t}\n\t\t": types.ClientDocument,
    "\n\t\t\tmutation CreateClient($input: CreateClientInput!) {\n\t\t\t\tcreateClient(input: $input) {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\temail\n\t\t\t\t\tcreated\n\t\t\t\t\tupdated\n\t\t\t\t}\n\t\t\t}\n\t\t": types.CreateClientDocument,
    "\n\t\t\tquery Invoices {\n\t\t\t\tinvoices {\n\t\t\t\t\tid\n\t\t\t\t\tcreated\n\t\t\t\t\tupdated\n\t\t\t\t\tclientId\n\t\t\t\t\tstatus {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t": types.InvoicesDocument,
    "\n\t\t\tquery Invoice($id: String!) {\n\t\t\t\tinvoice(id: $id) {\n\t\t\t\t\tid\n\t\t\t\t\tcreated\n\t\t\t\t\tupdated\n\t\t\t\t\tclientId\n\t\t\t\t\tstatus {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t": types.InvoiceDocument,
    "\n\t\t\tquery InvoicesOfClient($clientId: String!) {\n\t\t\t\tinvoicesByClient(clientId: $clientId) {\n\t\t\t\t\tid\n\t\t\t\t\tclientId\n\t\t\t\t\tstatus {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t": types.InvoicesOfClientDocument,
    "\n\t\t\tmutation CreateInvoice($input: CreateInvoiceInput!) {\n\t\t\t\tcreateInvoice(input: $input) {\n\t\t\t\t\tid\n\t\t\t\t\tcreated\n\t\t\t\t\tupdated\n\t\t\t\t\tclientId\n\t\t\t\t\tstatus {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t": types.CreateInvoiceDocument,
    "\n\t\t\tmutation UpdateInvoice($id: String!, $input: UpdateInvoiceInput!) {\n\t\t\t\tupdateInvoice(id: $id, input: $input) {\n\t\t\t\t\tid\n\t\t\t\t\tupdated\n\t\t\t\t\tclientId\n\t\t\t\t\tstatus {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t": types.UpdateInvoiceDocument,
    "\n\t\t\tmutation CreateInvoiceItem($input: CreateInvoiceItemInput!) {\n\t\t\t\tcreateInvoiceItem(input: $input) {\n\t\t\t\t\tid\n\t\t\t\t\tinvoiceNumber\n\t\t\t\t\tshipmentId\n\t\t\t\t\ttrackingCode\n\t\t\t\t\tdescription\n\t\t\t\t\tamount\n\t\t\t\t}\n\t\t\t}\n\t\t": types.CreateInvoiceItemDocument,
    "\n\t\t\tmutation UpdateInvoiceItem($id: ID!, $input: UpdateInvoiceItemInput!) {\n\t\t\t\tupdateInvoiceItem(id: $id, input: $input) {\n\t\t\t\t\tid\n\t\t\t\t\tinvoiceNumber\n\t\t\t\t\tamount\n\t\t\t\t\ttrackingCode\n\t\t\t\t\tshipmentId\n\t\t\t\t}\n\t\t\t}\n\t\t": types.UpdateInvoiceItemDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tquery Clients {\n\t\t\t\tclients {\n\t\t\t\t\tname\n\t\t\t\t\temail\n\t\t\t\t\tphone\n\t\t\t\t\tid\n\t\t\t\t\tcreated\n\t\t\t\t\tupdated\n\t\t\t\t}\n\t\t\t}\n\t\t"): typeof import('./graphql').ClientsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tquery Client($id: String!) {\n\t\t\t\tclient(id: $id) {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\temail\n\t\t\t\t\tphone\n\t\t\t\t\taddress\n\t\t\t\t\tcreated\n\t\t\t\t\tupdated\n\t\t\t\t}\n\t\t\t}\n\t\t"): typeof import('./graphql').ClientDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tmutation CreateClient($input: CreateClientInput!) {\n\t\t\t\tcreateClient(input: $input) {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\temail\n\t\t\t\t\tcreated\n\t\t\t\t\tupdated\n\t\t\t\t}\n\t\t\t}\n\t\t"): typeof import('./graphql').CreateClientDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tquery Invoices {\n\t\t\t\tinvoices {\n\t\t\t\t\tid\n\t\t\t\t\tcreated\n\t\t\t\t\tupdated\n\t\t\t\t\tclientId\n\t\t\t\t\tstatus {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t"): typeof import('./graphql').InvoicesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tquery Invoice($id: String!) {\n\t\t\t\tinvoice(id: $id) {\n\t\t\t\t\tid\n\t\t\t\t\tcreated\n\t\t\t\t\tupdated\n\t\t\t\t\tclientId\n\t\t\t\t\tstatus {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t"): typeof import('./graphql').InvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tquery InvoicesOfClient($clientId: String!) {\n\t\t\t\tinvoicesByClient(clientId: $clientId) {\n\t\t\t\t\tid\n\t\t\t\t\tclientId\n\t\t\t\t\tstatus {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t"): typeof import('./graphql').InvoicesOfClientDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tmutation CreateInvoice($input: CreateInvoiceInput!) {\n\t\t\t\tcreateInvoice(input: $input) {\n\t\t\t\t\tid\n\t\t\t\t\tcreated\n\t\t\t\t\tupdated\n\t\t\t\t\tclientId\n\t\t\t\t\tstatus {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t"): typeof import('./graphql').CreateInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tmutation UpdateInvoice($id: String!, $input: UpdateInvoiceInput!) {\n\t\t\t\tupdateInvoice(id: $id, input: $input) {\n\t\t\t\t\tid\n\t\t\t\t\tupdated\n\t\t\t\t\tclientId\n\t\t\t\t\tstatus {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t"): typeof import('./graphql').UpdateInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tmutation CreateInvoiceItem($input: CreateInvoiceItemInput!) {\n\t\t\t\tcreateInvoiceItem(input: $input) {\n\t\t\t\t\tid\n\t\t\t\t\tinvoiceNumber\n\t\t\t\t\tshipmentId\n\t\t\t\t\ttrackingCode\n\t\t\t\t\tdescription\n\t\t\t\t\tamount\n\t\t\t\t}\n\t\t\t}\n\t\t"): typeof import('./graphql').CreateInvoiceItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tmutation UpdateInvoiceItem($id: ID!, $input: UpdateInvoiceItemInput!) {\n\t\t\t\tupdateInvoiceItem(id: $id, input: $input) {\n\t\t\t\t\tid\n\t\t\t\t\tinvoiceNumber\n\t\t\t\t\tamount\n\t\t\t\t\ttrackingCode\n\t\t\t\t\tshipmentId\n\t\t\t\t}\n\t\t\t}\n\t\t"): typeof import('./graphql').UpdateInvoiceItemDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
