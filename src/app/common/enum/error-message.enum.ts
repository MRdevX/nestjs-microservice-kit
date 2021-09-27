/* eslint @typescript-eslint/no-namespace: 0 */
export namespace ErrorMessage {
  export const Common = {
    SameData: {
      code: 'SAME_DATA',
      message: 'Current data and data for update are equal.',
    },
    BadSearchOperator: (operator: string, property: string) => ({
      code: 'BAD_SEARCH_OPERATOR',
      message: `Unknown comparison operator ${operator} for property ${property}.`,
      attachments: { operator, property },
    }),
    EntityNotFound: (entityName: string) => ({
      code: 'ENTITY_NOT_FOUND',
      message: `${entityName} not found.`,
      attachments: { entityName },
    }),
    EntityAlreadyExists: (entityName: string) => ({
      code: 'ENTITY_EXISTS',
      message: `${entityName} already exists.`,
      attachments: { entityName },
    }),
    ValidationFailed: (details: any) => ({
      code: 'DATA_NOT_VALID',
      message: 'Input validation failed.',
      attachments: { details },
    }),
    NoDeleteCriteria: {
      code: 'NO_DELETE_CRITERIA',
      message: 'No criteria for delete.',
    },
  };
}
