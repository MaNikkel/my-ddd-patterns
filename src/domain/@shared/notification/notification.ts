export type NotificationErrorProps = {
  message: string;
  context: string;
};

export class Notification {
  public errors: NotificationErrorProps[] = [];

  public addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  public messages(context?: string) {
    const errors = this.errors.filter((error) => context ? error.context === context : true);
    return errors.map((error) => `${error.context}: ${error.message},`).join("");
  }

  public hasErrors() {
    return this.errors.length > 0;
  }
}