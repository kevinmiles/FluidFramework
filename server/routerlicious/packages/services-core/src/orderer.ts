/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { IClient, IDocumentMessage, IServiceConfiguration } from "@microsoft/fluid-protocol-definitions";
import { IDocumentDetails } from "./document";
import { IWebSocket } from "./http";

/**
 * Identifier for an ordering node in the system
 */
export interface INode {
    // Unique identifier for the node
    _id: string;

    // Address that the node can be reached at
    address: string;

    // Time when the node is set to expire
    expiration: number;
}

export interface IOrdererSocket {
    send(topic: string, op: string, id: string, data: any[]);
}

export interface IOrdererConnection {
    readonly clientId: string;

    readonly tenantId: string;

    readonly documentId: string;

    // TODO - this can probably be phased out in favor of an explicit create of the ordering context
    // For now it maps to whether the connection is to an existing ordering context or a new one
    readonly existing: boolean;

    readonly parentBranch: string;

    readonly maxMessageSize: number;

    readonly serviceConfiguration: IServiceConfiguration;

    /**
     * Orders the provided list of messages. The messages in the array are guaranteed to be ordered sequentially
     * so long as their total size fits under the maxMessageSize.
     */
    order(message: IDocumentMessage[]): void;

    /**
     * Error event Handler.
     */
    once(event: "error", listener: (...args: any[]) => void): void;

    disconnect(): void;
}

export interface IOrderer {
    connect(
        socket: IWebSocket,
        clientId: string,
        client: IClient,
        details: IDocumentDetails): Promise<IOrdererConnection>;

    close(): Promise<void>;
}

export interface IOrdererManager {
    getOrderer(tenantId: string, documentId: string): Promise<IOrderer>;
}
