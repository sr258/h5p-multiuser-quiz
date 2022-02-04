import ReconnectingWebSocket from "reconnecting-websocket";
import { Connection, Doc } from "sharedb/lib/client";
import ShareDBDocument from "./ShareDBDocument";

/**
 * This class abstracts the connection to ShareDB for the library. It is
 * reusable across content types.
 */
export default class ShareDBConnector<T extends ShareDBDocument> {
  constructor(
    websocketEndpoint: string,
    contentId: string,
    private refreshCallback: (data: T) => Promise<void>,
    private connectedCallback: (data: T) => Promise<void>,
    private deletedCallback: () => Promise<void>,
    private T: { new (): T }
  ) {
    // Open WebSocket connection to ShareDB server
    this.socket = new ReconnectingWebSocket(websocketEndpoint);
    this.connection = new Connection(this.socket as any);

    // Create local doc instance mapped to 'h5p' collection document with
    // contentId
    this.doc = this.connection.get("h5p", contentId.toString());

    // Get initial value of document and subscribe to changes
    this.doc.subscribe(this.refresh);

    // When document changes (by this client or any other, or the server),
    // update the number on the page
    this.doc.on("op batch", this.refresh);

    this.doc.on("del", async () => {
      await this.deletedCallback();
    });
  }

  private socket: ReconnectingWebSocket;
  private connection: Connection;
  private doc: Doc<T>;
  private initial = true;

  refresh = async () => {
    if (this.doc.type === null) {
      // If there is no document type, this means that no document has been
      // created so far. The first user who encounters this creates a new
      // document by seeding it and submitting the create op.
      const newDoc = new this.T();
      newDoc.seed();
      this.doc.create(newDoc, async (error) => {
        if (error) {
          console.error("Error while creating ShareDB doc: ", error);
          return;
        }
        await this.connectedCallback(newDoc);
        await this.refreshCallback(newDoc);
      });
    } else {
      if (this.initial) {
        this.initial = false;
        await this.connectedCallback(this.doc.data);
      }
      await this.refreshCallback(this.doc.data);
    }
  };

  /**
   * Sends an operation to the server and optimistically applies the change to
   * the local document. Should the operation fail on the server, ShareDB will
   * revert the local change automatically and update the state (this calls q
   * refreshCallback).
   * @param data an operation; normally this is a JSON0 op; see
   * <https://github.com/ottypes/json0> for details
   */
  submitOp = (data: any) => {
    this.doc.submitOp(data);
  };
}
