import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class SnakeCaseStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName);
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join('_'));
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }
}
