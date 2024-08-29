import * as dotenv from 'dotenv';

import { UserRole } from '../enum/role.enum';

dotenv.config();

export const userSeedData = [
  {
    id: '781bd3cd-23a2-49e0-bb71-cc5c99f52c8c',
    email: process.env.PG_ADMIN_EMAIL,
    password: 'secureHashedPassword',
    role: UserRole.Admin,
  },
  {
    id: '0910bda9-6ad3-4872-8843-bb11e24dae2f',
    email: 'admin@example.com',
    password: 'secureHashedPassword',
    role: UserRole.Admin,
  },
  {
    id: '363c18c8-b1eb-4643-93cd-9c51fc1baeb1',
    email: 'customer1@example.com',
    password: 'secureHashedPassword',
    role: UserRole.Customer,
  },
];
