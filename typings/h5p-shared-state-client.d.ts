namespace H5P {
  /**
   * This class abstracts the connection to ShareDB for the library. It is
   * reusable across content types.
   */
  export declare class SharedStateClient<
    StateType extends SharedState,
    PresenceType extends PresenceData | null = null
  > {
    private StateType;
    private contentId;
    private callbacks;
    constructor(
      StateType: {
        new (): StateType;
      },
      contentId: string,
      callbacks: {
        onRefresh: (data: StateType) => Promise<void>;
        onRefreshPresences?: (presences: {
          [id: string]: PresenceType;
        }) => Promise<void>;
        onConnected?: (data: StateType) => Promise<void>;
        onDeleted?: () => Promise<void>;
        onError?: (error: string) => Promise<void>;
      },
      options?: {
        enablePresence: boolean;
      }
    );
    userInformation?: IUserInformation;
    private socket;
    private connection;
    private doc;
    private initial;
    private hadError;
    private myPresence;
    private otherPresences;
    refresh: () => Promise<void>;
    /**
     * Sends an operation to the server and optimistically applies the change to
     * the local document. Should the operation fail on the server, ShareDB will
     * revert the local change automatically and update the state (this calls q
     * refreshCallback).
     * @param data an operation; normally this is a JSON0 op; see
     * <https://github.com/ottypes/json0> for details
     */
    submitOp: (data: unknown) => void;
    submitPresence: (data: PresenceType) => Promise<void>;
    private onConnected;
    private onError;
    private onDeleted;
    private initPresence;
  }
  export interface IUserInformation {
    userId: string;
    level: "anonymous" | "user" | "privileged";
    refreshAt?: number;
    /**
     * JWT containing credentials and claims
     */
    token?: string;
  }
  export interface PresenceData {
    userId: string;
    name: string;
    level: "anonymous" | "user" | "privileged";
  }
  /**
   * Concrete documents have to derive from this class.
   */
  export interface SharedState {
    /**
     * Seeds this document with initial data that is then sent to server in the
     * create operation. This is called for the first user who uses the content
     * regardless for permission level. The server validates the operation, so
     * this is safe.
     */
    seed(): void;
  }
}
