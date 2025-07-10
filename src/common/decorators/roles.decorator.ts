import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const AdminOnly = () => SetMetadata(ROLES_KEY, [Role.ADMIN]);
export const ManagerOnly = () => SetMetadata(ROLES_KEY, [Role.MANAGER]);
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles); 