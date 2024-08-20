import { UserRole } from '../enum/role.enum';

export const userSeedData = [
  {
    email: 'admin@example.com',
    password: 'secureHashedPassword',
    role: UserRole.Admin,
  },
  {
    email: 'customer1@example.com',
    password: 'secureHashedPassword',
    role: UserRole.Customer,
  },
];
