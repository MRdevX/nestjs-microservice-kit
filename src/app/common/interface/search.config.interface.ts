/* eslint-disable @typescript-eslint/ban-types */
import { Brackets, ObjectLiteral } from 'typeorm';

export interface SearchConfig {
  fullTextSearch?: boolean;
  caseInsensitiveSearch?: boolean;
  withDeleted?: boolean;
  /** Used for adding internal complex search conditions for some custom cases */
  andWhere?: {
    condition: string | Brackets;
    parameters?: ObjectLiteral;
  };
  /** Used for joining extra relations */
  virtualRelations?: VirtualRelationConfig[];
}

export interface VirtualRelationConfig {
  /** If not specified `alias` will be used as property */
  property?: string;
  entity: Function | string;
  alias: string;
  condition: string;
  /** Should be true if joining *-to-many relation */
  plural?: boolean;
  innerJoin?: boolean;
}
