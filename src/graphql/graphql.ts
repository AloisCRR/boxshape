/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

/** Client of the business */
export type ClientModel = {
  __typename?: 'ClientModel';
  address?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  updated: Scalars['DateTime']['output'];
};

export type CreateClientInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type CreateInvoiceInput = {
  clientId: Scalars['ID']['input'];
  statusId: Scalars['ID']['input'];
};

export type CreateInvoiceItemInput = {
  amount: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  invoiceNumber: Scalars['String']['input'];
  shipmentId: Scalars['ID']['input'];
  trackingCode: Scalars['String']['input'];
};

export type CreateShipmentInput = {
  clientId: Scalars['ID']['input'];
  poBoxNumber?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  shipmentTypeId: Scalars['ID']['input'];
  unit: Scalars['String']['input'];
};

/** Invoice Item */
export type InvoiceItemModel = {
  __typename?: 'InvoiceItemModel';
  amount: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invoice?: Maybe<InvoiceModel>;
  invoiceNumber: Scalars['String']['output'];
  shipment?: Maybe<ShipmentModel>;
  shipmentId: Scalars['ID']['output'];
  trackingCode: Scalars['String']['output'];
};

/** Invoice */
export type InvoiceModel = {
  __typename?: 'InvoiceModel';
  client?: Maybe<ClientModel>;
  clientId: Scalars['ID']['output'];
  created: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  number: Scalars['String']['output'];
  status?: Maybe<InvoiceStatusModel>;
  statusId: Scalars['ID']['output'];
  updated: Scalars['DateTime']['output'];
};

/** Invoice Status */
export type InvoiceStatusModel = {
  __typename?: 'InvoiceStatusModel';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClient: ClientModel;
  createInvoice: InvoiceModel;
  createInvoiceItem: InvoiceItemModel;
  createShipment: ShipmentModel;
  updateInvoice: InvoiceModel;
  updateInvoiceItem: InvoiceItemModel;
  updateShipment: ShipmentModel;
};


export type MutationCreateClientArgs = {
  input: CreateClientInput;
};


export type MutationCreateInvoiceArgs = {
  input: CreateInvoiceInput;
};


export type MutationCreateInvoiceItemArgs = {
  input: CreateInvoiceItemInput;
};


export type MutationCreateShipmentArgs = {
  input: CreateShipmentInput;
};


export type MutationUpdateInvoiceArgs = {
  id: Scalars['String']['input'];
  input: UpdateInvoiceInput;
};


export type MutationUpdateInvoiceItemArgs = {
  id: Scalars['ID']['input'];
  input: UpdateInvoiceItemInput;
};


export type MutationUpdateShipmentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateShipmentInput;
};

export type Query = {
  __typename?: 'Query';
  client: ClientModel;
  clients: Array<ClientModel>;
  invoice: InvoiceModel;
  invoiceItems: Array<InvoiceItemModel>;
  invoiceItemsWithShipment: Array<InvoiceItemModel>;
  invoices: Array<InvoiceModel>;
  invoicesByClient: Array<InvoiceModel>;
  shipment: ShipmentModel;
  shipments: Array<ShipmentModel>;
  shipmentsOfClient: Array<ShipmentModel>;
  shipmentsWithClient: Array<ShipmentModel>;
};


export type QueryClientArgs = {
  id: Scalars['String']['input'];
};


export type QueryInvoiceArgs = {
  id: Scalars['String']['input'];
};


export type QueryInvoiceItemsArgs = {
  invoiceNumber: Scalars['String']['input'];
};


export type QueryInvoiceItemsWithShipmentArgs = {
  invoiceNumber: Scalars['String']['input'];
};


export type QueryInvoicesByClientArgs = {
  clientId: Scalars['String']['input'];
};


export type QueryShipmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryShipmentsOfClientArgs = {
  clientId: Scalars['ID']['input'];
};

/** Shipment */
export type ShipmentModel = {
  __typename?: 'ShipmentModel';
  client?: Maybe<ClientModel>;
  clientId: Scalars['ID']['output'];
  created: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  poBoxNumber?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  shipmentType?: Maybe<ShipmentTypeModel>;
  shipmentTypeId: Scalars['ID']['output'];
  unit: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
};

/** Shipment Type */
export type ShipmentTypeModel = {
  __typename?: 'ShipmentTypeModel';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type UpdateInvoiceInput = {
  clientId?: InputMaybe<Scalars['ID']['input']>;
  created?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  statusId?: InputMaybe<Scalars['ID']['input']>;
  updated?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateInvoiceItemInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  invoiceNumber?: InputMaybe<Scalars['String']['input']>;
  shipmentId?: InputMaybe<Scalars['ID']['input']>;
  trackingCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateShipmentInput = {
  clientId?: InputMaybe<Scalars['ID']['input']>;
  poBoxNumber?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  shipmentTypeId?: InputMaybe<Scalars['ID']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type ClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'ClientModel', name: string, email: string, phone?: string | null, id: string, created: any, updated: any }> };

export type ClientQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ClientQuery = { __typename?: 'Query', client: { __typename?: 'ClientModel', id: string, name: string, email: string, phone?: string | null, address?: string | null, created: any, updated: any } };

export type CreateClientMutationVariables = Exact<{
  input: CreateClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'ClientModel', id: string, name: string, email: string, created: any, updated: any } };

export type InvoicesQueryVariables = Exact<{ [key: string]: never; }>;


export type InvoicesQuery = { __typename?: 'Query', invoices: Array<{ __typename?: 'InvoiceModel', id: string, created: any, updated: any, clientId: string, status?: { __typename?: 'InvoiceStatusModel', name: string } | null }> };

export type InvoiceQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type InvoiceQuery = { __typename?: 'Query', invoice: { __typename?: 'InvoiceModel', id: string, created: any, updated: any, clientId: string, status?: { __typename?: 'InvoiceStatusModel', name: string } | null } };

export type InvoicesOfClientQueryVariables = Exact<{
  clientId: Scalars['String']['input'];
}>;


export type InvoicesOfClientQuery = { __typename?: 'Query', invoicesByClient: Array<{ __typename?: 'InvoiceModel', id: string, clientId: string, status?: { __typename?: 'InvoiceStatusModel', name: string } | null }> };

export type CreateInvoiceMutationVariables = Exact<{
  input: CreateInvoiceInput;
}>;


export type CreateInvoiceMutation = { __typename?: 'Mutation', createInvoice: { __typename?: 'InvoiceModel', id: string, created: any, updated: any, clientId: string, status?: { __typename?: 'InvoiceStatusModel', name: string } | null } };

export type UpdateInvoiceMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateInvoiceInput;
}>;


export type UpdateInvoiceMutation = { __typename?: 'Mutation', updateInvoice: { __typename?: 'InvoiceModel', id: string, updated: any, clientId: string, status?: { __typename?: 'InvoiceStatusModel', name: string } | null } };

export type CreateInvoiceItemMutationVariables = Exact<{
  input: CreateInvoiceItemInput;
}>;


export type CreateInvoiceItemMutation = { __typename?: 'Mutation', createInvoiceItem: { __typename?: 'InvoiceItemModel', id: string, invoiceNumber: string, shipmentId: string, trackingCode: string, description?: string | null, amount: number } };

export type UpdateInvoiceItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateInvoiceItemInput;
}>;


export type UpdateInvoiceItemMutation = { __typename?: 'Mutation', updateInvoiceItem: { __typename?: 'InvoiceItemModel', id: string, invoiceNumber: string, amount: number, trackingCode: string, shipmentId: string } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any> | undefined) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const ClientsDocument = new TypedDocumentString(`
    query Clients {
  clients {
    name
    email
    phone
    id
    created
    updated
  }
}
    `) as unknown as TypedDocumentString<ClientsQuery, ClientsQueryVariables>;
export const ClientDocument = new TypedDocumentString(`
    query Client($id: String!) {
  client(id: $id) {
    id
    name
    email
    phone
    address
    created
    updated
  }
}
    `) as unknown as TypedDocumentString<ClientQuery, ClientQueryVariables>;
export const CreateClientDocument = new TypedDocumentString(`
    mutation CreateClient($input: CreateClientInput!) {
  createClient(input: $input) {
    id
    name
    email
    created
    updated
  }
}
    `) as unknown as TypedDocumentString<CreateClientMutation, CreateClientMutationVariables>;
export const InvoicesDocument = new TypedDocumentString(`
    query Invoices {
  invoices {
    id
    created
    updated
    clientId
    status {
      name
    }
  }
}
    `) as unknown as TypedDocumentString<InvoicesQuery, InvoicesQueryVariables>;
export const InvoiceDocument = new TypedDocumentString(`
    query Invoice($id: String!) {
  invoice(id: $id) {
    id
    created
    updated
    clientId
    status {
      name
    }
  }
}
    `) as unknown as TypedDocumentString<InvoiceQuery, InvoiceQueryVariables>;
export const InvoicesOfClientDocument = new TypedDocumentString(`
    query InvoicesOfClient($clientId: String!) {
  invoicesByClient(clientId: $clientId) {
    id
    clientId
    status {
      name
    }
  }
}
    `) as unknown as TypedDocumentString<InvoicesOfClientQuery, InvoicesOfClientQueryVariables>;
export const CreateInvoiceDocument = new TypedDocumentString(`
    mutation CreateInvoice($input: CreateInvoiceInput!) {
  createInvoice(input: $input) {
    id
    created
    updated
    clientId
    status {
      name
    }
  }
}
    `) as unknown as TypedDocumentString<CreateInvoiceMutation, CreateInvoiceMutationVariables>;
export const UpdateInvoiceDocument = new TypedDocumentString(`
    mutation UpdateInvoice($id: String!, $input: UpdateInvoiceInput!) {
  updateInvoice(id: $id, input: $input) {
    id
    updated
    clientId
    status {
      name
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateInvoiceMutation, UpdateInvoiceMutationVariables>;
export const CreateInvoiceItemDocument = new TypedDocumentString(`
    mutation CreateInvoiceItem($input: CreateInvoiceItemInput!) {
  createInvoiceItem(input: $input) {
    id
    invoiceNumber
    shipmentId
    trackingCode
    description
    amount
  }
}
    `) as unknown as TypedDocumentString<CreateInvoiceItemMutation, CreateInvoiceItemMutationVariables>;
export const UpdateInvoiceItemDocument = new TypedDocumentString(`
    mutation UpdateInvoiceItem($id: ID!, $input: UpdateInvoiceItemInput!) {
  updateInvoiceItem(id: $id, input: $input) {
    id
    invoiceNumber
    amount
    trackingCode
    shipmentId
  }
}
    `) as unknown as TypedDocumentString<UpdateInvoiceItemMutation, UpdateInvoiceItemMutationVariables>;