/**
 * Concrete documents have to derive from this class.
 */
export default abstract class ShareDBDocument {
  /**
   * Feels this document with initial data that is then sent to server in the
   * create operation. This is called for the first user who uses the content
   * regardless for permission level. The server validates the operation, so
   * this is safe.
   */
  abstract seed(): void;
}
