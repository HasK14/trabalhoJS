class EmailAlreadyBeenUsed extends Error {
  constructor() {
    super("Email already is being used");
    this.name = "EmailAlreadyBeenUsed";
  }
}

module.exports = EmailAlreadyBeenUsed;
