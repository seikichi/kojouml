export default class Greeter {
  private readonly greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  public greet(): string {
    return `Hello, ${this.greeting}`;
  }
}
