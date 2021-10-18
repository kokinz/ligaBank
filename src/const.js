const CREDIT_START_SUM = 2000000;
const ZERO_LENGTH = 4;
const PERCENTAGE_INCOME = 45;

const Tab = {
  CONTRIBUTIONS: {
    name: 'Вклады',
    icon: 'vault',
  },
  CREDITS: {
    name: 'Кредиты',
    icon: 'cards',
  },
  INSURANCE: {
    name: 'Страхование',
    icon: 'security',
  },
  ONLINE_SERVICES: {
    name: 'Онлайн-сервисы',
    icon: 'mobile',
  },
};

const LoanType = {
  MORTGAGE: 'Ипотечное кредитование',
  CAR_LENDING: 'Автомобильное кредитование',
};

const Mortgage = {
  MIN: 1200000,
  MAX: 25000000,
  STEP: 100000,
  INITIAL_FEE: 10,
  MIN_TERM: 5,
  MAX_TERM: 30,
  MIN_SUM: 500000,
  MATERNITY_CAPITAL: 470000,
  CONTRIBUTIONS_PERCENTAGE: 15,
};

const CarLending = {
  MIN: 500000,
  MAX: 5000000,
  STEP: 50000,
  INITIAL_FEE: 5,
  MIN_TERM: 1,
  MAX_TERM: 5,
  MIN_SUM: 200000,
};

const MountlyInterestRate = {
  HIGHEST: 0.013,
  HIGH: 0.0125,
  MIDDLE: 0.00783,
  LOW: 0.007083,
  LOWEST: 0.002916,
};

export {CREDIT_START_SUM, ZERO_LENGTH, PERCENTAGE_INCOME, Tab, LoanType, Mortgage, CarLending, MountlyInterestRate};
