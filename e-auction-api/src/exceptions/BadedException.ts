export class BadedException extends Error {
  constructor(message?: string) {
    super(message || 'You had baded for this product.');
  }
}
