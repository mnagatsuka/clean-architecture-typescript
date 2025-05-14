export class Email {
  private readonly value: string

  constructor(value: string) {
    if (!Email.isValid(value)) {
      throw new Error(`Invalid email format: ${value}`)
    }
    this.value = value
  }

  public getValue(): string {
    return this.value
  }

  public equals(other: Email): boolean {
    return this.value === other.getValue()
  }

  public static isValid(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }
}
