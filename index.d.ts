export type ConnectionState = "connected" | "disconnected";
export type SessionState = "alive" | "dying" | "dead";

export interface ClientOptions {
    url?: string;
    logger?: any;
    requestTimeout?: number;
    WebSocket?: any;
    connectionTimeout?: number;
    reconnect?: boolean;
    token?: string | null;
    apiSecret?: string | null;
    handshakeTimeout?: number;
}

export interface RequestOptions {
    ack?: boolean;
}

export interface TransactionLike {
    getId(): string;
    getRequest(): any;
    getState(): string;
    start(): this;
    onSent(listener: (req: any) => void): this;
    onAck(listener: (res: ClientResponse) => void): this;
    onResponse(listener: (res: ClientResponse) => void): this;
    onEnd(listener: () => void): this;
    onError(listener: (err: any) => void): this;
    getTimeout(): number;
}

export interface ClientResponse {
    getRequest(): any;
    getResponse(): any;
    getType(): string | null;
    getJsep(): any;
    isError(): boolean;
    isAck(): boolean;
    isSuccess(): boolean;
}

export interface PluginResponse extends ClientResponse {
    getName(): string | null;
    getData(): any;
}

export interface Jsep {
    type: "offer" | "answer";
    sdp: string;
}

export interface VideoRoomCreateOptions {
    [key: string]: any;
}

export interface VideoRoomDestroyOptions {
    room: number | string;
    [key: string]: any;
}

export interface VideoRoomExistsOptions {
    room: number | string;
    [key: string]: any;
}

export interface VideoRoomListParticipantsOptions {
    room: number | string;
    [key: string]: any;
}

export interface VideoRoomJoinOptions {
    room: number | string;
    ptype: "publisher" | "subscriber" | "listener";
    [key: string]: any;
}

export interface VideoRoomJoinPublisherOptions {
    room: number | string;
    [key: string]: any;
}

export interface VideoRoomJoinListenerOptions {
    room: number | string;
    feed: number | string;
    [key: string]: any;
}

export interface VideoRoomConfigureOptions {
    audio?: boolean;
    video?: boolean;
    data?: boolean;
    [key: string]: any;
}

export interface VideoRoomJoinAndConfigureOptions extends VideoRoomConfigureOptions {
    room: number | string;
    jsep: Jsep;
    [key: string]: any;
}

export interface VideoRoomPublishOptions {
    jsep: Jsep;
    [key: string]: any;
}

export interface VideoRoomStartOptions {
    room: number | string;
    jsep: Jsep;
    [key: string]: any;
}

export interface VideoRoomGenericOptions {
    [key: string]: any;
}

export interface VideoRoomCreateResult {
    room: number;
    response: PluginResponse;
}

export interface VideoRoomDestroyResult {
    response: PluginResponse;
}

export interface VideoRoomExistsResult {
    exists: boolean;
    response: PluginResponse;
}

export interface VideoRoomListResult {
    list: any[];
    response: PluginResponse;
}

export interface VideoRoomListParticipantsResult {
    participants: any[];
    response: PluginResponse;
}

export interface VideoRoomJoinResult {
    id: number;
    jsep: any;
    response: PluginResponse;
}

export interface VideoRoomJoinAndConfigureResult {
    id: number;
    jsep: any;
    publishers: any;
    response: PluginResponse;
}

export interface VideoRoomPublishResult {
    response: PluginResponse;
}

export interface VideoRoomSimpleResult {
    response: PluginResponse;
}

export class PluginHandle {
    constructor(options: { id: number | string; opaqueId?: string; plugin: VideoRoomPlugin });
    getId(): number | string;
    getSession(): Session;
    getPlugin(): VideoRoomPlugin;
    isConnected(): ConnectionState;
    isDisposed(): boolean;
    detach(): Promise<ClientResponse>;
    hangup(): Promise<ClientResponse>;
    trickle(candidate: any): Promise<ClientResponse>;
    trickles(candidates: any[]): Promise<ClientResponse>;
    trickleCompleted(): Promise<ClientResponse>;
    event(event: any): void;
    onWebrtcUp(listener: (event: any) => void): void;
    onMedia(listener: (event: any) => void): void;
    onHangup(listener: (event: any) => void): void;
    onSlowlink(listener: (event: any) => void): void;
    onDetached(listener: (event: any) => void): void;
    onEvent(listener: (event: any) => void): void;
    onTrickle(listener: (event: any) => void): void;
    request(obj: any, options?: RequestOptions): Promise<ClientResponse>;
    requestMessage(body: any, options?: RequestOptions): Promise<PluginResponse>;
    dispose(): Promise<void>;
}

export class VideoRoomHandle extends PluginHandle {
    create(options?: VideoRoomCreateOptions): Promise<VideoRoomCreateResult>;
    destroy(options: VideoRoomDestroyOptions): Promise<VideoRoomDestroyResult>;
    exists(options: VideoRoomExistsOptions): Promise<VideoRoomExistsResult>;
    list(): Promise<VideoRoomListResult>;
    listParticipants(options: VideoRoomListParticipantsOptions): Promise<VideoRoomListParticipantsResult>;
    join(options: VideoRoomJoinOptions): Promise<VideoRoomJoinResult>;
    joinPublisher(options: VideoRoomJoinPublisherOptions): Promise<VideoRoomJoinResult>;
    joinListener(options: VideoRoomJoinListenerOptions): Promise<VideoRoomJoinResult>;
    configure(options?: VideoRoomConfigureOptions): Promise<VideoRoomSimpleResult>;
    joinAndConfigure(options: VideoRoomJoinAndConfigureOptions): Promise<VideoRoomJoinAndConfigureResult>;
    publish(options: VideoRoomPublishOptions): Promise<VideoRoomPublishResult>;
    unpublish(options?: VideoRoomGenericOptions): Promise<VideoRoomSimpleResult>;
    start(options: VideoRoomStartOptions): Promise<VideoRoomSimpleResult>;
    pause(options?: VideoRoomGenericOptions): Promise<VideoRoomSimpleResult>;
    switch(options?: VideoRoomGenericOptions): Promise<VideoRoomSimpleResult>;
    stop(options?: VideoRoomGenericOptions): Promise<VideoRoomSimpleResult>;
    add(options?: VideoRoomGenericOptions): Promise<VideoRoomSimpleResult>;
    remove(options?: VideoRoomGenericOptions): Promise<VideoRoomSimpleResult>;
    leave(options?: VideoRoomGenericOptions): Promise<VideoRoomSimpleResult>;
    publishFeed(options: VideoRoomJoinAndConfigureOptions): Promise<VideoRoomJoinAndConfigureResult>;
    listenFeed(options: VideoRoomJoinListenerOptions): Promise<VideoRoomJoinResult>;
}

export class VideoRoomPublisher extends VideoRoomHandle {
    getPublisherId(): number | null;
    getRoom(): number | string;
    getAnswer(): string | null;
    createAnswer(offer: string): Promise<void>;
}

export class VideoRoomListener extends VideoRoomHandle {
    getRoom(): number | string;
    getFeed(): number | string;
    getOffer(): string | null;
    createOffer(): Promise<void>;
    setRemoteAnswer(answer: string): Promise<void>;
}

export class VideoRoomPlugin {
    name: string;
    fullName: string;
    session: Session;
    constructor(options: { session: Session });
    getName(): string | undefined;
    getFullName(): string | undefined;
    getSession(): Session | undefined;
    defaultHandle(options?: { opaqueId?: string }): Promise<VideoRoomHandle>;
    createVideoRoomHandle(options?: { opaqueId?: string }): Promise<VideoRoomHandle>;
    attachVideoRoomHandle(handleId: number | string, opaqueId?: string): Promise<VideoRoomHandle>;
    createPublisherHandle(room: number | string, opaqueId?: string): Promise<VideoRoomPublisher>;
    attachPublisherHandle(handleId: number | string, room: number | string, opaqueId?: string): Promise<VideoRoomPublisher>;
    createListenerHandle(room: number | string, feed: number | string, opaqueId?: string): Promise<VideoRoomListener>;
    attachListenerHandle(handleId: number | string, room: number | string, feed: number | string, opaqueId?: string): Promise<VideoRoomListener>;
    publishFeed(room: number | string, offer: string, opaqueId?: string): Promise<VideoRoomPublisher>;
    listenFeed(room: number | string, feed: number | string, opaqueId?: string): Promise<VideoRoomListener>;
    getFeeds(room: number | string): Promise<number[]>;
    getFeedsExclude(room: number | string, feed: number | string): Promise<number[]>;
}

export class Session {
    constructor(id: number | string, janus: Janus);
    keepAlive(): Promise<ClientResponse>;
    startKeepAlive(): void;
    stopKeepAlive(): void;
    request(obj: any, options?: RequestOptions): Promise<ClientResponse>;
    createPluginHandle(plugin: string, options?: { opaqueId?: string }): Promise<number>;
    getId(): number | string;
    getState(): SessionState;
    isAlive(): boolean;
    timeout(): void;
    onTimeout(listener: () => void): void;
    onKeepAlive(listener: (ok: boolean) => void): void;
    onError(listener: (err: any) => void): void;
    onEvent(listener: (event: any) => void): void;
    event(event: any): void;
    destroy(): Promise<void>;
    videoRoom(): VideoRoomPlugin;
}

export class Janus {
    constructor(options?: ClientOptions);
    getVersion(): string;
    isConnected(): boolean;
    isConnecting(): boolean;
    isClosing(): boolean;
    connect(): void;
    disconnect(): void;
    open(): void;
    close(options?: { connect?: boolean }): void;
    message(message: { data: any }): void;
    error(err: any): void;
    getConnectionState(): ConnectionState;
    setConnectionTimeout(timeout: number): void;
    startConnectionTimeout(): void;
    stopConnectionTimeout(): void;
    dispatchObject(obj: any): void;
    delegateEvent(event: any): void;
    sendObject(obj: any): void;
    createTransaction(options: { request: any; ack?: boolean; timeout?: number }): TransactionLike;
    request(req: any, options?: RequestOptions): Promise<ClientResponse>;
    hasSession(id: number | string): boolean;
    addSession(session: Session): void;
    deleteSession(id: number | string): void;
    createSession(): Promise<Session>;
    claimSession(sessionId: number | string): Promise<Session>;
    destroySession(id: number | string): Promise<void>;
    getInfo(): Promise<ClientResponse>;
    onConnected(listener: () => void): void;
    onDisconnected(listener: () => void): void;
    onError(listener: (err: any) => void): void;
    onEvent(listener: (event: any) => void): void;
}
