export class BidEndDatePassedException extends Error {
  constructor(message?: string) {
    super(message || 'Bid end date has passed.');
  }
}
