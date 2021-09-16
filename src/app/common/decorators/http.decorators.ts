/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { applyDecorators, Param, ParseUUIDPipe, PipeTransform, SetMetadata, UseGuards } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

// export function Auth(...roles: RoleType[]) {
//   return applyDecorators(
//     SetMetadata('roles', roles),
//     UseGuards(JwtAuthGuard, RolesGuard),
//     ApiBearerAuth(),
//     ApiUnauthorizedResponse({ description: 'Unauthorized' }),
//   );
// }

export function UUIDParam(property: string, ...pipes: (Type<PipeTransform> | PipeTransform)[]): ParameterDecorator {
  return Param(property, new ParseUUIDPipe({ version: '4' }), ...pipes);
}
