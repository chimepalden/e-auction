import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class BidEndDateValidation implements ValidatorConstraintInterface {
  validate(date: Date) {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    return date > minDate;
  }

  defaultMessage(): string {
    return 'bid end date should be atleast a day later than the time of product registration time';
  }
}
