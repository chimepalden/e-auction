import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class PastBidEndDateValidation implements ValidatorConstraintInterface {
  validate(bidEndDate: Date) {
    const nowDate = new Date();
    return bidEndDate > nowDate;
  }

  defaultMessage(): string {
    return 'bid end date has passed and you cannot delete the product';
  }
}
