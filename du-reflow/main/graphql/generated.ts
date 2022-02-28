import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * An opaque position marker for pagination. Paginated queries return
   * a PageInfo struct with start and end cursors (which are actually
   * lists of Cursor for ...reasons...). You can then issue queries
   * requesting results `before` the `start` or `after` the `end`
   * cursors to request the previous or next page respectively.
   *
   * Is actually a string or integer, typically an ID.
   * Can also be include encoded data describing how a query is ordered.
   * May be extended in future.
   */
  Cursor: any;
  /**
   * The `DateTime` scalar type represents a date and time in the UTC
   * timezone. The DateTime appears in a JSON response as an ISO8601 formatted
   * string, including UTC timezone ("Z"). The parsed date and time string will
   * be converted to UTC if there is an offset.
   */
  DateTime: any;
  /** Arbitrary json stored as a string */
  Json: any;
  /** The `URI` type simply declares a reference to an external web URL, Holochain entry or other resource. */
  URI: any;
};

/**
 * A boundary or context grouped around some other record- used for documenting, accounting, planning.
 * ## extended for Bonfire (default was `Person | Organization`)
 */
export type AccountingScope = Category | Organization | Person | Tag;

/**
 * An action verb defining the kind of event, commitment, or intent.
 * It is recommended that the lowercase action verb should be used as the record ID
 * in order that references to `Action`s elsewhere in the system are easily readable.
 */
export type Action = {
  __typename?: 'Action';
  id: Scalars['ID'];
  /** Denotes if a process input or output, or not related to a process. */
  inputOutput?: Maybe<Scalars['String']>;
  /** A unique verb which defines the action. */
  label: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  /** The onhand effect of an economic event on a resource, increment, decrement, no effect, or decrement resource and increment 'to' resource. */
  onhandEffect?: Maybe<Scalars['String']>;
  /** The action that should be included on the other direction of the process, for example accept with modify. */
  pairsWith?: Maybe<Scalars['String']>;
  /** The accounting effect of an economic event on a resource, increment, decrement, no effect, or decrement resource and increment 'to' resource. */
  resourceEffect: Scalars['String'];
};

export type Activity = {
  __typename?: 'Activity';
  directReplies?: Maybe<Array<Maybe<Replied>>>;
  id?: Maybe<Scalars['ID']>;
  object?: Maybe<AnyContext>;
  objectId?: Maybe<Scalars['String']>;
  subject?: Maybe<AnyCharacter>;
  subjectId?: Maybe<Scalars['String']>;
  verb?: Maybe<Verb>;
};


export type ActivityDirectRepliesArgs = {
  paginate?: InputMaybe<Paginate>;
};

export type ActivityFilters = {
  activityId?: InputMaybe<Scalars['ID']>;
  objectId?: InputMaybe<Scalars['ID']>;
};

/** A person or group or organization with economic agency. */
export type Agent = {
  agentType?: Maybe<AgentType>;
  canonicalUrl?: Maybe<Scalars['String']>;
  commitments?: Maybe<Array<Commitment>>;
  displayUsername?: Maybe<Scalars['String']>;
  economicEvents?: Maybe<Array<EconomicEvent>>;
  id: Scalars['ID'];
  /** The uri to an image relevant to the agent, such as a logo, avatar, photo, etc. */
  image?: Maybe<Scalars['URI']>;
  intents?: Maybe<Array<Intent>>;
  inventoriedEconomicResources?: Maybe<Array<EconomicResource>>;
  /** An informal or formal textual identifier for an agent. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  plans?: Maybe<Array<Plan>>;
  /** The main place an agent is located, often an address where activities occur and mail can be sent. This is usually a mappable geographic location.  It also could be a website address, as in the case of agents who have no physical location. */
  primaryLocation?: Maybe<SpatialThing>;
  processes?: Maybe<Array<Process>>;
  proposals?: Maybe<Array<Proposal>>;
  relationships?: Maybe<Array<AgentRelationship>>;
  relationshipsAsObject?: Maybe<Array<AgentRelationship>>;
  relationshipsAsSubject?: Maybe<Array<AgentRelationship>>;
  roles?: Maybe<Array<AgentRelationshipRole>>;
};


/** A person or group or organization with economic agency. */
export type AgentCommitmentsArgs = {
  filter?: InputMaybe<AgentCommitmentSearchParams>;
};


/** A person or group or organization with economic agency. */
export type AgentEconomicEventsArgs = {
  filter?: InputMaybe<AgentEventSearchParams>;
};


/** A person or group or organization with economic agency. */
export type AgentIntentsArgs = {
  filter?: InputMaybe<IntentSearchParams>;
};


/** A person or group or organization with economic agency. */
export type AgentInventoriedEconomicResourcesArgs = {
  filter?: InputMaybe<AgentResourceSearchParams>;
};


/** A person or group or organization with economic agency. */
export type AgentPlansArgs = {
  filter?: InputMaybe<AgentPlanSearchParams>;
};


/** A person or group or organization with economic agency. */
export type AgentProcessesArgs = {
  filter?: InputMaybe<AgentProcessSearchParams>;
};


/** A person or group or organization with economic agency. */
export type AgentRelationshipsArgs = {
  roleId?: InputMaybe<Scalars['ID']>;
};


/** A person or group or organization with economic agency. */
export type AgentRelationshipsAsObjectArgs = {
  roleId?: InputMaybe<Scalars['ID']>;
};


/** A person or group or organization with economic agency. */
export type AgentRelationshipsAsSubjectArgs = {
  roleId?: InputMaybe<Scalars['ID']>;
};

export type AgentCreateParams = {
  /** The uri to an image relevant to the agent, such as a logo, avatar, photo, etc. */
  image?: InputMaybe<Scalars['URI']>;
  /** An informal or formal textual identifier for an agent. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`SpatialThing`) The main place an agent is located, often an address where activities occur and mail can be sent. This is usually a mappable geographic location.  It also could be a website address, as in the case of agents who have no physical location. */
  primaryLocation?: InputMaybe<Scalars['ID']>;
};

/** The role of an economic relationship that exists between 2 agents, such as member, trading partner. */
export type AgentRelationship = {
  __typename?: 'AgentRelationship';
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: Maybe<Array<AccountingScope>>;
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** The object of a relationship between 2 agents.  For example, if Mary is a member of a group, then the group is the object. */
  object: Agent;
  /** A kind of relationship that exists between 2 agents. */
  relationship: AgentRelationshipRole;
  /** The subject of a relationship between 2 agents.  For example, if Mary is a member of a group, then Mary is the subject. */
  subject: Agent;
};

export type AgentRelationshipCreateParams = {
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Agent`) The object of a relationship between 2 agents.  For example, if Mary is a member of a group, then the group is the object. */
  object: Scalars['ID'];
  /** (`AgentRelationshipRole`) The role of an economic relationship that exists between 2 agents, such as member, trading partner. */
  relationship: Scalars['ID'];
  /** (`Agent`) The subject of a relationship between 2 agents.  For example, if Mary is a member of a group, then Mary is the subject. */
  subject: Scalars['ID'];
};

export type AgentRelationshipResponse = {
  __typename?: 'AgentRelationshipResponse';
  agentRelationship: AgentRelationship;
};

/** A relationship role defining the kind of association one agent can have with another. */
export type AgentRelationshipRole = {
  __typename?: 'AgentRelationshipRole';
  id: Scalars['ID'];
  /** The human readable name of the role, from the object to the subject. */
  inverseRoleLabel?: Maybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** The human readable name of the role, from the subject to the object. */
  roleLabel: Scalars['String'];
};

export type AgentRelationshipRoleCreateParams = {
  /** The human readable name of the role, inverse from the object to the subject. For example, 'has member'. */
  inverseRoleLabel?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** The human readable name of the role, inverse from the object to the subject. For example, 'is member of'. */
  roleLabel: Scalars['String'];
};

export type AgentRelationshipRoleResponse = {
  __typename?: 'AgentRelationshipRoleResponse';
  agentRelationshipRole?: Maybe<AgentRelationshipRole>;
};

export type AgentRelationshipRoleUpdateParams = {
  id: Scalars['ID'];
  /** The human readable name of the role, inverse from the object to the subject. For example, 'has member'. */
  inverseRoleLabel?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** The human readable name of the role, inverse from the object to the subject. For example, 'is member of'. */
  roleLabel?: InputMaybe<Scalars['String']>;
};

export type AgentRelationshipUpdateParams = {
  id: Scalars['ID'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Agent`) The object of a relationship between 2 agents.  For example, if Mary is a member of a group, then the group is the object. */
  object?: InputMaybe<Scalars['ID']>;
  /** (`AgentRelationshipRole`) The role of an economic relationship that exists between 2 agents, such as member, trading partner. */
  relationship?: InputMaybe<Scalars['ID']>;
  /** (`Agent`) The subject of a relationship between 2 agents.  For example, if Mary is a member of a group, then Mary is the subject. */
  subject?: InputMaybe<Scalars['ID']>;
};

export enum AgentType {
  Organization = 'Organization',
  Person = 'Person'
}

export type AgentUpdateParams = {
  id: Scalars['ID'];
  /** The uri to an image relevant to the agent, such as a logo, avatar, photo, etc. */
  image?: InputMaybe<Scalars['URI']>;
  /** An informal or formal textual identifier for an agent. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`SpatialThing`) The main place an agent is located, often an address where activities occur and mail can be sent. This is usually a mappable geographic location.  It also could be a website address, as in the case of agents who have no physical location. */
  primaryLocation?: InputMaybe<Scalars['ID']>;
};

/** A page of agents */
export type AgentsPage = {
  __typename?: 'AgentsPage';
  edges: Array<Agent>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** Any type of agreement among economic agents. */
export type Agreement = {
  __typename?: 'Agreement';
  commitments?: Maybe<Array<Commitment>>;
  /** The date and time the agreement was created. */
  created?: Maybe<Scalars['DateTime']>;
  economicEvents?: Maybe<Array<EconomicEvent>>;
  id: Scalars['ID'];
  involvedAgents?: Maybe<Array<Agent>>;
  /** An informal or formal textual identifier for an agreement. Does not imply uniqueness. */
  name?: Maybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
};

export type AgreementCreateParams = {
  /** The date and time the agreement was created. */
  created: Scalars['DateTime'];
  /** An informal or formal textual identifier for an agreement. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
};

export type AgreementResponse = {
  __typename?: 'AgreementResponse';
  agreement?: Maybe<Agreement>;
};

export type AgreementUpdateParams = {
  /** The date and time the agreement was created. */
  created?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** An informal or formal textual identifier for an agreement. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
};

/** Any type of character (eg. Category, Thread, Geolocation, etc), actor (eg. User/Person), or agent (eg. Organisation) */
export type AnyCharacter = Category | SpatialThing | User;

/** Any type of known object */
export type AnyContext = Activity | Category | EconomicEvent | Follow | Intent | Post | Process | SpatialThing | Tag | User;

/**
 * A way to tie an economic event that is given in loose fulfilment for another economic event, without commitments or expectations.
 * Supports the gift economy.
 */
export type Appreciation = {
  __typename?: 'Appreciation';
  /** The economic event this appreciation has been given in acknowledgement of. */
  appreciationOf: EconomicEvent;
  /** The economic event provided as a gift in this appreciation. */
  appreciationWith: EconomicEvent;
  id: Scalars['ID'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
};

export type AppreciationCreateParams = {
  /** (`EconomicEvent`) The economic event this appreciation has been given in acknowledgement of. */
  appreciationOf: Scalars['ID'];
  /** (`EconomicEvent`) The economic event provided as a gift in this appreciation. */
  appreciationWith: Scalars['ID'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
};

export type AppreciationResponse = {
  __typename?: 'AppreciationResponse';
  appreciation?: Maybe<Appreciation>;
};

export type AppreciationUpdateParams = {
  /** (`EconomicEvent`) The economic event this appreciation has been given in acknowledgement of. */
  appreciationOf?: InputMaybe<Scalars['ID']>;
  /** (`EconomicEvent`) The economic event provided as a gift in this appreciation. */
  appreciationWith?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
};

export type CategoriesPage = {
  __typename?: 'CategoriesPage';
  edges: Array<Category>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** A category (eg. tag in a taxonomy) */
export type Category = {
  __typename?: 'Category';
  /** The caretaker of this category, if any */
  caretaker?: Maybe<AnyContext>;
  /** A JSON document containing more info beyond the default fields */
  extraInfo?: Maybe<Scalars['Json']>;
  facet?: Maybe<Scalars['String']>;
  /** The numeric primary key of the category */
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  /** The parent category (in a tree-based taxonomy) */
  parentCategory?: Maybe<Category>;
  parentCategoryId?: Maybe<Scalars['String']>;
  prefix?: Maybe<Scalars['String']>;
  /** List of child categories (in a tree-based taxonomy) */
  subCategories?: Maybe<Array<Maybe<CategoriesPage>>>;
  summary?: Maybe<Scalars['String']>;
};

export type CategoryInput = {
  /** A JSON document containing more info beyond the default fields */
  extraInfo?: InputMaybe<Scalars['Json']>;
  facet?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  parentCategory?: InputMaybe<Scalars['ID']>;
  prefix?: InputMaybe<Scalars['String']>;
  sameAsCategory?: InputMaybe<Scalars['ID']>;
  summary?: InputMaybe<Scalars['String']>;
};

export type Character = {
  __typename?: 'Character';
  username?: Maybe<Scalars['String']>;
};

export type CharacterFilters = {
  autocomplete?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type CharacterInput = {
  username?: InputMaybe<Scalars['String']>;
};

/** A claim for a future economic event(s) in reciprocity for an economic event that already occurred. For example, a claim for payment for goods received. */
export type Claim = {
  __typename?: 'Claim';
  /** Relates a claim to a verb, such as consume, produce, work, improve, etc. */
  action: Action;
  /** Reference to an agreement between agents which specifies the rules or policies or calculations which govern this claim. */
  agreedIn?: Maybe<Scalars['URI']>;
  /** Specifies if a calculation will be applied to this claim when an economic event is logged. */
  calculatedUsing?: Maybe<ValueCalculation>;
  /** The data on which the claim was made. */
  created?: Maybe<Scalars['DateTime']>;
  /** The time the claim is expected to be settled. */
  due?: Maybe<Scalars['DateTime']>;
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: Maybe<Measure>;
  /** The claim is complete or not.  This is irrespective of if the original goal has been met, and indicates that no more will be done. */
  finished?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: Maybe<Array<AccountingScope>>;
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** The economic agent from whom the claim is initiated. */
  provider: Agent;
  /** The economic agent whom the claim is for. */
  receiver: Agent;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: Maybe<Array<Scalars['URI']>>;
  /** The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  resourceConformsTo?: Maybe<ResourceSpecification>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: Maybe<Measure>;
  /** The economic event which already occurred which this claim has been made against. */
  triggeredBy: EconomicEvent;
};

export type ClaimCreateParams = {
  /** (`Action`) Relates a claim to a verb, such as consume, produce, work, improve, etc. */
  action: Scalars['ID'];
  /** Reference to an agreement between agents which specifies the rules or policies or calculations which govern this claim. */
  agreedIn?: InputMaybe<Scalars['URI']>;
  /** The data on which the claim was made. */
  created?: InputMaybe<Scalars['DateTime']>;
  /** The time the claim is expected to be settled. */
  due?: InputMaybe<Scalars['DateTime']>;
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: InputMaybe<IMeasure>;
  /** The claim is complete or not.  This is irrespective of if the original goal has been met, and indicates that no more will be done. */
  finished?: InputMaybe<Scalars['Boolean']>;
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Agent`) The economic agent from whom the claim is initiated. */
  provider: Scalars['ID'];
  /** (`Agent`) The economic agent whom the claim is for. */
  receiver: Scalars['ID'];
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /** (`ResourceSpecification`) The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  resourceConformsTo?: InputMaybe<Scalars['ID']>;
  /** The amount and unit of the economic resource counted or inventoried. This is the quantity that could be used to increment or decrement a resource, depending on the type of resource and resource effect of action. */
  resourceQuantity?: InputMaybe<IMeasure>;
  /** (`EconomicEvent`) The economic event which already occurred which this claim has been made against. */
  triggeredBy?: InputMaybe<Scalars['ID']>;
};

export type ClaimResponse = {
  __typename?: 'ClaimResponse';
  claim?: Maybe<Claim>;
};

export type ClaimUpdateParams = {
  /** (`Action`) Relates a claim to a verb, such as consume, produce, work, improve, etc. */
  action?: InputMaybe<Scalars['ID']>;
  /** Reference to an agreement between agents which specifies the rules or policies or calculations which govern this claim. */
  agreedIn?: InputMaybe<Scalars['URI']>;
  /** The data on which the claim was made. */
  created?: InputMaybe<Scalars['DateTime']>;
  /** The time the claim is expected to be settled. */
  due?: InputMaybe<Scalars['DateTime']>;
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: InputMaybe<IMeasure>;
  /** The claim is complete or not.  This is irrespective of if the original goal has been met, and indicates that no more will be done. */
  finished?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Agent`) The economic agent from whom the claim is initiated. */
  provider?: InputMaybe<Scalars['ID']>;
  /** (`Agent`) The economic agent whom the claim is for. */
  receiver?: InputMaybe<Scalars['ID']>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /** (`ResourceSpecification`) The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  resourceConformsTo?: InputMaybe<Scalars['ID']>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: InputMaybe<IMeasure>;
  /** (`EconomicEvent`) The economic event which already occurred which this claim has been made against. */
  triggeredBy?: InputMaybe<Scalars['ID']>;
};

/** A planned economic flow that has been promised by an agent to another agent. */
export type Commitment = {
  __typename?: 'Commitment';
  /** Relates a commitment to a verb, such as consume, produce, work, improve, etc. */
  action: Action;
  /** Reference to an agreement between agents which specifies the rules or policies or calculations which govern this commitment. */
  agreedIn?: Maybe<Scalars['URI']>;
  /** The place where a commitment occurs. Usually mappable. */
  atLocation?: Maybe<SpatialThing>;
  /** This commitment is part of the exchange agreement. */
  clauseOf?: Maybe<Agreement>;
  /** The creation time of the commitment. */
  created?: Maybe<Scalars['DateTime']>;
  /** The commitment can be safely deleted, has no dependent information. */
  deletable?: Maybe<Scalars['Boolean']>;
  /** The time something is expected to be complete. */
  due?: Maybe<Scalars['DateTime']>;
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: Maybe<Measure>;
  /** The commitment is complete or not.  This is irrespective of if the original goal has been met, and indicates that no more will be done. */
  finished?: Maybe<Scalars['Boolean']>;
  /** The economic event which completely or partially fulfills a commitment. */
  fulfilledBy?: Maybe<Array<Fulfillment>>;
  /** The planned beginning of the commitment. */
  hasBeginning?: Maybe<Scalars['DateTime']>;
  /** The planned end of the commitment. */
  hasEnd?: Maybe<Scalars['DateTime']>;
  /** The planned date/time for the commitment. Can be used instead of beginning and end. */
  hasPointInTime?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: Maybe<Array<AccountingScope>>;
  /** Represents a desired deliverable expected from this plan. */
  independentDemandOf?: Maybe<Plan>;
  /** Defines the process to which this commitment is an input. */
  inputOf?: Maybe<Process>;
  involvedAgents?: Maybe<Array<Agent>>;
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** Defines the process for which this commitment is an output. */
  outputOf?: Maybe<Process>;
  /** The economic agent from whom the commitment is initiated. */
  provider: Agent;
  /** The economic agent whom the commitment is for. */
  receiver: Agent;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: Maybe<Array<Scalars['URI']>>;
  /** The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  resourceConformsTo?: Maybe<ResourceSpecification>;
  /** Exact economic resource involved in the commitment. */
  resourceInventoriedAs?: Maybe<EconomicResource>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: Maybe<Measure>;
  /** An intent satisfied fully or partially by an economic event or commitment. */
  satisfies?: Maybe<Array<Satisfaction>>;
};

export type CommitmentCreateParams = {
  /** (`Action`) Relates a commitment to a verb, such as consume, produce, work, improve, etc. */
  action: Scalars['ID'];
  /** Reference to an agreement between agents which specifies the rules or policies or calculations which govern this commitment. */
  agreedIn?: InputMaybe<Scalars['URI']>;
  /** (`SpatialThing`) The place where an commitment occurs.  Usually mappable. */
  atLocation?: InputMaybe<Scalars['ID']>;
  /** (`Agreement`) This commitment is part of the agreement. */
  clauseOf?: InputMaybe<Scalars['ID']>;
  /** The time something is expected to be complete. */
  due?: InputMaybe<Scalars['DateTime']>;
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: InputMaybe<IMeasure>;
  /** The commitment is complete or not.  This is irrespective of if the original goal has been met, and indicates that no more will be done. */
  finished?: InputMaybe<Scalars['Boolean']>;
  /** The planned beginning of the commitment. */
  hasBeginning?: InputMaybe<Scalars['DateTime']>;
  /** The planned end of the commitment. */
  hasEnd?: InputMaybe<Scalars['DateTime']>;
  /** The planned date/time for the commitment. Can be used instead of beginning and end. */
  hasPointInTime?: InputMaybe<Scalars['DateTime']>;
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  /** (`Plan`) Represents a desired deliverable expected from this plan. */
  independentDemandOf?: InputMaybe<Scalars['ID']>;
  /** (`Process`) Defines the process to which this commitment is an input. */
  inputOf?: InputMaybe<Scalars['ID']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Process`) Defines the process for which this commitment is an output. */
  outputOf?: InputMaybe<Scalars['ID']>;
  /** (`Agent`) The economic agent from whom the commitment is initiated. */
  provider: Scalars['ID'];
  /** (`Agent`) The economic agent whom the commitment is for. */
  receiver: Scalars['ID'];
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /** (`ResourceSpecification`) The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  resourceConformsTo?: InputMaybe<Scalars['ID']>;
  /** (`EconomicResource`) Exact economic resource involved in the commitment. */
  resourceInventoriedAs?: InputMaybe<Scalars['ID']>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: InputMaybe<IMeasure>;
};

export type CommitmentResponse = {
  __typename?: 'CommitmentResponse';
  commitment?: Maybe<Commitment>;
};

export type CommitmentUpdateParams = {
  /** Reference to an agreement between agents which specifies the rules or policies or calculations which govern this commitment. */
  agreedIn?: InputMaybe<Scalars['URI']>;
  /** (`SpatialThing`) The place where an commitment occurs.  Usually mappable. */
  atLocation?: InputMaybe<Scalars['ID']>;
  /** (`Agreement`) This commitment is part of the agreement. */
  clauseOf?: InputMaybe<Scalars['ID']>;
  /** The time something is expected to be complete. */
  due?: InputMaybe<Scalars['DateTime']>;
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: InputMaybe<IMeasure>;
  /** The commitment is complete or not.  This is irrespective of if the original goal has been met, and indicates that no more will be done. */
  finished?: InputMaybe<Scalars['Boolean']>;
  /** The planned beginning of the commitment. */
  hasBeginning?: InputMaybe<Scalars['DateTime']>;
  /** The planned end of the commitment. */
  hasEnd?: InputMaybe<Scalars['DateTime']>;
  /** The planned date/time for the commitment. Can be used instead of beginning and end. */
  hasPointInTime?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  /** (`Plan`) Represents a desired deliverable expected from this plan. */
  independentDemandOf?: InputMaybe<Scalars['ID']>;
  /** (`Process`) Defines the process to which this commitment is an input. */
  inputOf?: InputMaybe<Scalars['ID']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Process`) Defines the process for which this commitment is an output. */
  outputOf?: InputMaybe<Scalars['ID']>;
  /** (`Agent`) The economic agent from whom the commitment is initiated. */
  provider?: InputMaybe<Scalars['ID']>;
  /** (`Agent`) The economic agent whom the commitment is for. */
  receiver?: InputMaybe<Scalars['ID']>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /** (`ResourceSpecification`) The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  resourceConformsTo?: InputMaybe<Scalars['ID']>;
  /** (`EconomicResource`) Exact economic resource involved in the commitment. */
  resourceInventoriedAs?: InputMaybe<Scalars['ID']>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: InputMaybe<IMeasure>;
};

/** A `Duration` represents an interval between two `DateTime` values. */
export type Duration = {
  __typename?: 'Duration';
  /** A number representing the duration, will be paired with a unit. */
  numericDuration: Scalars['Float'];
  /** A unit of measure. */
  unitType: TimeUnit;
};

/** An observed economic flow, as opposed to a flow planned to happen in the future. This could reflect a change in the quantity of an economic resource. It is also defined by its behavior in relation to the economic resource (see `Action`) */
export type EconomicEvent = {
  __typename?: 'EconomicEvent';
  /** Relates an economic event to a verb, such as consume, produce, work, improve, etc. */
  action: Action;
  /** Reference to an agreement between agents which specifies the rules or policies or calculations which govern this economic event. */
  agreedIn?: Maybe<Scalars['URI']>;
  appreciatedBy?: Maybe<Array<Appreciation>>;
  appreciationOf?: Maybe<Array<Appreciation>>;
  /** The place where an economic event occurs.  Usually mappable. */
  atLocation?: Maybe<SpatialThing>;
  /** The value calculation (if any) used to generate this event. */
  calculatedUsing?: Maybe<ValueCalculation>;
  /** The economic event can be safely deleted, has no dependent information. */
  deletable?: Maybe<Scalars['Boolean']>;
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: Maybe<Measure>;
  /** The commitment which is completely or partially fulfilled by an economic event. */
  fulfills?: Maybe<Array<Fulfillment>>;
  /** The beginning of the economic event. */
  hasBeginning?: Maybe<Scalars['DateTime']>;
  /** The end of the economic event. */
  hasEnd?: Maybe<Scalars['DateTime']>;
  /** The date/time at which the economic event occurred. Can be used instead of beginning and end. */
  hasPointInTime?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: Maybe<Array<AccountingScope>>;
  /** Defines the process to which this event is an input. */
  inputOf?: Maybe<Process>;
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** Defines the process for which this event is an output. */
  outputOf?: Maybe<Process>;
  /** The economic agent from whom the actual economic event is initiated. */
  provider: Agent;
  /** This economic event occurs as part of this agreement. */
  realizationOf?: Maybe<Agreement>;
  /** The economic agent whom the actual economic event is for. */
  receiver: Agent;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: Maybe<Array<Scalars['URI']>>;
  /** The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  resourceConformsTo?: Maybe<ResourceSpecification>;
  /** Economic resource involved in the economic event. */
  resourceInventoriedAs?: Maybe<EconomicResource>;
  /** The amount and unit of the economic resource counted or inventoried. This is the quantity that could be used to increment or decrement a resource, depending on the type of resource and resource effect of action. */
  resourceQuantity?: Maybe<Measure>;
  /** An intent satisfied fully or partially by an economic event or commitment. */
  satisfies?: Maybe<Array<Satisfaction>>;
  /**
   * Tags/Categories in a taxonomy, linked to resourceClassifiedAs:
   * References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping.
   */
  tags?: Maybe<Array<Maybe<AnyContext>>>;
  /** Additional economic resource on the economic event when needed by the receiver. Used when a transfer or move, or sometimes other actions, requires explicitly identifying an economic resource on the receiving side. */
  toResourceInventoriedAs?: Maybe<EconomicResource>;
  trace?: Maybe<Array<ProductionFlowItem>>;
  track?: Maybe<Array<ProductionFlowItem>>;
  /** References another economic event that implied this economic event, often based on a prior agreement. */
  triggeredBy?: Maybe<EconomicEvent>;
};


/** An observed economic flow, as opposed to a flow planned to happen in the future. This could reflect a change in the quantity of an economic resource. It is also defined by its behavior in relation to the economic resource (see `Action`) */
export type EconomicEventTraceArgs = {
  recurseLimit?: InputMaybe<Scalars['Int']>;
};


/** An observed economic flow, as opposed to a flow planned to happen in the future. This could reflect a change in the quantity of an economic resource. It is also defined by its behavior in relation to the economic resource (see `Action`) */
export type EconomicEventTrackArgs = {
  recurseLimit?: InputMaybe<Scalars['Int']>;
};

export type EconomicEventCreateParams = {
  /** (`Action`) Relates an economic event to a verb, such as consume, produce, work, improve, etc. */
  action: Scalars['ID'];
  /** Reference to an agreement between agents which specifies the rules or policies or calculations which govern this economic event. */
  agreedIn?: InputMaybe<Scalars['URI']>;
  /** (`SpatialThing`) The place where an economic event occurs.  Usually mappable. */
  atLocation?: InputMaybe<Scalars['ID']>;
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: InputMaybe<IMeasure>;
  /** The beginning of the economic event. */
  hasBeginning?: InputMaybe<Scalars['DateTime']>;
  /** The end of the economic event. */
  hasEnd?: InputMaybe<Scalars['DateTime']>;
  /** The date/time at which the economic event occurred. Can be used instead of beginning and end. */
  hasPointInTime?: InputMaybe<Scalars['DateTime']>;
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  /** (`Process`) Defines the process to which this event is an input. */
  inputOf?: InputMaybe<Scalars['ID']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Process`) Defines the process for which this event is an output. */
  outputOf?: InputMaybe<Scalars['ID']>;
  /** (`Agent`) The economic agent from whom the actual economic event is initiated. */
  provider?: InputMaybe<Scalars['ID']>;
  /** (`Agreement`) This economic event occurs as part of this agreement. */
  realizationOf?: InputMaybe<Scalars['ID']>;
  /** (`Agent`) The economic agent whom the actual economic event is for. */
  receiver?: InputMaybe<Scalars['ID']>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /** (`ResourceSpecification`) The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  resourceConformsTo?: InputMaybe<Scalars['ID']>;
  /** (`EconomicResource`) Economic resource involved in the economic event. */
  resourceInventoriedAs?: InputMaybe<Scalars['ID']>;
  /** The amount and unit of the economic resource counted or inventoried. This is the quantity that could be used to increment or decrement a resource, depending on the type of resource and resource effect of action. */
  resourceQuantity?: InputMaybe<IMeasure>;
  /**
   * Tags/Categories in a taxonomy, linked to resourceClassifiedAs:
   * References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping.
   */
  tags?: InputMaybe<Array<Scalars['ID']>>;
  /** (`EconomicResource`) Additional economic resource on the economic event when needed by the receiver. Used when a transfer or move, or sometimes other actions, requires explicitly identifying an economic resource on the receiving side. */
  toResourceInventoriedAs?: InputMaybe<Scalars['ID']>;
  /** (`EconomicEvent`) References another economic event that implied this economic event, often based on a prior agreement. */
  triggeredBy?: InputMaybe<Scalars['ID']>;
};

/** A page of Economic Events */
export type EconomicEventPage = {
  __typename?: 'EconomicEventPage';
  edges: Array<EconomicEvent>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type EconomicEventResponse = {
  __typename?: 'EconomicEventResponse';
  /** Details of the newly created event. */
  economicEvent: EconomicEvent;
  /** Details of any newly created `EconomicResource`, for events that create new resources. */
  economicResource?: Maybe<EconomicResource>;
  /** Any reciprocal events created by found value calculations. */
  reciprocalEvents?: Maybe<Array<EconomicEvent>>;
};

export type EconomicEventUpdateParams = {
  /** Reference to an agreement between agents which specifies the rules or policies or calculations which govern this economic event. */
  agreedIn?: InputMaybe<Scalars['URI']>;
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Agreement`) This economic event occurs as part of this agreement. */
  realizationOf?: InputMaybe<Scalars['ID']>;
  /** (`EconomicEvent`) References another economic event that implied this economic event, often based on a prior agreement. */
  triggeredBy?: InputMaybe<Scalars['ID']>;
};

/** A resource which is useful to people or the ecosystem. */
export type EconomicResource = {
  __typename?: 'EconomicResource';
  /** The current amount and unit of the economic resource for which the agent has primary rights and responsibilities, sometimes thought of as ownership. This can be either stored or derived from economic events affecting the resource. */
  accountingQuantity?: Maybe<Measure>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  classifiedAs?: Maybe<Array<Scalars['URI']>>;
  /** The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  conformsTo?: Maybe<ResourceSpecification>;
  /** Used when a stock economic resource contains items also defined as economic resources. */
  containedIn?: Maybe<EconomicResource>;
  /** Used when a stock economic resource contains units also defined as economic resources. */
  contains?: Maybe<Array<EconomicResource>>;
  /** The current place an economic resource is located. Could be at any level of granularity, from a town to an address to a warehouse location. Usually mappable. */
  currentLocation?: Maybe<SpatialThing>;
  id: Scalars['ID'];
  /** The uri to an image relevant to the resource, such as a photo, diagram, etc. */
  image?: Maybe<Scalars['URI']>;
  /** Lot or batch of an economic resource, used to track forward or backwards to all occurrences of resources of that lot. Note more than one resource can be of the same lot. */
  lot?: Maybe<ProductBatch>;
  /** An informal or formal textual identifier for an item. Does not imply uniqueness. */
  name?: Maybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** The current amount and unit of the economic resource which is under direct control of the agent.  It may be more or less than the accounting quantity. This can be either stored or derived from economic events affecting the resource. */
  onhandQuantity?: Maybe<Measure>;
  /** The agent currently with primary rights and responsibilites for the economic resource. It is the agent that is associated with the accountingQuantity of the economic resource. */
  primaryAccountable?: Maybe<Agent>;
  /** References the ProcessSpecification of the last process the desired economic resource went through. Stage is used when the last process is important for finding proper resources, such as where the publishing process wants only documents that have gone through the editing process. */
  stage?: Maybe<ProcessSpecification>;
  /** The state of the desired economic resource (pass or fail), after coming out of a test or review process. Can be derived from the last event if a pass or fail event. */
  state?: Maybe<Action>;
  /**
   * Tags/Categories in a taxonomy, linked to resourceClassifiedAs:
   * References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping.
   */
  tags?: Maybe<Array<AnyContext>>;
  trace?: Maybe<Array<ProductionFlowItem>>;
  track?: Maybe<Array<ProductionFlowItem>>;
  /** Sometimes called serial number, used when each item must have a traceable identifier (like a computer). Could also be used for other unique tracking identifiers needed for resources. */
  trackingIdentifier?: Maybe<Scalars['String']>;
  /** The unit used for use or work or cite actions for this resource. */
  unitOfEffort?: Maybe<Unit>;
};


/** A resource which is useful to people or the ecosystem. */
export type EconomicResourceTraceArgs = {
  recurseLimit?: InputMaybe<Scalars['Int']>;
};


/** A resource which is useful to people or the ecosystem. */
export type EconomicResourceTrackArgs = {
  recurseLimit?: InputMaybe<Scalars['Int']>;
};

/** Input `EconomicResource` type used when sending events to setup initial resource recordings */
export type EconomicResourceCreateParams = {
  /** (`ResourceSpecification`) The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  conformsTo?: InputMaybe<Scalars['ID']>;
  /** (`EconomicResource`) Used when a stock economic resource contains items also defined as economic resources. */
  containedIn?: InputMaybe<Scalars['ID']>;
  /** (`SpatialThing`) The current place an economic resource is located.  Could be at any level of granularity, from a town to an address to a warehouse location.  Usually mappable. */
  currentLocation?: InputMaybe<Scalars['ID']>;
  /** The uri to an image relevant to the resource, such as a photo, diagram, etc. */
  image?: InputMaybe<Scalars['URI']>;
  /** (`ProductBatch`) Lot or batch of an economic resource, used to track forward or backwards to all occurrences of resources of that lot. Note more than one resource can be of the same lot. */
  lot?: InputMaybe<Scalars['ID']>;
  /** An informal or formal textual identifier for an item. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /**
   * Tags/Categories in a taxonomy, linked to resourceClassifiedAs:
   * References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping.
   */
  tags?: InputMaybe<Array<Scalars['ID']>>;
  /** Sometimes called serial number, used when each item must have a traceable identifier (like a computer). Could also be used for other unique tracking identifiers needed for resources. */
  trackingIdentifier?: InputMaybe<Scalars['String']>;
};

/** A page of Economic Resources */
export type EconomicResourcePage = {
  __typename?: 'EconomicResourcePage';
  edges: Array<EconomicResource>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type EconomicResourceResponse = {
  __typename?: 'EconomicResourceResponse';
  economicResource: EconomicResource;
};

export type EconomicResourceUpdateParams = {
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  classifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /** (`EconomicResource`) Used when a stock economic resource contains items also defined as economic resources. */
  containedIn?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  /** The uri to an image relevant to the resource, such as a photo, diagram, etc. */
  image?: InputMaybe<Scalars['URI']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Unit`) The unit used for use or work or cite actions for this resource. */
  unitOfEffort?: InputMaybe<Scalars['ID']>;
};

export type EventOrCommitment = Commitment | EconomicEvent;

export type FeedFilters = {
  feedName?: InputMaybe<Scalars['String']>;
};

export type Follow = {
  __typename?: 'Follow';
  followedCharacter?: Maybe<Character>;
  followedProfile?: Maybe<Profile>;
  followerCharacter?: Maybe<Character>;
  followerProfile?: Maybe<Profile>;
};

/** Represents many-to-many relationships between commitments and economic events that fully or partially satisfy one or more commitments. */
export type Fulfillment = {
  __typename?: 'Fulfillment';
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: Maybe<Measure>;
  /** The economic event which completely or partially fulfills a commitment. */
  fulfilledBy: EconomicEvent;
  /** The commitment which is completely or partially fulfilled by an economic event. */
  fulfills: Commitment;
  id: Scalars['ID'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: Maybe<Measure>;
};

export type FulfillmentCreateParams = {
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: InputMaybe<IMeasure>;
  /** (`EconomicEvent`) The economic event which completely or partially fulfills a commitment. */
  fulfilledBy: Scalars['ID'];
  /** (`Commitment`) The commitment which is completely or partially fulfilled by an economic event. */
  fulfills: Scalars['ID'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: InputMaybe<IMeasure>;
};

export type FulfillmentResponse = {
  __typename?: 'FulfillmentResponse';
  fulfillment?: Maybe<Fulfillment>;
};

export type FulfillmentUpdateParams = {
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: InputMaybe<IMeasure>;
  /** (`EconomicEvent`) The economic event which completely or partially fulfills a commitment. */
  fulfilledBy?: InputMaybe<Scalars['ID']>;
  /** (`Commitment`) The commitment which is completely or partially fulfilled by an economic event. */
  fulfills?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: InputMaybe<IMeasure>;
};

export type GeolocationDistance = {
  meters?: InputMaybe<Scalars['Int']>;
};

export type GeolocationFilters = {
  distance?: InputMaybe<GeolocationDistance>;
  nearAddress?: InputMaybe<Scalars['String']>;
  nearPoint?: InputMaybe<GeolocationPoint>;
};

export type GeolocationPoint = {
  lat?: InputMaybe<Scalars['Float']>;
  long?: InputMaybe<Scalars['Float']>;
};

/** Mutation input structure for defining time durations. */
export type IDuration = {
  /** A number representing the duration, will be paired with a unit. */
  numericDuration: Scalars['Float'];
  /** A unit of measure. */
  unitType: TimeUnit;
};

/** Mutation input structure for defining measurements. Should be nulled if not present, rather than empty. */
export type IMeasure = {
  /** A number representing the quantity, will be paired with a unit. */
  hasNumericalValue: Scalars['Float'];
  /** (`Unit`) A unit of measure. */
  hasUnit: Scalars['ID'];
};

/** A planned economic flow which has not been committed to, which can lead to economic events (sometimes through commitments). */
export type Intent = {
  __typename?: 'Intent';
  /** Relates an intent to a verb, such as consume, produce, work, improve, etc. */
  action: Action;
  /** Reference to an agreement between agents which specifies the rules or policies or calculations which govern this intent. */
  agreedIn?: Maybe<Scalars['URI']>;
  /** The place where an intent would occur. Usually mappable. */
  atLocation?: Maybe<SpatialThing>;
  /** The total quantity of the offered resource available. */
  availableQuantity?: Maybe<Measure>;
  canonicalUrl?: Maybe<Scalars['URI']>;
  /** The intent can be safely deleted, has no dependent information. */
  deletable?: Maybe<Scalars['Boolean']>;
  /** The time something is expected to be complete. */
  due?: Maybe<Scalars['DateTime']>;
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: Maybe<Measure>;
  /** The intent is complete or not.  This is irrespective of if the original goal has been met, and indicates that no more will be done. */
  finished?: Maybe<Scalars['Boolean']>;
  /** The planned beginning of the intent. */
  hasBeginning?: Maybe<Scalars['DateTime']>;
  /** The planned end of the intent. */
  hasEnd?: Maybe<Scalars['DateTime']>;
  /** The planned date/time for the intent. Can be used instead of beginning and end. */
  hasPointInTime?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** The uri to an image relevant to the intent, such as a photo. */
  image?: Maybe<Scalars['URI']>;
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: Maybe<Array<AccountingScope>>;
  /** Defines the process to which this intent is an input. */
  inputOf?: Maybe<Process>;
  /** An informal or formal textual identifier for an intent. Does not imply uniqueness. */
  name?: Maybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** Defines the process to which this intent is an output. */
  outputOf?: Maybe<Process>;
  /** The economic agent from whom the intent is initiated. This implies that the intent is an offer. */
  provider?: Maybe<Agent>;
  publishedIn?: Maybe<Array<ProposedIntent>>;
  /** The economic agent whom the intent is for.  This implies that the intent is a request. */
  receiver?: Maybe<Agent>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: Maybe<Array<Scalars['URI']>>;
  /** The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  resourceConformsTo?: Maybe<ResourceSpecification>;
  /** When a specific `EconomicResource` is known which can service the `Intent`, this defines that resource. */
  resourceInventoriedAs?: Maybe<EconomicResource>;
  /** The amount and unit of the economic resource counted or inventoried. This is the quantity that could be used to increment or decrement a resource, depending on the type of resource and resource effect of action. */
  resourceQuantity?: Maybe<Measure>;
  satisfiedBy?: Maybe<Array<Satisfaction>>;
  /**
   * Tags/Categories in a taxonomy, linked to resourceClassifiedAs:
   * References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping.
   */
  tags?: Maybe<Array<Maybe<AnyContext>>>;
};

export type IntentCreateParams = {
  /** (`Action`) Relates an intent to a verb, such as consume, produce, work, improve, etc. */
  action: Scalars['String'];
  /** Reference to an agreement between agents which specifies the rules or policies or calculations which govern this intent. */
  agreedIn?: InputMaybe<Scalars['URI']>;
  /** (`SpatialThing`) The place where an intent occurs. Usually mappable. */
  atLocation?: InputMaybe<Scalars['ID']>;
  /** The total quantity of the offered resource available. */
  availableQuantity?: InputMaybe<IMeasure>;
  /** The time something is expected to be complete. */
  due?: InputMaybe<Scalars['DateTime']>;
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: InputMaybe<IMeasure>;
  /** The intent is complete or not.  This is irrespective of if the original goal has been met, and indicates that no more will be done. */
  finished?: InputMaybe<Scalars['Boolean']>;
  /** The planned beginning of the intent. */
  hasBeginning?: InputMaybe<Scalars['DateTime']>;
  /** The planned end of the intent. */
  hasEnd?: InputMaybe<Scalars['DateTime']>;
  /** The planned date/time for the intent. Can be used instead of beginning and end. */
  hasPointInTime?: InputMaybe<Scalars['DateTime']>;
  /** The uri to an image relevant to the intent, such as a photo. */
  image?: InputMaybe<Scalars['URI']>;
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  /** (`Process`) Defines the process to which this intent is an input. */
  inputOf?: InputMaybe<Scalars['ID']>;
  /** An informal or formal textual identifier for an intent. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Process`) Defines the process to which this intent is an output. */
  outputOf?: InputMaybe<Scalars['ID']>;
  /** (`Agent`) The economic agent from whom the intent is initiated. This implies that the intent is an offer. */
  provider?: InputMaybe<Scalars['ID']>;
  /** (`Agent`) The economic agent whom the intent is for.  This implies that the intent is a request. */
  receiver?: InputMaybe<Scalars['ID']>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /** (`ResourceSpecification`) The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  resourceConformsTo?: InputMaybe<Scalars['ID']>;
  /** (`EconomicResource`) When a specific `EconomicResource` is known which can service the `Intent`, this defines that resource. */
  resourceInventoriedAs?: InputMaybe<Scalars['ID']>;
  /** The amount and unit of the economic resource counted or inventoried. This is the quantity that could be used to increment or decrement a resource, depending on the type of resource and resource effect of action. */
  resourceQuantity?: InputMaybe<IMeasure>;
  /**
   * Tags/Categories in a taxonomy, linked to resourceClassifiedAs:
   * References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping.
   */
  tags?: InputMaybe<Array<Scalars['ID']>>;
};

export type IntentResponse = {
  __typename?: 'IntentResponse';
  intent: Intent;
};

/** Query parameters for reading `Intent`s related to an `Agent` */
export type IntentSearchParams = {
  action?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  agent?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  atLocation?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  classifiedAs?: InputMaybe<Array<InputMaybe<Scalars['URI']>>>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  finished?: InputMaybe<Scalars['Boolean']>;
  geolocation?: InputMaybe<GeolocationFilters>;
  inScopeOf?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  provider?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  receiver?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  searchString?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<Scalars['String']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type IntentUpdateParams = {
  /** (`Action`) Relates an intent to a verb, such as consume, produce, work, improve, etc. */
  action?: InputMaybe<Scalars['String']>;
  /** Reference to an agreement between agents which specifies the rules or policies or calculations which govern this intent. */
  agreedIn?: InputMaybe<Scalars['URI']>;
  /** (`SpatialThing`) The place where an intent occurs. Usually mappable. */
  atLocation?: InputMaybe<Scalars['ID']>;
  /** The total quantity of the offered resource available. */
  availableQuantity?: InputMaybe<IMeasure>;
  /** The time something is expected to be complete. */
  due?: InputMaybe<Scalars['DateTime']>;
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: InputMaybe<IMeasure>;
  /** The intent is complete or not.  This is irrespective of if the original goal has been met, and indicates that no more will be done. */
  finished?: InputMaybe<Scalars['Boolean']>;
  /** The planned beginning of the intent. */
  hasBeginning?: InputMaybe<Scalars['DateTime']>;
  /** The planned end of the intent. */
  hasEnd?: InputMaybe<Scalars['DateTime']>;
  /** The planned date/time for the intent. Can be used instead of beginning and end. */
  hasPointInTime?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** The uri to an image relevant to the intent, such as a photo. */
  image?: InputMaybe<Scalars['URI']>;
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  /** (`Process`) Defines the process to which this intent is an input. */
  inputOf?: InputMaybe<Scalars['ID']>;
  /** An informal or formal textual identifier for an intent. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Process`) Defines the process to which this intent is an output. */
  outputOf?: InputMaybe<Scalars['ID']>;
  /** (`Agent`) The economic agent from whom the intent is initiated. This implies that the intent is an offer. */
  provider?: InputMaybe<Scalars['ID']>;
  /** (`Agent`) The economic agent whom the intent is for.  This implies that the intent is a request. */
  receiver?: InputMaybe<Scalars['ID']>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /** (`ResourceSpecification`) The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  resourceConformsTo?: InputMaybe<Scalars['ID']>;
  /** (`EconomicResource`) When a specific `EconomicResource` is known which can service the `Intent`, this defines that resource. */
  resourceInventoriedAs?: InputMaybe<Scalars['ID']>;
  /** The amount and unit of the economic resource counted or inventoried. This is the quantity that could be used to increment or decrement a resource, depending on the type of resource and resource effect of action. */
  resourceQuantity?: InputMaybe<IMeasure>;
};

/** A page of intents */
export type IntentsPage = {
  __typename?: 'IntentsPage';
  edges: Array<Intent>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  currentAccountId?: Maybe<Scalars['String']>;
  currentUser?: Maybe<User>;
  currentUsername?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type Me = {
  __typename?: 'Me';
  accountId?: Maybe<Scalars['ID']>;
  flagsForModeration?: Maybe<Array<Maybe<Activity>>>;
  followed?: Maybe<Array<Maybe<Follow>>>;
  followers?: Maybe<Array<Maybe<Follow>>>;
  likeActivities?: Maybe<Array<Maybe<Activity>>>;
  user?: Maybe<User>;
  userFeed?: Maybe<Array<Maybe<Activity>>>;
  userNotifications?: Maybe<Array<Maybe<Activity>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type MeFlagsForModerationArgs = {
  paginate?: InputMaybe<Paginate>;
};


export type MeFollowedArgs = {
  paginate?: InputMaybe<Paginate>;
};


export type MeFollowersArgs = {
  paginate?: InputMaybe<Paginate>;
};


export type MeLikeActivitiesArgs = {
  paginate?: InputMaybe<Paginate>;
};


export type MeUserFeedArgs = {
  paginate?: InputMaybe<Paginate>;
};


export type MeUserNotificationsArgs = {
  paginate?: InputMaybe<Paginate>;
};

/**
 * Semantic meaning for measurements: binds a quantity to its measurement unit.
 * See http://www.qudt.org/pages/QUDToverviewPage.html
 */
export type Measure = {
  __typename?: 'Measure';
  /** Added for CommonsPub */
  canonicalUrl?: Maybe<Scalars['URI']>;
  /** A number representing the quantity, will be paired with a unit. */
  hasNumericalValue: Scalars['Float'];
  /** A unit of measure. */
  hasUnit: Unit;
  id: Scalars['ID'];
};

export type MeasuresPage = {
  __typename?: 'MeasuresPage';
  edges?: Maybe<Array<Measure>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

/** Things that can be observed. */
export type ObservableObject = EconomicResource | Organization | Person;

/**
 * Possible qualitative assessment of an `ObservableProperty`.
 * (eg. property "contamination" may have phenomenon like "high", "some", "none")
 */
export type ObservablePhenomenon = {
  __typename?: 'ObservablePhenomenon';
  /** What observable property does this assessment apply to? */
  choiceOf?: Maybe<ObservableProperty>;
  /** A numerical representation of this phenomenon, to be used when automatic analysis is needed (like value calculation formulas). */
  formulaQuantifier?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  /** A name for this phenomenon (eg. high, ripe, organic). Unique to each ObservableProperty. */
  label: Scalars['String'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
};

/**
 * Possible qualitative assessment of an `ObservableProperty`.
 * (eg. property "contamination" may have phenomenon like "high", "some", "none")
 */
export type ObservablePhenomenonInputParams = {
  /** What observable property does this assessment apply to? */
  choiceOf: Scalars['ID'];
  /** A numerical representation of this phenomenon, to be used when automatic analysis is needed (like value calculation formulas). For example, a series of phenomenon of high, medium, low, or none could be assigned formula quantifiers of 100, 50, 10, or 0. */
  formulaQuantifier?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['ID']>;
  /** A name for this phenomenon (eg. high, ripe, organic). Unique to each ObservableProperty. */
  label: Scalars['String'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
};

export type ObservablePhenomenonPage = {
  __typename?: 'ObservablePhenomenonPage';
  edges: Array<ObservablePhenomenon>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** Types of things that can be observed or measured as part of `Observation`. */
export type ObservableProperty = {
  __typename?: 'ObservableProperty';
  hasChoices?: Maybe<Array<ObservablePhenomenon>>;
  id: Scalars['ID'];
  /** A name for something that can be observed (eg, temperature, weight, contamination...) */
  label: Scalars['String'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
};

/** Types of things that can be observed or measured as part of `Observation`. */
export type ObservablePropertyInputParams = {
  id?: InputMaybe<Scalars['ID']>;
  /** A name for something that can be observed (eg, temperature, weight, contamination...) */
  label: Scalars['String'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
};

export type ObservablePropertyPage = {
  __typename?: 'ObservablePropertyPage';
  edges: Array<ObservableProperty>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** Can contain either a unit+measure or a qualitative assessment. */
export type ObservableResult = Measure | ObservablePhenomenon;

/** An observation event that records the measurement or assessement of an economic resource. */
export type Observation = {
  __typename?: 'Observation';
  /** The place where an observation occured. Usually mappable. */
  atLocation?: Maybe<SpatialThing>;
  /** Thing that was observed (like `EconomicResource` or `Agent`) */
  hasFeatureOfInterest: ObservableObject;
  /**
   * The result of the observation, which can be one of:
   * - Unit and measurement of what was observed (in the case of quantitative measurements)
   * - Name and other information (using `ObservablePhenomenon`) about what was observed (in the case of qualitative measurements)
   */
  hasResult: ObservableResult;
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: Maybe<Array<AccountingScope>>;
  /** The person (`Agent`) or a machine like a sensor (`EconomicResource` or `ResourceSpecification`) who actually conducted the observation */
  madeBySensor: Observer;
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** Optionally defines the economic process during which this event occured */
  observedDuring?: Maybe<Process>;
  /** Type of measurement (eg, temperature, weight...). */
  observedProperty: ObservableProperty;
  /** The agent who is providing the observation */
  provider: Agent;
  /** The date and time at which the observation event. */
  resultTime: Scalars['DateTime'];
};

export type ObservationInputParams = {
  /** (`SpatialThing`) The place where an observation occured.  Usually mappable. */
  atLocation?: InputMaybe<Scalars['ID']>;
  /** (`EconomicResource` or `Agent`) Thing that was observed */
  hasFeatureOfInterest: Scalars['ID'];
  id?: InputMaybe<Scalars['ID']>;
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  /** (`Person` or `EconomicResource` or `ResourceSpecification`) The person or machine or sensor who actually conducted the observation */
  madeBySensor?: InputMaybe<Scalars['ID']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Process`) Optionally defines the economic process during which this event occured */
  observedDuring?: InputMaybe<Scalars['ID']>;
  /** (`ObservableProperty`) Type of measurement (eg, temperature, weight...). */
  observedProperty: Scalars['ID'];
  /** (`Person` or `Organization`) The agent who is providing the observation */
  provider?: InputMaybe<Scalars['ID']>;
  /** Alternatively to `resultPhenomenon`: Unit and measurement of what was observed (only in the case of quantitative measurements) */
  resultMeasure?: InputMaybe<IMeasure>;
  /** Alternatively to `resultMeasure`: (`ObservablePhenomenon`) Name and other information about what was observed (only in the case of qualitative measurements) */
  resultPhenomenon?: InputMaybe<Scalars['ID']>;
  /** The date and time at which the observation occurred. */
  resultTime?: InputMaybe<Scalars['DateTime']>;
};

export type ObservationPage = {
  __typename?: 'ObservationPage';
  edges: Array<Observation>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** Agent (usually a person) or machine like a sensor that conducts observations. */
export type Observer = EconomicResource | Organization | Person | ResourceSpecification;

/** A formal or informal group, or legal organization. */
export type Organization = {
  __typename?: 'Organization';
  agentType?: Maybe<AgentType>;
  canonicalUrl?: Maybe<Scalars['String']>;
  commitments?: Maybe<Array<Commitment>>;
  displayUsername?: Maybe<Scalars['String']>;
  economicEvents?: Maybe<Array<EconomicEvent>>;
  id: Scalars['ID'];
  /** The uri to an image relevant to the agent, such as a logo, avatar, photo, etc. */
  image?: Maybe<Scalars['URI']>;
  inScopeOf?: Maybe<Array<AccountingScope>>;
  intents?: Maybe<Array<Intent>>;
  inventoriedEconomicResources?: Maybe<Array<EconomicResource>>;
  /** The name that this agent will be referred to by. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  plans?: Maybe<Array<Plan>>;
  /** The main place an agent is located, often an address where activities occur and mail can be sent. This is usually a mappable geographic location.  It also could be a website address, as in the case of agents who have no physical location. */
  primaryLocation?: Maybe<SpatialThing>;
  processes?: Maybe<Array<Process>>;
  proposals?: Maybe<Array<Proposal>>;
  relationships?: Maybe<Array<AgentRelationship>>;
  relationshipsAsObject?: Maybe<Array<AgentRelationship>>;
  relationshipsAsSubject?: Maybe<Array<AgentRelationship>>;
  roles?: Maybe<Array<AgentRelationshipRole>>;
};


/** A formal or informal group, or legal organization. */
export type OrganizationCommitmentsArgs = {
  filter?: InputMaybe<AgentCommitmentSearchParams>;
};


/** A formal or informal group, or legal organization. */
export type OrganizationEconomicEventsArgs = {
  filter?: InputMaybe<AgentEventSearchParams>;
};


/** A formal or informal group, or legal organization. */
export type OrganizationIntentsArgs = {
  filter?: InputMaybe<IntentSearchParams>;
};


/** A formal or informal group, or legal organization. */
export type OrganizationInventoriedEconomicResourcesArgs = {
  filter?: InputMaybe<AgentResourceSearchParams>;
};


/** A formal or informal group, or legal organization. */
export type OrganizationPlansArgs = {
  filter?: InputMaybe<AgentPlanSearchParams>;
};


/** A formal or informal group, or legal organization. */
export type OrganizationProcessesArgs = {
  filter?: InputMaybe<AgentProcessSearchParams>;
};


/** A formal or informal group, or legal organization. */
export type OrganizationRelationshipsArgs = {
  roleId?: InputMaybe<Scalars['ID']>;
};


/** A formal or informal group, or legal organization. */
export type OrganizationRelationshipsAsObjectArgs = {
  roleId?: InputMaybe<Scalars['ID']>;
};


/** A formal or informal group, or legal organization. */
export type OrganizationRelationshipsAsSubjectArgs = {
  roleId?: InputMaybe<Scalars['ID']>;
};

export type OrganizationResponse = {
  __typename?: 'OrganizationResponse';
  agent: Organization;
};

/** Cursors for pagination */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Cursor pointing to the last of the results returned, to be used with `after` query parameter if the backend supports forward pagination. */
  endCursor?: Maybe<Array<Scalars['Cursor']>>;
  /** True if there are more results after `endCursor`. If unable to be determined, implementations should return `true` to allow for requerying. */
  hasNextPage?: Maybe<Scalars['Boolean']>;
  /** True if there are more results before `startCursor`. If unable to be determined, implementations should return `true` to allow for requerying. */
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  /** Cursor pointing to the first of the results returned, to be used with `before` query parameter if the backend supports reverse pagination. */
  startCursor?: Maybe<Array<Scalars['Cursor']>>;
  /** Returns the total result count, if it can be determined. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type Paginate = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  limit?: InputMaybe<Scalars['Int']>;
};

/** A natural person. */
export type Person = {
  __typename?: 'Person';
  agentType?: Maybe<AgentType>;
  canonicalUrl?: Maybe<Scalars['String']>;
  commitments?: Maybe<Array<Commitment>>;
  displayUsername?: Maybe<Scalars['String']>;
  economicEvents?: Maybe<Array<EconomicEvent>>;
  id: Scalars['ID'];
  /** The uri to an image relevant to the agent, such as a logo, avatar, photo, etc. */
  image?: Maybe<Scalars['URI']>;
  intents?: Maybe<Array<Intent>>;
  inventoriedEconomicResources?: Maybe<Array<EconomicResource>>;
  /** The name that this agent will be referred to by. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  plans?: Maybe<Array<Plan>>;
  /** The main place an agent is located, often an address where activities occur and mail can be sent. This is usually a mappable geographic location.  It also could be a website address, as in the case of agents who have no physical location. */
  primaryLocation?: Maybe<SpatialThing>;
  processes?: Maybe<Array<Process>>;
  proposals?: Maybe<Array<Proposal>>;
  relationships?: Maybe<Array<AgentRelationship>>;
  relationshipsAsObject?: Maybe<Array<AgentRelationship>>;
  relationshipsAsSubject?: Maybe<Array<AgentRelationship>>;
  roles?: Maybe<Array<AgentRelationshipRole>>;
};


/** A natural person. */
export type PersonCommitmentsArgs = {
  filter?: InputMaybe<AgentCommitmentSearchParams>;
};


/** A natural person. */
export type PersonEconomicEventsArgs = {
  filter?: InputMaybe<AgentEventSearchParams>;
};


/** A natural person. */
export type PersonIntentsArgs = {
  filter?: InputMaybe<IntentSearchParams>;
};


/** A natural person. */
export type PersonInventoriedEconomicResourcesArgs = {
  filter?: InputMaybe<AgentResourceSearchParams>;
};


/** A natural person. */
export type PersonPlansArgs = {
  filter?: InputMaybe<AgentPlanSearchParams>;
};


/** A natural person. */
export type PersonProcessesArgs = {
  filter?: InputMaybe<AgentProcessSearchParams>;
};


/** A natural person. */
export type PersonRelationshipsArgs = {
  roleId?: InputMaybe<Scalars['ID']>;
};


/** A natural person. */
export type PersonRelationshipsAsObjectArgs = {
  roleId?: InputMaybe<Scalars['ID']>;
};


/** A natural person. */
export type PersonRelationshipsAsSubjectArgs = {
  roleId?: InputMaybe<Scalars['ID']>;
};

export type PersonResponse = {
  __typename?: 'PersonResponse';
  agent: Person;
};

/** A logical collection of processes that constitute a body of planned work with defined deliverable(s). */
export type Plan = {
  __typename?: 'Plan';
  /** The time the plan was made. */
  created?: Maybe<Scalars['DateTime']>;
  /** The plan is able to be deleted or not. */
  deletable?: Maybe<Scalars['Boolean']>;
  /** The time the plan is expected to be complete. */
  due?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: Maybe<Array<AccountingScope>>;
  independentDemands?: Maybe<Array<Commitment>>;
  /** An informal or formal textual identifier for a plan. Does not imply uniqueness. */
  name?: Maybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  processes?: Maybe<Array<Process>>;
  /** This plan refines a scenario, making it operational. */
  refinementOf?: Maybe<Scenario>;
};


/** A logical collection of processes that constitute a body of planned work with defined deliverable(s). */
export type PlanProcessesArgs = {
  filter?: InputMaybe<PlanProcessSearchParams>;
};

export type PlanCreateParams = {
  /** The time the plan was made. */
  created?: InputMaybe<Scalars['DateTime']>;
  /** The time the plan is expected to be complete. */
  due?: InputMaybe<Scalars['DateTime']>;
  /** An informal or formal textual identifier for a plan. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Scenario`) This plan refines a scenario, making it operational. */
  refinementOf?: InputMaybe<Scalars['ID']>;
};

export type PlanResponse = {
  __typename?: 'PlanResponse';
  plan?: Maybe<Plan>;
};

export type PlanUpdateParams = {
  /** The time the plan was made. */
  created?: InputMaybe<Scalars['DateTime']>;
  /** The time the plan is expected to be complete. */
  due?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** An informal or formal textual identifier for a plan. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Scenario`) This plan refines a scenario, making it operational. */
  refinementOf?: InputMaybe<Scalars['ID']>;
};

export type Post = {
  __typename?: 'Post';
  activity?: Maybe<Activity>;
  id?: Maybe<Scalars['ID']>;
  postContent?: Maybe<PostContent>;
};

export type PostContent = {
  __typename?: 'PostContent';
  htmlBody?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type PostContentInput = {
  htmlBody?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PostFilters = {
  id?: InputMaybe<Scalars['ID']>;
};

/** An activity that changes inputs into outputs.  It could transform or transport economic resource(s). */
export type Process = {
  __typename?: 'Process';
  /** The definition or specification for a process. */
  basedOn?: Maybe<ProcessSpecification>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  classifiedAs?: Maybe<Array<Scalars['URI']>>;
  committedInputs?: Maybe<Array<Commitment>>;
  committedOutputs?: Maybe<Array<Commitment>>;
  /** The process can be safely deleted, has no dependent information. */
  deletable?: Maybe<Scalars['Boolean']>;
  /** The process is complete or not.  This is irrespective of if the original goal has been met, and indicates that no more will be done. */
  finished?: Maybe<Scalars['Boolean']>;
  /** The planned beginning of the process. */
  hasBeginning?: Maybe<Scalars['DateTime']>;
  /** The planned end of the process. */
  hasEnd?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: Maybe<Array<AccountingScope>>;
  inputs?: Maybe<Array<EconomicEvent>>;
  intendedInputs?: Maybe<Array<Intent>>;
  intendedOutputs?: Maybe<Array<Intent>>;
  /** An informal or formal textual identifier for a process. Does not imply uniqueness. */
  name: Scalars['String'];
  /** The process with its inputs and outputs is part of the scenario. */
  nestedIn?: Maybe<Scenario>;
  nextProcesses?: Maybe<Array<Process>>;
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  outputs?: Maybe<Array<EconomicEvent>>;
  /** The process with its inputs and outputs is part of the plan. */
  plannedWithin?: Maybe<Plan>;
  previousProcesses?: Maybe<Array<Process>>;
  /**
   * Tags/Categories in a taxonomy, linked to resourceClassifiedAs:
   * References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping.
   */
  tags?: Maybe<Array<AnyContext>>;
  trace?: Maybe<Array<ProductionFlowItem>>;
  track?: Maybe<Array<ProductionFlowItem>>;
  unplannedEconomicEvents?: Maybe<Array<EconomicEvent>>;
  workingAgents?: Maybe<Array<Agent>>;
};


/** An activity that changes inputs into outputs.  It could transform or transport economic resource(s). */
export type ProcessCommittedInputsArgs = {
  action?: InputMaybe<Scalars['ID']>;
};


/** An activity that changes inputs into outputs.  It could transform or transport economic resource(s). */
export type ProcessCommittedOutputsArgs = {
  action?: InputMaybe<Scalars['ID']>;
};


/** An activity that changes inputs into outputs.  It could transform or transport economic resource(s). */
export type ProcessInputsArgs = {
  action?: InputMaybe<Scalars['ID']>;
};


/** An activity that changes inputs into outputs.  It could transform or transport economic resource(s). */
export type ProcessIntendedInputsArgs = {
  action?: InputMaybe<Scalars['ID']>;
  filter?: InputMaybe<IntentSearchParams>;
};


/** An activity that changes inputs into outputs.  It could transform or transport economic resource(s). */
export type ProcessIntendedOutputsArgs = {
  action?: InputMaybe<Scalars['ID']>;
  filter?: InputMaybe<IntentSearchParams>;
};


/** An activity that changes inputs into outputs.  It could transform or transport economic resource(s). */
export type ProcessOutputsArgs = {
  action?: InputMaybe<Scalars['ID']>;
};


/** An activity that changes inputs into outputs.  It could transform or transport economic resource(s). */
export type ProcessTraceArgs = {
  recurseLimit?: InputMaybe<Scalars['Int']>;
};


/** An activity that changes inputs into outputs.  It could transform or transport economic resource(s). */
export type ProcessTrackArgs = {
  recurseLimit?: InputMaybe<Scalars['Int']>;
};


/** An activity that changes inputs into outputs.  It could transform or transport economic resource(s). */
export type ProcessUnplannedEconomicEventsArgs = {
  action?: InputMaybe<Scalars['ID']>;
};

export type ProcessCreateParams = {
  /** (`ProcessSpecification`) The definition or specification for a process. */
  basedOn?: InputMaybe<Scalars['ID']>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  classifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /** The process is complete or not.  This is irrespective of if the original goal has been met, and indicates that no more will be done. */
  finished?: InputMaybe<Scalars['Boolean']>;
  /** The planned beginning of the process. */
  hasBeginning?: InputMaybe<Scalars['DateTime']>;
  /** The planned end of the process. */
  hasEnd?: InputMaybe<Scalars['DateTime']>;
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  /** An informal or formal textual identifier for a process. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Plan`) The process with its inputs and outputs is part of the plan. */
  plannedWithin?: InputMaybe<Scalars['ID']>;
  /**
   * Tags/Categories in a taxonomy, linked to resourceClassifiedAs:
   * References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping.
   */
  tags?: InputMaybe<Array<Scalars['ID']>>;
};

/** A page of Processes */
export type ProcessPage = {
  __typename?: 'ProcessPage';
  edges: Array<Process>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ProcessResponse = {
  __typename?: 'ProcessResponse';
  process?: Maybe<Process>;
};

/** Specifies the kind of process. */
export type ProcessSpecification = {
  __typename?: 'ProcessSpecification';
  id: Scalars['ID'];
  /** An informal or formal textual identifier for the process. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
};

export type ProcessSpecificationCreateParams = {
  /** An informal or formal textual identifier for the process. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
};

export type ProcessSpecificationResponse = {
  __typename?: 'ProcessSpecificationResponse';
  processSpecification?: Maybe<ProcessSpecification>;
};

export type ProcessSpecificationUpdateParams = {
  id: Scalars['ID'];
  /** An informal or formal textual identifier for the process. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
};

export type ProcessUpdateParams = {
  /** (`ProcessSpecification`) The definition or specification for a process. */
  basedOn?: InputMaybe<Scalars['ID']>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  classifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /** The process is complete or not.  This is irrespective of if the original goal has been met, and indicates that no more will be done. */
  finished?: InputMaybe<Scalars['Boolean']>;
  /** The planned beginning of the process. */
  hasBeginning?: InputMaybe<Scalars['DateTime']>;
  /** The planned end of the process. */
  hasEnd?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  /** An informal or formal textual identifier for a process. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Plan`) The process with its inputs and outputs is part of the plan. */
  plannedWithin?: InputMaybe<Scalars['ID']>;
};

/**
 * A lot or batch, defining a resource produced at the same time in the same way.
 * From DataFoodConsortium vocabulary https://datafoodconsortium.gitbook.io/dfc-standard-documentation/.
 */
export type ProductBatch = {
  __typename?: 'ProductBatch';
  /** The standard unique identifier of the batch. */
  batchNumber: Scalars['String'];
  /** Expiration date of the batch, commonly used for food. */
  expiryDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Date the batch was produced.  Can be derived from the economic event of production. */
  productionDate?: Maybe<Scalars['DateTime']>;
};

export type ProductBatchCreateParams = {
  /** The standard unique identifier of the batch. */
  batchNumber: Scalars['String'];
  /** Expiration date of the batch, commonly used for food. */
  expiryDate?: InputMaybe<Scalars['DateTime']>;
  /** Date the batch was produced.  Can be derived from the economic event of production. */
  productionDate?: InputMaybe<Scalars['DateTime']>;
};

export type ProductBatchResponse = {
  __typename?: 'ProductBatchResponse';
  productBatch: ProductBatch;
};

export type ProductBatchUpdateParams = {
  /** The standard unique identifier of the batch. */
  batchNumber?: InputMaybe<Scalars['String']>;
  /** Expiration date of the batch, commonly used for food. */
  expiryDate?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Date the batch was produced.  Can be derived from the economic event of production. */
  productionDate?: InputMaybe<Scalars['DateTime']>;
};

export type ProductionFlowItem = EconomicEvent | EconomicResource | Process;

export type Profile = {
  __typename?: 'Profile';
  name?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
};

export type ProfileInput = {
  name?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
};

/** Published requests or offers, sometimes with what is expected in return. */
export type Proposal = {
  __typename?: 'Proposal';
  canonicalUrl?: Maybe<Scalars['URI']>;
  /** The date and time the proposal was created. */
  created?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<Agent>;
  /** Location or area where the proposal is valid. */
  eligibleLocation?: Maybe<SpatialThing>;
  /** The beginning time of proposal publication. */
  hasBeginning?: Maybe<Scalars['DateTime']>;
  /** The end time of proposal publication. */
  hasEnd?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: Maybe<Array<AccountingScope>>;
  /** An informal or formal textual identifier for a proposal. Does not imply uniqueness. */
  name?: Maybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** Which Agent(s) (if any were specified) was this proposed to? */
  publishedTo?: Maybe<Array<ProposedTo>>;
  /** Intent(s) published as part of to this proposal */
  publishes?: Maybe<Array<ProposedIntent>>;
  /** This proposal contains unit based quantities, which can be multipied to create commitments; commonly seen in a price list or e-commerce. */
  unitBased?: Maybe<Scalars['Boolean']>;
};

export type ProposalCreateParams = {
  /** The date and time the proposal was created. */
  created?: InputMaybe<Scalars['DateTime']>;
  /** (`SpatialThing`) The location at which this proposal is eligible. */
  eligibleLocation?: InputMaybe<Scalars['ID']>;
  /** The beginning time of proposal publication. */
  hasBeginning?: InputMaybe<Scalars['DateTime']>;
  /** The end time of proposal publication. */
  hasEnd?: InputMaybe<Scalars['DateTime']>;
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  /** An informal or formal textual identifier for a proposal. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** This proposal contains unit based quantities, which can be multipied to create commitments; commonly seen in a price list or e-commerce. */
  unitBased?: InputMaybe<Scalars['Boolean']>;
};

export type ProposalResponse = {
  __typename?: 'ProposalResponse';
  proposal?: Maybe<Proposal>;
};

export type ProposalUpdateParams = {
  /** (`SpatialThing`) The location at which this proposal is eligible. */
  eligibleLocation?: InputMaybe<Scalars['ID']>;
  /** The beginning date/time of proposal publication. */
  hasBeginning?: InputMaybe<Scalars['DateTime']>;
  /** The end time of proposal publication. */
  hasEnd?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  /** An informal or formal textual identifier for a proposal. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** This proposal contains unit based quantities, which can be multipied to create commitments; commonly seen in a price list or e-commerce. */
  unitBased?: InputMaybe<Scalars['Boolean']>;
};

/** A page of proposals */
export type ProposalsPage = {
  __typename?: 'ProposalsPage';
  edges: Array<Proposal>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** Represents many-to-many relationships between Proposals and Intents, supporting including intents in multiple proposals, as well as a proposal including multiple intents. */
export type ProposedIntent = {
  __typename?: 'ProposedIntent';
  id: Scalars['ID'];
  /** The published proposal which this intent is part of. */
  publishedIn: Proposal;
  /** The intent which is part of this published proposal. */
  publishes: Intent;
  /** This is a reciprocal intent of this proposal, not primary. Not meant to be used for intent matching. */
  reciprocal?: Maybe<Scalars['Boolean']>;
};

export type ProposedIntentResponse = {
  __typename?: 'ProposedIntentResponse';
  proposedIntent?: Maybe<ProposedIntent>;
};

/** An agent to which the proposal is to be published.  A proposal can be published to many agents. */
export type ProposedTo = {
  __typename?: 'ProposedTo';
  id: Scalars['ID'];
  /** The proposal that is published to a specific agent. */
  proposed: Proposal;
  /** The agent to which the proposal is published. */
  proposedTo: Agent;
};

export type ProposedToResponse = {
  __typename?: 'ProposedToResponse';
  proposedTo?: Maybe<ProposedTo>;
};

/** Specifies an exchange agreement as part of a recipe. */
export type RecipeExchange = {
  __typename?: 'RecipeExchange';
  id: Scalars['ID'];
  /** An informal or formal textual identifier for a recipe exchange. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
};

export type RecipeExchangeCreateParams = {
  /** An informal or formal textual identifier for a recipe exchange. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
};

export type RecipeExchangeResponse = {
  __typename?: 'RecipeExchangeResponse';
  recipeExchange?: Maybe<RecipeExchange>;
};

export type RecipeExchangeUpdateParams = {
  id: Scalars['ID'];
  /** An informal or formal textual identifier for a recipe exchange. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
};

/** The specification of a resource inflow to, or outflow from, a recipe process. */
export type RecipeFlow = {
  __typename?: 'RecipeFlow';
  /** Relates a process input or output to a verb, such as consume, produce, work, modify, etc. */
  action: Action;
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: Maybe<Measure>;
  id: Scalars['ID'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** The resource definition referenced by this flow in the recipe. */
  recipeFlowResource?: Maybe<RecipeResource>;
  /** Relates an input flow to its process in a recipe. */
  recipeInputOf?: Maybe<RecipeProcess>;
  /** Relates an output flow to its process in a recipe. */
  recipeOutputOf?: Maybe<RecipeProcess>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: Maybe<Measure>;
};

export type RecipeFlowCreateParams = {
  /** (`Action`) Relates a process input or output to a verb, such as consume, produce, work, modify, etc. */
  action: Scalars['ID'];
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: InputMaybe<IMeasure>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`RecipeExchange`) Relates a flow to its exchange agreement in a recipe. */
  recipeClauseOf?: InputMaybe<Scalars['ID']>;
  /** (`RecipeResource`) The resource definition referenced by this flow in the recipe. */
  recipeFlowResource: Scalars['ID'];
  /** (`RecipeProcess`) Relates an input flow to its process in a recipe. */
  recipeInputOf?: InputMaybe<Scalars['ID']>;
  /** (`RecipeProcess`) Relates an output flow to its process in a recipe. */
  recipeOutputOf?: InputMaybe<Scalars['ID']>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: InputMaybe<IMeasure>;
  /** (`ProcessSpecification`) References the ProcessSpecification of the last process the economic resource went through. Stage is used when the last process is important for finding proper resources, such as where the publishing process wants only documents that have gone through the editing process. */
  stage?: InputMaybe<Scalars['ID']>;
  /** The state of the desired economic resource (pass or fail), after coming out of a test or review process. */
  state?: InputMaybe<Scalars['String']>;
};

export type RecipeFlowResponse = {
  __typename?: 'RecipeFlowResponse';
  recipeFlow?: Maybe<RecipeFlow>;
};

export type RecipeFlowUpdateParams = {
  /** (`Action`) Relates a process input or output to a verb, such as consume, produce, work, modify, etc. */
  action?: InputMaybe<Scalars['ID']>;
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: InputMaybe<IMeasure>;
  id: Scalars['ID'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`RecipeResource`) The resource definition referenced by this flow in the recipe. */
  recipeFlowResource?: InputMaybe<Scalars['ID']>;
  /** (`RecipeProcess`) Relates an input flow to its process in a recipe. */
  recipeInputOf?: InputMaybe<Scalars['ID']>;
  /** (`RecipeProcess`) Relates an output flow to its process in a recipe. */
  recipeOutputOf?: InputMaybe<Scalars['ID']>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: InputMaybe<IMeasure>;
  /** (`ProcessSpecification`) References the ProcessSpecification of the last process the economic resource went through. Stage is used when the last process is important for finding proper resources, such as where the publishing process wants only documents that have gone through the editing process. */
  stage?: InputMaybe<Scalars['ID']>;
  /** The state of the desired economic resource (pass or fail), after coming out of a test or review process. */
  state?: InputMaybe<Scalars['String']>;
};

/** Specifies a process in a recipe for use in planning from recipe. */
export type RecipeProcess = {
  __typename?: 'RecipeProcess';
  /** The planned calendar duration of the process as defined for the recipe batch. */
  hasDuration?: Maybe<Duration>;
  id: Scalars['ID'];
  /** An informal or formal textual identifier for a recipe process. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** References a concept in a common taxonomy or other classification scheme for purposes of categorization. */
  processClassifiedAs?: Maybe<Array<Scalars['URI']>>;
  /** The standard specification or definition of a process. */
  processConformsTo?: Maybe<ProcessSpecification>;
};

export type RecipeProcessCreateParams = {
  /** The planned calendar duration of the process as defined for the recipe batch. */
  hasDuration?: InputMaybe<IDuration>;
  /** An informal or formal textual identifier for a recipe process. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** References a concept in a common taxonomy or other classification scheme for purposes of categorization. */
  processClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /** (`ProcessSpecification`) The standard specification or definition of a process. */
  processConformsTo: Scalars['ID'];
};

export type RecipeProcessResponse = {
  __typename?: 'RecipeProcessResponse';
  recipeProcess?: Maybe<RecipeProcess>;
};

export type RecipeProcessUpdateParams = {
  /** The planned calendar duration of the process as defined for the recipe batch. */
  hasDuration?: InputMaybe<IDuration>;
  id: Scalars['ID'];
  /** An informal or formal textual identifier for a recipe process. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** References a concept in a common taxonomy or other classification scheme for purposes of categorization. */
  processClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /** (`ProcessSpecification`) The standard specification or definition of a process. */
  processConformsTo: Scalars['ID'];
};

/** Specifies the resource as part of a recipe, for use in planning from recipe. */
export type RecipeResource = {
  __typename?: 'RecipeResource';
  id: Scalars['ID'];
  /** The uri to an image relevant to the entity, such as a photo, diagram, etc. */
  image?: Maybe<Scalars['URI']>;
  /** An informal or formal textual identifier for a recipe resource. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: Maybe<Array<Scalars['URI']>>;
  /** The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  resourceConformsTo?: Maybe<ResourceSpecification>;
  /** Defines if any resource of that type can be freely substituted for any other resource of that type when used, consumed, traded, etc. */
  substitutable?: Maybe<Scalars['Boolean']>;
  /** The unit used for use action on this resource or work action in the recipe. */
  unitOfEffort?: Maybe<Unit>;
  /** The unit of inventory used for this resource in the recipe. */
  unitOfResource?: Maybe<Unit>;
};

export type RecipeResourceCreateParams = {
  /** The uri to an image relevant to the entity, such as a photo, diagram, etc. */
  image?: InputMaybe<Scalars['URI']>;
  /** An informal or formal textual identifier for a recipe resource. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /** (`ResourceSpecification`) The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  resourceConformsTo?: InputMaybe<Scalars['ID']>;
  /** Defines if any resource of that type can be freely substituted for any other resource of that type when used, consumed, traded, etc. */
  substitutable?: InputMaybe<Scalars['Boolean']>;
  /** (`Unit`) The unit used for use action on this resource or work action in the recipe. */
  unitOfEffort?: InputMaybe<Scalars['ID']>;
  /** (`Unit`) The unit of inventory used for this resource in the recipe. */
  unitOfResource?: InputMaybe<Scalars['ID']>;
};

export type RecipeResourceResponse = {
  __typename?: 'RecipeResourceResponse';
  recipeResource?: Maybe<RecipeResource>;
};

export type RecipeResourceUpdateParams = {
  id: Scalars['ID'];
  /** The uri to an image relevant to the entity, such as a photo, diagram, etc. */
  image?: InputMaybe<Scalars['URI']>;
  /** An informal or formal textual identifier for a recipe resource. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /** (`ResourceSpecification`) The primary resource specification or definition of an existing or potential economic resource. A resource will have only one, as this specifies exactly what the resource is. */
  resourceConformsTo?: InputMaybe<Scalars['ID']>;
  /** Defines if any resource of that type can be freely substituted for any other resource of that type when used, consumed, traded, etc. */
  substitutable?: InputMaybe<Scalars['Boolean']>;
  /** (`Unit`) The unit used for use action on this resource or work action in the recipe. */
  unitOfEffort?: InputMaybe<Scalars['ID']>;
  /** (`Unit`) The unit of inventory used for this resource in the recipe. */
  unitOfResource?: InputMaybe<Scalars['ID']>;
};

export type Replied = {
  __typename?: 'Replied';
  activity?: Maybe<Activity>;
  directReplies?: Maybe<Array<Maybe<Replied>>>;
  post?: Maybe<Post>;
  postContent?: Maybe<PostContent>;
  replyToId?: Maybe<Scalars['ID']>;
  threadId?: Maybe<Scalars['ID']>;
};


export type RepliedDirectRepliesArgs = {
  paginate?: InputMaybe<Paginate>;
};

/**
 * Specification of a kind of resource. Could define a material item, service, digital item, currency account, etc.
 * Used instead of a classification when more information is needed, particularly for recipes.
 */
export type ResourceSpecification = {
  __typename?: 'ResourceSpecification';
  conformingResources?: Maybe<Array<EconomicResource>>;
  /** The default unit used for use or work. */
  defaultUnitOfEffort?: Maybe<Unit>;
  /** The default unit used for the resource itself. */
  defaultUnitOfResource?: Maybe<Unit>;
  id: Scalars['ID'];
  /** The uri to an image relevant to the entity, such as a photo, diagram, etc. */
  image?: Maybe<Scalars['URI']>;
  /** An informal or formal textual identifier for a type of resource. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: Maybe<Array<Scalars['URI']>>;
  /**
   * Tags/Categories in a taxonomy, linked to resourceClassifiedAs:
   * References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping.
   */
  tags?: Maybe<Array<AnyContext>>;
};

export type ResourceSpecificationCreateParams = {
  /** (`Unit`) The default unit used for use or work. */
  defaultUnitOfEffort?: InputMaybe<Scalars['ID']>;
  /** (`Unit`) The default unit used for the resource itself. */
  defaultUnitOfResource?: InputMaybe<Scalars['ID']>;
  /** The uri to an image relevant to the entity, such as a photo, diagram, etc. */
  image?: InputMaybe<Scalars['URI']>;
  /** An informal or formal textual identifier for a type of resource. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /**
   * Tags/Categories in a taxonomy, linked to resourceClassifiedAs:
   * References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping.
   */
  tags?: InputMaybe<Array<Scalars['ID']>>;
};

export type ResourceSpecificationPage = {
  __typename?: 'ResourceSpecificationPage';
  edges: Array<ResourceSpecification>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ResourceSpecificationResponse = {
  __typename?: 'ResourceSpecificationResponse';
  resourceSpecification?: Maybe<ResourceSpecification>;
};

export type ResourceSpecificationUpdateParams = {
  /** (`Unit`) The default unit used for use or work. */
  defaultUnitOfEffort?: InputMaybe<Scalars['ID']>;
  /** (`Unit`) The default unit used for the resource itself. */
  defaultUnitOfResource?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  /** The uri to an image relevant to the entity, such as a photo, diagram, etc. */
  image?: InputMaybe<Scalars['URI']>;
  /** An informal or formal textual identifier for a type of resource. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  /**
   * Tags/Categories in a taxonomy, linked to resourceClassifiedAs:
   * References one or more concepts in a common taxonomy or other classification scheme for purposes of categorization or grouping.
   */
  tags?: InputMaybe<Array<Scalars['ID']>>;
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  /** Share the current user identity with a team member. This will give them full access to the currently authenticated user identity. Warning: anyone you add will have admin-level access over this user identity, meaning they can post as this user, read private messages, etc. */
  addTeamMember?: Maybe<Scalars['String']>;
  boost?: Maybe<Activity>;
  /** Change account password */
  changePassword?: Maybe<Me>;
  /** Confirm email address using a token generated upon `signup` or with `request_confirm_email` and emailed to the user. */
  confirmEmail?: Maybe<Me>;
  createAgentRelationship?: Maybe<AgentRelationshipResponse>;
  createAgentRelationshipRole?: Maybe<AgentRelationshipRoleResponse>;
  createAgreement?: Maybe<AgreementResponse>;
  createAppreciation?: Maybe<AppreciationResponse>;
  /** Create a new Category */
  createCategory?: Maybe<Category>;
  createClaim?: Maybe<ClaimResponse>;
  createCommitment?: Maybe<CommitmentResponse>;
  createEconomicEvent?: Maybe<EconomicEventResponse>;
  createFulfillment?: Maybe<FulfillmentResponse>;
  createIntent?: Maybe<IntentResponse>;
  /** Creates a new need for the logged in user, will ignore any receiver specified. */
  createNeed?: Maybe<IntentResponse>;
  createObservablePhenomenon?: Maybe<ObservablePhenomenon>;
  createObservableProperty?: Maybe<ObservableProperty>;
  createObservation: Observation;
  /** Creates a new offer for the logged in user, will ignore any provider specified. */
  createOffer?: Maybe<IntentResponse>;
  /** Registers a new organization (group agent) with the collaboration space */
  createOrganization?: Maybe<OrganizationResponse>;
  /** Registers a new (human) person with the collaboration space */
  createPerson?: Maybe<PersonResponse>;
  createPlan?: Maybe<PlanResponse>;
  createPost?: Maybe<Post>;
  createProcess?: Maybe<ProcessResponse>;
  createProcessSpecification?: Maybe<ProcessSpecificationResponse>;
  createProductBatch?: Maybe<ProductBatchResponse>;
  createProposal?: Maybe<ProposalResponse>;
  createRecipeExchange?: Maybe<RecipeExchangeResponse>;
  createRecipeFlow?: Maybe<RecipeFlowResponse>;
  createRecipeProcess?: Maybe<RecipeProcessResponse>;
  createRecipeResource?: Maybe<RecipeResourceResponse>;
  createResourceSpecification?: Maybe<ResourceSpecificationResponse>;
  createSatisfaction?: Maybe<SatisfactionResponse>;
  createScenario?: Maybe<ScenarioResponse>;
  createScenarioDefinition?: Maybe<ScenarioDefinitionResponse>;
  createSettlement?: Maybe<SettlementResponse>;
  createSpatialThing?: Maybe<SpatialThingResponse>;
  createUnit?: Maybe<UnitResponse>;
  /** Request a new user identity for the authenticated account */
  createUser?: Maybe<Me>;
  createValueCalculation?: Maybe<ValueCalculationResponse>;
  /** Delete more or less anything */
  delete?: Maybe<AnyContext>;
  deleteAgentRelationship?: Maybe<Scalars['Boolean']>;
  deleteAgentRelationshipRole?: Maybe<Scalars['Boolean']>;
  deleteAgreement?: Maybe<Scalars['Boolean']>;
  deleteAppreciation?: Maybe<Scalars['Boolean']>;
  deleteClaim?: Maybe<Scalars['Boolean']>;
  deleteCommitment?: Maybe<Scalars['Boolean']>;
  deleteEconomicEvent?: Maybe<Scalars['Boolean']>;
  deleteEconomicResource?: Maybe<Scalars['Boolean']>;
  deleteFulfillment?: Maybe<Scalars['Boolean']>;
  deleteIntent?: Maybe<Scalars['Boolean']>;
  deleteObservablePhenomenon?: Maybe<Scalars['Boolean']>;
  deleteObservableProperty?: Maybe<Scalars['Boolean']>;
  deleteObservation?: Maybe<Scalars['Boolean']>;
  /** Erase record of an organization and thus remove it from the collaboration space */
  deleteOrganization?: Maybe<Scalars['Boolean']>;
  /** Erase record of a person and thus remove them from the collaboration space */
  deletePerson?: Maybe<Scalars['Boolean']>;
  deletePlan?: Maybe<Scalars['Boolean']>;
  deleteProcess?: Maybe<Scalars['Boolean']>;
  deleteProcessSpecification?: Maybe<Scalars['Boolean']>;
  deleteProductBatch?: Maybe<Scalars['Boolean']>;
  deleteProposal?: Maybe<Scalars['Boolean']>;
  deleteProposedIntent?: Maybe<Scalars['Boolean']>;
  deleteProposedTo?: Maybe<Scalars['Boolean']>;
  deleteRecipeExchange?: Maybe<Scalars['Boolean']>;
  deleteRecipeFlow?: Maybe<Scalars['Boolean']>;
  deleteRecipeProcess?: Maybe<Scalars['Boolean']>;
  deleteRecipeResource?: Maybe<Scalars['Boolean']>;
  deleteResourceSpecification?: Maybe<Scalars['Boolean']>;
  deleteSatisfaction?: Maybe<Scalars['Boolean']>;
  deleteScenario?: Maybe<Scalars['Boolean']>;
  deleteScenarioDefinition?: Maybe<Scalars['Boolean']>;
  deleteSettlement?: Maybe<Scalars['Boolean']>;
  deleteSpatialThing?: Maybe<Scalars['Boolean']>;
  deleteUnit?: Maybe<Scalars['Boolean']>;
  deleteValueCalculation?: Maybe<Scalars['Boolean']>;
  flag?: Maybe<Activity>;
  follow?: Maybe<Activity>;
  like?: Maybe<Activity>;
  /** Authenticate an account and/or user */
  login?: Maybe<LoginResponse>;
  /** Create a Tag out of something else. You can also directly use the tag() mutation with a pointer ID instead. */
  makeTag?: Maybe<Tag>;
  /**
   * Include an existing intent as part of a proposal.
   * @param publishedIn the (`Proposal`) to include the intent in
   * @param publishes the (`Intent`) to include as part of the proposal
   */
  proposeIntent?: Maybe<ProposedIntentResponse>;
  /**
   * Send a proposal to another agent.
   * @param proposed the (`Proposal`) to send to an involved agent
   * @param proposedTo the (`Agent`) to include in the proposal
   */
  proposeTo?: Maybe<ProposedToResponse>;
  /** Request a new confirmation email */
  requestConfirmEmail?: Maybe<Scalars['String']>;
  /** Request an email to be sent to reset a forgotten password */
  requestResetPassword?: Maybe<Scalars['String']>;
  /** Switch to a user (among those from the authenticated account) */
  selectUser?: Maybe<LoginResponse>;
  /** Register a new account. Returns the created `account_id` */
  signup?: Maybe<Scalars['String']>;
  /** Tag a thing (using a Pointer) with one or more Tags (or Categories, or even Pointers to anything that can become tag) */
  tag?: Maybe<Scalars['Boolean']>;
  updateAgentRelationship?: Maybe<AgentRelationshipResponse>;
  updateAgentRelationshipRole?: Maybe<AgentRelationshipRoleResponse>;
  updateAgreement?: Maybe<AgreementResponse>;
  updateAppreciation?: Maybe<AppreciationResponse>;
  /** Update a category */
  updateCategory?: Maybe<Category>;
  updateClaim?: Maybe<ClaimResponse>;
  updateCommitment?: Maybe<CommitmentResponse>;
  updateEconomicEvent?: Maybe<EconomicEventResponse>;
  updateEconomicResource?: Maybe<EconomicResourceResponse>;
  updateFulfillment?: Maybe<FulfillmentResponse>;
  updateIntent?: Maybe<IntentResponse>;
  updateObservablePhenomenon?: Maybe<ObservablePhenomenon>;
  updateObservableProperty?: Maybe<ObservableProperty>;
  updateObservation: Observation;
  /** Update organization profile details */
  updateOrganization?: Maybe<OrganizationResponse>;
  /** Update profile details */
  updatePerson?: Maybe<PersonResponse>;
  updatePlan?: Maybe<PlanResponse>;
  updateProcess?: Maybe<ProcessResponse>;
  updateProcessSpecification?: Maybe<ProcessSpecificationResponse>;
  updateProductBatch?: Maybe<ProductBatchResponse>;
  updateProposal?: Maybe<ProposalResponse>;
  updateRecipeExchange?: Maybe<RecipeExchangeResponse>;
  updateRecipeFlow?: Maybe<RecipeFlowResponse>;
  updateRecipeProcess?: Maybe<RecipeProcessResponse>;
  updateRecipeResource?: Maybe<RecipeResourceResponse>;
  updateResourceSpecification?: Maybe<ResourceSpecificationResponse>;
  updateSatisfaction?: Maybe<SatisfactionResponse>;
  updateScenario?: Maybe<ScenarioResponse>;
  updateScenarioDefinition?: Maybe<ScenarioDefinitionResponse>;
  updateSettlement?: Maybe<SettlementResponse>;
  updateSpatialThing?: Maybe<SpatialThingResponse>;
  updateUnit?: Maybe<UnitResponse>;
  /** Edit user profile */
  updateUser?: Maybe<Me>;
  updateValueCalculation?: Maybe<ValueCalculationResponse>;
};


export type RootMutationTypeAddTeamMemberArgs = {
  label: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type RootMutationTypeBoostArgs = {
  id: Scalars['String'];
};


export type RootMutationTypeChangePasswordArgs = {
  oldPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type RootMutationTypeConfirmEmailArgs = {
  token: Scalars['String'];
};


export type RootMutationTypeCreateAgentRelationshipArgs = {
  relationship: AgentRelationshipCreateParams;
};


export type RootMutationTypeCreateAgentRelationshipRoleArgs = {
  agentRelationshipRole?: InputMaybe<AgentRelationshipRoleCreateParams>;
};


export type RootMutationTypeCreateAgreementArgs = {
  agreement?: InputMaybe<AgreementCreateParams>;
};


export type RootMutationTypeCreateAppreciationArgs = {
  appreciation: AppreciationCreateParams;
};


export type RootMutationTypeCreateCategoryArgs = {
  category?: InputMaybe<CategoryInput>;
};


export type RootMutationTypeCreateClaimArgs = {
  claim: ClaimCreateParams;
};


export type RootMutationTypeCreateCommitmentArgs = {
  commitment?: InputMaybe<CommitmentCreateParams>;
};


export type RootMutationTypeCreateEconomicEventArgs = {
  event: EconomicEventCreateParams;
  newInventoriedResource?: InputMaybe<EconomicResourceCreateParams>;
};


export type RootMutationTypeCreateFulfillmentArgs = {
  fulfillment: FulfillmentCreateParams;
};


export type RootMutationTypeCreateIntentArgs = {
  intent?: InputMaybe<IntentCreateParams>;
};


export type RootMutationTypeCreateNeedArgs = {
  intent?: InputMaybe<IntentCreateParams>;
};


export type RootMutationTypeCreateObservablePhenomenonArgs = {
  observablePhenomenon: ObservablePhenomenonInputParams;
};


export type RootMutationTypeCreateObservablePropertyArgs = {
  observableProperty: ObservablePropertyInputParams;
};


export type RootMutationTypeCreateObservationArgs = {
  observation: ObservationInputParams;
};


export type RootMutationTypeCreateOfferArgs = {
  intent?: InputMaybe<IntentCreateParams>;
};


export type RootMutationTypeCreateOrganizationArgs = {
  organization: AgentCreateParams;
};


export type RootMutationTypeCreatePersonArgs = {
  person: AgentCreateParams;
};


export type RootMutationTypeCreatePlanArgs = {
  plan: PlanCreateParams;
};


export type RootMutationTypeCreatePostArgs = {
  postContent: PostContentInput;
  replyTo?: InputMaybe<Scalars['ID']>;
  toCircles?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type RootMutationTypeCreateProcessArgs = {
  process: ProcessCreateParams;
};


export type RootMutationTypeCreateProcessSpecificationArgs = {
  processSpecification?: InputMaybe<ProcessSpecificationCreateParams>;
};


export type RootMutationTypeCreateProductBatchArgs = {
  productBatch: ProductBatchCreateParams;
};


export type RootMutationTypeCreateProposalArgs = {
  proposal?: InputMaybe<ProposalCreateParams>;
};


export type RootMutationTypeCreateRecipeExchangeArgs = {
  recipeExchange?: InputMaybe<RecipeExchangeCreateParams>;
};


export type RootMutationTypeCreateRecipeFlowArgs = {
  recipeFlow?: InputMaybe<RecipeFlowCreateParams>;
};


export type RootMutationTypeCreateRecipeProcessArgs = {
  recipeProcess?: InputMaybe<RecipeProcessCreateParams>;
};


export type RootMutationTypeCreateRecipeResourceArgs = {
  recipeResource?: InputMaybe<RecipeResourceCreateParams>;
};


export type RootMutationTypeCreateResourceSpecificationArgs = {
  resourceSpecification?: InputMaybe<ResourceSpecificationCreateParams>;
};


export type RootMutationTypeCreateSatisfactionArgs = {
  satisfaction?: InputMaybe<SatisfactionCreateParams>;
};


export type RootMutationTypeCreateScenarioArgs = {
  plan: ScenarioCreateParams;
};


export type RootMutationTypeCreateScenarioDefinitionArgs = {
  plan: ScenarioDefinitionCreateParams;
};


export type RootMutationTypeCreateSettlementArgs = {
  settlement: SettlementCreateParams;
};


export type RootMutationTypeCreateSpatialThingArgs = {
  inScopeOf?: InputMaybe<Scalars['ID']>;
  spatialThing: SpatialThingCreateParams;
};


export type RootMutationTypeCreateUnitArgs = {
  unit: UnitCreateParams;
};


export type RootMutationTypeCreateUserArgs = {
  character: CharacterInput;
  profile: ProfileInput;
};


export type RootMutationTypeCreateValueCalculationArgs = {
  valueCalculation: ValueCalculationCreateParams;
};


export type RootMutationTypeDeleteArgs = {
  contextId: Scalars['String'];
};


export type RootMutationTypeDeleteAgentRelationshipArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteAgentRelationshipRoleArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteAgreementArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteAppreciationArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteClaimArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteCommitmentArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteEconomicEventArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteEconomicResourceArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteFulfillmentArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteIntentArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteObservablePhenomenonArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteObservablePropertyArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteObservationArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteOrganizationArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeletePersonArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeletePlanArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteProcessArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteProcessSpecificationArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteProductBatchArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteProposalArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteProposedIntentArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteProposedToArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteRecipeExchangeArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteRecipeFlowArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteRecipeProcessArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteRecipeResourceArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteResourceSpecificationArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteSatisfactionArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteScenarioArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteScenarioDefinitionArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteSettlementArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteSpatialThingArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteUnitArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeDeleteValueCalculationArgs = {
  id: Scalars['ID'];
};


export type RootMutationTypeFlagArgs = {
  id: Scalars['String'];
};


export type RootMutationTypeFollowArgs = {
  id: Scalars['String'];
  username: Scalars['String'];
};


export type RootMutationTypeLikeArgs = {
  id: Scalars['String'];
};


export type RootMutationTypeLoginArgs = {
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
};


export type RootMutationTypeMakeTagArgs = {
  contextId?: InputMaybe<Scalars['String']>;
};


export type RootMutationTypeProposeIntentArgs = {
  publishedIn: Scalars['ID'];
  publishes: Scalars['ID'];
  reciprocal?: InputMaybe<Scalars['Boolean']>;
};


export type RootMutationTypeProposeToArgs = {
  proposed: Scalars['ID'];
  proposedTo: Scalars['ID'];
};


export type RootMutationTypeRequestConfirmEmailArgs = {
  email: Scalars['String'];
};


export type RootMutationTypeRequestResetPasswordArgs = {
  email: Scalars['String'];
};


export type RootMutationTypeSelectUserArgs = {
  username: Scalars['String'];
};


export type RootMutationTypeSignupArgs = {
  email: Scalars['String'];
  inviteCode?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};


export type RootMutationTypeTagArgs = {
  tags: Array<InputMaybe<Scalars['String']>>;
  thing: Scalars['String'];
};


export type RootMutationTypeUpdateAgentRelationshipArgs = {
  relationship: AgentRelationshipUpdateParams;
};


export type RootMutationTypeUpdateAgentRelationshipRoleArgs = {
  agentRelationshipRole?: InputMaybe<AgentRelationshipRoleUpdateParams>;
};


export type RootMutationTypeUpdateAgreementArgs = {
  agreement?: InputMaybe<AgreementUpdateParams>;
};


export type RootMutationTypeUpdateAppreciationArgs = {
  appreciation: AppreciationUpdateParams;
};


export type RootMutationTypeUpdateCategoryArgs = {
  category?: InputMaybe<CategoryInput>;
  categoryId?: InputMaybe<Scalars['ID']>;
};


export type RootMutationTypeUpdateClaimArgs = {
  claim: ClaimUpdateParams;
};


export type RootMutationTypeUpdateCommitmentArgs = {
  commitment?: InputMaybe<CommitmentUpdateParams>;
};


export type RootMutationTypeUpdateEconomicEventArgs = {
  event: EconomicEventUpdateParams;
};


export type RootMutationTypeUpdateEconomicResourceArgs = {
  resource: EconomicResourceUpdateParams;
};


export type RootMutationTypeUpdateFulfillmentArgs = {
  fulfillment: FulfillmentUpdateParams;
};


export type RootMutationTypeUpdateIntentArgs = {
  intent?: InputMaybe<IntentUpdateParams>;
};


export type RootMutationTypeUpdateObservablePhenomenonArgs = {
  observablePhenomenon: ObservablePhenomenonInputParams;
};


export type RootMutationTypeUpdateObservablePropertyArgs = {
  observableProperty: ObservablePropertyInputParams;
};


export type RootMutationTypeUpdateObservationArgs = {
  observation: ObservationInputParams;
};


export type RootMutationTypeUpdateOrganizationArgs = {
  organization: AgentUpdateParams;
};


export type RootMutationTypeUpdatePersonArgs = {
  person: AgentUpdateParams;
};


export type RootMutationTypeUpdatePlanArgs = {
  plan: PlanUpdateParams;
};


export type RootMutationTypeUpdateProcessArgs = {
  process: ProcessUpdateParams;
};


export type RootMutationTypeUpdateProcessSpecificationArgs = {
  processSpecification?: InputMaybe<ProcessSpecificationUpdateParams>;
};


export type RootMutationTypeUpdateProductBatchArgs = {
  productBatch: ProductBatchUpdateParams;
};


export type RootMutationTypeUpdateProposalArgs = {
  proposal?: InputMaybe<ProposalUpdateParams>;
};


export type RootMutationTypeUpdateRecipeExchangeArgs = {
  recipeExchange?: InputMaybe<RecipeExchangeUpdateParams>;
};


export type RootMutationTypeUpdateRecipeFlowArgs = {
  recipeFlow?: InputMaybe<RecipeFlowUpdateParams>;
};


export type RootMutationTypeUpdateRecipeProcessArgs = {
  recipeProcess?: InputMaybe<RecipeProcessUpdateParams>;
};


export type RootMutationTypeUpdateRecipeResourceArgs = {
  recipeResource?: InputMaybe<RecipeResourceUpdateParams>;
};


export type RootMutationTypeUpdateResourceSpecificationArgs = {
  resourceSpecification?: InputMaybe<ResourceSpecificationUpdateParams>;
};


export type RootMutationTypeUpdateSatisfactionArgs = {
  satisfaction?: InputMaybe<SatisfactionUpdateParams>;
};


export type RootMutationTypeUpdateScenarioArgs = {
  plan: ScenarioUpdateParams;
};


export type RootMutationTypeUpdateScenarioDefinitionArgs = {
  plan: ScenarioDefinitionUpdateParams;
};


export type RootMutationTypeUpdateSettlementArgs = {
  s0ettlement: SettlementUpdateParams;
};


export type RootMutationTypeUpdateSpatialThingArgs = {
  spatialThing: SpatialThingUpdateParams;
};


export type RootMutationTypeUpdateUnitArgs = {
  unit: UnitUpdateParams;
};


export type RootMutationTypeUpdateUserArgs = {
  profile: ProfileInput;
};


export type RootMutationTypeUpdateValueCalculationArgs = {
  valueCalculation: ValueCalculationUpdateParams;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  action?: Maybe<Action>;
  actions?: Maybe<Array<Action>>;
  /** Get an activity */
  activity?: Maybe<Activity>;
  /** Find an agent (person or organization) by their ID */
  agent?: Maybe<Agent>;
  /** Retrieve details of an agent relationship by its ID */
  agentRelationship?: Maybe<AgentRelationship>;
  /** Retrieve details of an agent relationship role by its ID */
  agentRelationshipRole?: Maybe<AgentRelationshipRole>;
  /** Retrieve all possible kinds of associations that agents may have with one another in this collaboration space */
  agentRelationshipRoles?: Maybe<Array<AgentRelationshipRole>>;
  /** Retrieve details of all the relationships between all agents registered in this collaboration space */
  agentRelationships?: Maybe<Array<AgentRelationship>>;
  /** Loads all agents publicly registered within this collaboration space */
  agents?: Maybe<Array<Agent>>;
  agreement?: Maybe<Agreement>;
  agreements?: Maybe<Array<Agreement>>;
  /** Get list of categories we know about */
  categories: CategoriesPage;
  /** Get a category by ID */
  category?: Maybe<Category>;
  claim?: Maybe<Claim>;
  claims?: Maybe<Array<Claim>>;
  commitment?: Maybe<Commitment>;
  commitments?: Maybe<Array<Commitment>>;
  economicEvent?: Maybe<EconomicEvent>;
  economicEvents?: Maybe<Array<EconomicEvent>>;
  economicEventsFiltered?: Maybe<Array<EconomicEvent>>;
  /** Get paginated list of economic events */
  economicEventsPages: EconomicEventPage;
  economicResource?: Maybe<EconomicResource>;
  economicResources?: Maybe<Array<EconomicResource>>;
  /** TEMPORARY - get filtered but non-paginated list of resources */
  economicResourcesFiltered?: Maybe<Array<Maybe<EconomicResource>>>;
  /** Get paginated list of economic resources */
  economicResourcesPages: EconomicResourcePage;
  /** Get activities in a feed */
  feed?: Maybe<Array<Maybe<Activity>>>;
  fulfillment?: Maybe<Fulfillment>;
  fulfillments?: Maybe<Array<Fulfillment>>;
  intent?: Maybe<Intent>;
  intents?: Maybe<Array<Intent>>;
  /** Get paginated list of intents */
  intentsPages: IntentsPage;
  /** Get information about and for the current user */
  me?: Maybe<Me>;
  measure?: Maybe<Measure>;
  measures?: Maybe<Array<Measure>>;
  measuresPages: MeasuresPage;
  /** Loads details of the currently authenticated REA agent */
  myAgent?: Maybe<Agent>;
  /** Get paginated list of active needs (intents with no provider) */
  needsPages: IntentsPage;
  observablePhenomenon?: Maybe<ObservablePhenomenon>;
  /** Get paginated list of observable phenomenon */
  observablePhenomenonPages: ObservablePhenomenonPage;
  observablePhenomenons?: Maybe<Array<ObservablePhenomenon>>;
  observableProperties?: Maybe<Array<ObservableProperty>>;
  /** Get paginated list of observable properties */
  observablePropertiesPages: ObservablePropertyPage;
  observableProperty?: Maybe<ObservableProperty>;
  observation?: Maybe<Observation>;
  observations?: Maybe<Array<Observation>>;
  /** Get paginated list of observations */
  observationsPages: ObservationPage;
  /** Get paginated list of active offers (intents with no receiver) */
  offersPages: IntentsPage;
  /** Find an organization (group) agent by its ID */
  organization?: Maybe<Organization>;
  /** Loads all organizations publicly registered within this collaboration space */
  organizations?: Maybe<Array<Organization>>;
  /** Get paginated list of organizations */
  organizationsPages: AgentsPage;
  /** Loads all people who have publicly registered with this collaboration space. */
  people?: Maybe<Array<Person>>;
  /** Get paginated list of people */
  peoplePages: AgentsPage;
  /** Find a person by their ID */
  person?: Maybe<Person>;
  plan?: Maybe<Plan>;
  plans?: Maybe<Array<Plan>>;
  /** Get a post */
  post?: Maybe<Post>;
  /** Get all posts */
  posts?: Maybe<Array<Maybe<Post>>>;
  process?: Maybe<Process>;
  processSpecification?: Maybe<ProcessSpecification>;
  processSpecifications?: Maybe<Array<ProcessSpecification>>;
  processes?: Maybe<Array<Process>>;
  /** Get paginated list of processes */
  processesPages: ProcessPage;
  productBatch?: Maybe<ProductBatch>;
  productBatches?: Maybe<Array<ProductBatch>>;
  proposal?: Maybe<Proposal>;
  proposals?: Maybe<Array<Proposal>>;
  /** TEMPORARY - get filtered but non-paginated list of proposals */
  proposalsFiltered?: Maybe<Array<Maybe<Proposal>>>;
  /** Get paginated list of proposals */
  proposalsPages: ProposalsPage;
  recipeExchange?: Maybe<RecipeExchange>;
  recipeExchanges?: Maybe<Array<RecipeExchange>>;
  recipeFlow?: Maybe<RecipeFlow>;
  recipeFlows?: Maybe<Array<RecipeFlow>>;
  recipeProcess?: Maybe<RecipeProcess>;
  recipeProcesses?: Maybe<Array<RecipeProcess>>;
  recipeResource?: Maybe<RecipeResource>;
  recipeResources?: Maybe<Array<RecipeResource>>;
  resourceSpecification?: Maybe<ResourceSpecification>;
  resourceSpecifications?: Maybe<Array<ResourceSpecification>>;
  /** Get paginated list of resource specifications */
  resourceSpecificationsPages: ResourceSpecificationPage;
  satisfaction?: Maybe<Satisfaction>;
  satisfactions?: Maybe<Array<Satisfaction>>;
  scenario?: Maybe<Scenario>;
  scenarioDefinition?: Maybe<ScenarioDefinition>;
  scenarioDefinitions?: Maybe<Array<ScenarioDefinition>>;
  scenarios?: Maybe<Array<Scenario>>;
  settlement?: Maybe<Settlement>;
  settlements?: Maybe<Array<Settlement>>;
  spatialThing?: Maybe<SpatialThing>;
  spatialThings?: Maybe<Array<SpatialThing>>;
  spatialThingsPages: SpatialThingsPage;
  /** Get a tag by ID */
  tag?: Maybe<Tag>;
  unit?: Maybe<Unit>;
  units?: Maybe<Array<Unit>>;
  unitsPages: UnitsPage;
  /** Get a user */
  user?: Maybe<User>;
  valueCalculation?: Maybe<ValueCalculation>;
  valueCalculationsPages: ValueCalculationPage;
};


export type RootQueryTypeActionArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeActivityArgs = {
  filter?: InputMaybe<ActivityFilters>;
};


export type RootQueryTypeAgentArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeAgentRelationshipArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeAgentRelationshipRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeAgentRelationshipRolesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeAgentRelationshipsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeAgentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeAgreementArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeAgreementsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeCategoriesArgs = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeCategoryArgs = {
  categoryId?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeClaimArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeClaimsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeCommitmentArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeCommitmentsArgs = {
  filter?: InputMaybe<AgentCommitmentSearchParams>;
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeEconomicEventArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeEconomicEventsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeEconomicEventsFilteredArgs = {
  action?: InputMaybe<Scalars['ID']>;
  endDate?: InputMaybe<Scalars['String']>;
  providerId?: InputMaybe<Scalars['ID']>;
  receiverId?: InputMaybe<Scalars['ID']>;
  resourceClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  startDate?: InputMaybe<Scalars['String']>;
};


export type RootQueryTypeEconomicEventsPagesArgs = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeEconomicResourceArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeEconomicResourcesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeEconomicResourcesFilteredArgs = {
  agent?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  currentLocation?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  geolocation?: InputMaybe<GeolocationFilters>;
  inScopeOf?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  state?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  trackingIdentifier?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type RootQueryTypeEconomicResourcesPagesArgs = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeFeedArgs = {
  filter?: InputMaybe<FeedFilters>;
  paginate?: InputMaybe<Paginate>;
};


export type RootQueryTypeFulfillmentArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeFulfillmentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeIntentArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeIntentsArgs = {
  filter?: InputMaybe<IntentSearchParams>;
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeIntentsPagesArgs = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeMeasureArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeMeasuresArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeMeasuresPagesArgs = {
  after?: InputMaybe<Array<InputMaybe<Scalars['Cursor']>>>;
  before?: InputMaybe<Array<InputMaybe<Scalars['Cursor']>>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeNeedsPagesArgs = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeObservablePhenomenonArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeObservablePhenomenonPagesArgs = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeObservablePhenomenonsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeObservablePropertiesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeObservablePropertiesPagesArgs = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeObservablePropertyArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeObservationArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeObservationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeObservationsPagesArgs = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  agent?: InputMaybe<Array<Scalars['ID']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  hasFeatureOfInterest?: InputMaybe<Array<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  madeBySensor?: InputMaybe<Array<Scalars['ID']>>;
  observedDuring?: InputMaybe<Array<Scalars['ID']>>;
  observedProperty?: InputMaybe<Array<Scalars['ID']>>;
  provider?: InputMaybe<Array<Scalars['ID']>>;
};


export type RootQueryTypeOffersPagesArgs = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeOrganizationArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeOrganizationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeOrganizationsPagesArgs = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypePeopleArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypePeoplePagesArgs = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypePersonArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypePlanArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypePlansArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypePostArgs = {
  filter?: InputMaybe<PostFilters>;
};


export type RootQueryTypeProcessArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeProcessSpecificationArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeProcessSpecificationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeProcessesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeProcessesPagesArgs = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeProductBatchArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeProductBatchesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeProposalArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeProposalsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeProposalsFilteredArgs = {
  agent?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  atLocation?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  geolocation?: InputMaybe<GeolocationFilters>;
  inScopeOf?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type RootQueryTypeProposalsPagesArgs = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeRecipeExchangeArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeRecipeExchangesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeRecipeFlowArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeRecipeFlowsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeRecipeProcessArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeRecipeProcessesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeRecipeResourceArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeRecipeResourcesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeResourceSpecificationArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeResourceSpecificationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeResourceSpecificationsPagesArgs = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  inScopeOf?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type RootQueryTypeSatisfactionArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeSatisfactionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeScenarioArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeScenarioDefinitionArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeScenarioDefinitionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeScenariosArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeSettlementArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeSettlementsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeSpatialThingArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeSpatialThingsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeSpatialThingsPagesArgs = {
  after?: InputMaybe<Array<InputMaybe<Scalars['Cursor']>>>;
  before?: InputMaybe<Array<InputMaybe<Scalars['Cursor']>>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeTagArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeUnitArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeUnitsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeUnitsPagesArgs = {
  after?: InputMaybe<Array<InputMaybe<Scalars['Cursor']>>>;
  before?: InputMaybe<Array<InputMaybe<Scalars['Cursor']>>>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type RootQueryTypeUserArgs = {
  filter?: InputMaybe<CharacterFilters>;
};


export type RootQueryTypeValueCalculationArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeValueCalculationsPagesArgs = {
  after?: InputMaybe<Array<Scalars['Cursor']>>;
  before?: InputMaybe<Array<Scalars['Cursor']>>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type RootSubscriptionType = {
  __typename?: 'RootSubscriptionType';
  intentCreated?: Maybe<Intent>;
};


export type RootSubscriptionTypeIntentCreatedArgs = {
  context?: InputMaybe<Scalars['String']>;
};

/** Represents many-to-many relationships between intents and commitments or events that partially or full satisfy one or more intents. */
export type Satisfaction = {
  __typename?: 'Satisfaction';
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: Maybe<Measure>;
  id: Scalars['ID'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: Maybe<Measure>;
  /** A commitment or economic event fully or partially satisfying an intent. */
  satisfiedBy: EventOrCommitment;
  /** An intent satisfied fully or partially by an economic event or commitment. */
  satisfies: Intent;
};

export type SatisfactionCreateParams = {
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: InputMaybe<IMeasure>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: InputMaybe<IMeasure>;
  /** (`Commitment`|`EconomicEvent`) A commitment or economic event fully or partially satisfying an intent. */
  satisfiedBy: Scalars['ID'];
  /** (`Intent`) An intent satisfied fully or partially by an economic event or commitment. */
  satisfies: Scalars['ID'];
};

export type SatisfactionResponse = {
  __typename?: 'SatisfactionResponse';
  satisfaction?: Maybe<Satisfaction>;
};

export type SatisfactionUpdateParams = {
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: InputMaybe<IMeasure>;
  id: Scalars['ID'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: InputMaybe<IMeasure>;
  /** (`Commitment`|`EconomicEvent`) A commitment or economic event fully or partially satisfying an intent. */
  satisfiedBy?: InputMaybe<Scalars['ID']>;
  /** (`Intent`) An intent satisfied fully or partially by an economic event or commitment. */
  satisfies?: InputMaybe<Scalars['ID']>;
};

/** An estimated or analytical logical collection of higher level processes used for budgeting, analysis, plan refinement, etc. */
export type Scenario = {
  __typename?: 'Scenario';
  /** The scenario definition for this scenario, for example yearly budget. */
  definedAs?: Maybe<ScenarioDefinition>;
  /** The beginning date/time of the scenario, often the beginning of an accounting period. */
  hasBeginning?: Maybe<Scalars['DateTime']>;
  /** The ending date/time of the scenario, often the end of an accounting period. */
  hasEnd?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: Maybe<Array<AccountingScope>>;
  /** An informal or formal textual identifier for a scenario. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** This scenario refines another scenario, often as time moves closer or for more detail. */
  refinementOf?: Maybe<Scenario>;
};

export type ScenarioCreateParams = {
  /** (`ScenarioDefinition`) The scenario definition for this scenario, for example yearly budget. */
  definedAs: Scalars['ID'];
  /** The beginning date/time of the scenario, often the beginning of an accounting period. */
  hasBeginning?: InputMaybe<Scalars['DateTime']>;
  /** The ending date/time of the scenario, often the end of an accounting period. */
  hasEnd?: InputMaybe<Scalars['DateTime']>;
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  /** An informal or formal textual identifier for a scenario. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Scenario`) This scenario refines another scenario, often as time moves closer or for more detail. */
  refinementOf?: InputMaybe<Scalars['ID']>;
};

/** The type definition of one or more scenarios, such as Yearly Budget. */
export type ScenarioDefinition = {
  __typename?: 'ScenarioDefinition';
  /** The duration of the scenario, often an accounting period. */
  hasDuration?: Maybe<Duration>;
  id: Scalars['ID'];
  /** An informal or formal textual identifier for a scenario definition. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
};

export type ScenarioDefinitionCreateParams = {
  /** The duration of the scenario, often an accounting period. */
  hasDuration?: InputMaybe<IDuration>;
  /** An informal or formal textual identifier for a scenario definition. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
};

export type ScenarioDefinitionResponse = {
  __typename?: 'ScenarioDefinitionResponse';
  scenarioDefinition?: Maybe<ScenarioDefinition>;
};

export type ScenarioDefinitionUpdateParams = {
  /** The duration of the scenario, often an accounting period. */
  hasDuration?: InputMaybe<IDuration>;
  id: Scalars['ID'];
  /** An informal or formal textual identifier for a scenario definition. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
};

export type ScenarioResponse = {
  __typename?: 'ScenarioResponse';
  scenario?: Maybe<Scenario>;
};

export type ScenarioUpdateParams = {
  /** (`ScenarioDefinition`) The scenario definition for this scenario, for example yearly budget. */
  definedAs: Scalars['ID'];
  /** The beginning date/time of the scenario, often the beginning of an accounting period. */
  hasBeginning?: InputMaybe<Scalars['DateTime']>;
  /** The ending date/time of the scenario, often the end of an accounting period. */
  hasEnd?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  /** An informal or formal textual identifier for a scenario. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** (`Scenario`) This scenario refines another scenario, often as time moves closer or for more detail. */
  refinementOf?: InputMaybe<Scalars['ID']>;
};

/** Represents many-to-many relationships between claim and economic events that fully or partially settle one or more claims. */
export type Settlement = {
  __typename?: 'Settlement';
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: Maybe<Measure>;
  id: Scalars['ID'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: Maybe<Measure>;
  /** The economic event fully or partially settling a claim. */
  settledBy: EconomicEvent;
  /** A claim which is fully or partially settled by an economic event. */
  settles: Claim;
};

export type SettlementCreateParams = {
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: InputMaybe<IMeasure>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: InputMaybe<IMeasure>;
  /** (`EconomicEvent`) The economic event fully or partially settling a claim. */
  settledBy: Scalars['ID'];
  /** (`Claim`) A claim which is fully or partially settled by an economic event. */
  settles: Scalars['ID'];
};

export type SettlementResponse = {
  __typename?: 'SettlementResponse';
  settlement?: Maybe<Settlement>;
};

export type SettlementUpdateParams = {
  /** The amount and unit of the work or use or citation effort-based action. This is often a time duration, but also could be cycle counts or other measures of effort or usefulness. */
  effortQuantity?: InputMaybe<IMeasure>;
  id: Scalars['ID'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
  /** The amount and unit of the economic resource counted or inventoried. */
  resourceQuantity?: InputMaybe<IMeasure>;
  /** (`EconomicEvent`) The economic event fully or partially settling a claim. */
  settledBy?: InputMaybe<Scalars['ID']>;
  /** (`Claim`) A claim which is fully or partially settled by an economic event. */
  settles?: InputMaybe<Scalars['ID']>;
};

/** A physical mappable location. */
export type SpatialThing = {
  __typename?: 'SpatialThing';
  /** Altitude. */
  alt?: Maybe<Scalars['Float']>;
  canonicalUrl?: Maybe<Scalars['String']>;
  displayUsername?: Maybe<Scalars['String']>;
  geom?: Maybe<Scalars['Json']>;
  id: Scalars['ID'];
  inScopeOf?: Maybe<AnyContext>;
  /** Latitude. */
  lat?: Maybe<Scalars['Float']>;
  /** Longitude. */
  long?: Maybe<Scalars['Float']>;
  /** An address that will be recognized as mappable by mapping software. */
  mappableAddress?: Maybe<Scalars['String']>;
  /** An informal or formal textual identifier for a location. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
};

export type SpatialThingCreateParams = {
  /** Altitude. */
  alt?: InputMaybe<Scalars['Float']>;
  /** Latitude. */
  lat?: InputMaybe<Scalars['Float']>;
  /** Longitude. */
  long?: InputMaybe<Scalars['Float']>;
  /** An address that will be recognized as mappable by mapping software. */
  mappableAddress?: InputMaybe<Scalars['String']>;
  /** An informal or formal textual identifier for a location. Does not imply uniqueness. */
  name: Scalars['String'];
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
};

export type SpatialThingResponse = {
  __typename?: 'SpatialThingResponse';
  spatialThing?: Maybe<SpatialThing>;
};

export type SpatialThingUpdateParams = {
  /** Altitude. */
  alt?: InputMaybe<Scalars['Float']>;
  id: Scalars['ID'];
  /** Latitude. */
  lat?: InputMaybe<Scalars['Float']>;
  /** Longitude. */
  long?: InputMaybe<Scalars['Float']>;
  /** An address that will be recognized as mappable by mapping software. */
  mappableAddress?: InputMaybe<Scalars['String']>;
  /** An informal or formal textual identifier for a location. Does not imply uniqueness. */
  name?: InputMaybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: InputMaybe<Scalars['String']>;
};

export type SpatialThingsPage = {
  __typename?: 'SpatialThingsPage';
  edges?: Maybe<Array<Maybe<SpatialThing>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

/** A tag could be a category or hashtag or user or community or etc */
export type Tag = {
  __typename?: 'Tag';
  /** Unique URL (on original instance) */
  canonicalUrl?: Maybe<Scalars['String']>;
  /** The object used as a tag (eg. Category, Geolocation, Hashtag, User...) */
  context?: Maybe<AnyContext>;
  /** Unique URL (on original instance) */
  displayUsername?: Maybe<Scalars['String']>;
  /** Type of tag (i.e. context) */
  facet?: Maybe<Scalars['String']>;
  /** The primary key of the tag */
  id?: Maybe<Scalars['ID']>;
  /** Name of the tag (derived from its context) */
  name?: Maybe<Scalars['String']>;
  /** What character is used to trigger this tag (eg. @, #, +) */
  prefix?: Maybe<Scalars['String']>;
  /** Description of the tag (derived from its context) */
  summary?: Maybe<Scalars['String']>;
  /** Objects that were tagged with this tag */
  tagged?: Maybe<Array<Maybe<AnyContext>>>;
};

/** Defines the unit of time measured in a temporal `Duration`. */
export enum TimeUnit {
  Day = 'day',
  Hour = 'hour',
  Minute = 'minute',
  Month = 'month',
  Second = 'second',
  Week = 'week',
  Year = 'year'
}

/**
 * Defines a unit of measurement, along with its display symbol.
 * From OM2 vocabulary.
 */
export type Unit = {
  __typename?: 'Unit';
  /** Added for CommonsPub */
  canonicalUrl?: Maybe<Scalars['URI']>;
  id: Scalars['ID'];
  inScopeOf?: Maybe<AnyContext>;
  /** A human readable label for the unit, can be language specific. */
  label: Scalars['String'];
  /** A standard display symbol for a unit of measure. */
  symbol: Scalars['String'];
};

export type UnitCreateParams = {
  inScopeOf?: InputMaybe<Scalars['ID']>;
  /** A human readable label for the unit, can be language specific. */
  label: Scalars['String'];
  /** A standard display symbol for a unit of measure. */
  symbol: Scalars['String'];
};

export type UnitResponse = {
  __typename?: 'UnitResponse';
  unit?: Maybe<Unit>;
};

export type UnitUpdateParams = {
  /** The primary key of the unit to update. */
  id: Scalars['ID'];
  /** A human readable label for the unit, can be language specific. */
  label?: InputMaybe<Scalars['String']>;
  /** A standard display symbol for a unit of measure. */
  symbol?: InputMaybe<Scalars['String']>;
};

export type UnitsPage = {
  __typename?: 'UnitsPage';
  edges?: Maybe<Array<Unit>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  boostActivities?: Maybe<Array<Maybe<Activity>>>;
  character?: Maybe<Character>;
  id?: Maybe<Scalars['ID']>;
  posts?: Maybe<Array<Maybe<Post>>>;
  profile?: Maybe<Profile>;
  userActivities?: Maybe<Array<Maybe<Activity>>>;
};


export type UserBoostActivitiesArgs = {
  paginate?: InputMaybe<Paginate>;
};


export type UserPostsArgs = {
  paginate?: InputMaybe<Paginate>;
};


export type UserUserActivitiesArgs = {
  paginate?: InputMaybe<Paginate>;
};

/** A calculation performed using custom formulas for a certain context. */
export type ValueCalculation = {
  __typename?: 'ValueCalculation';
  /** Relates a value calculation to a verb, such as consume, produce, work, improve, etc. */
  action: Action;
  formula: Scalars['String'];
  id: Scalars['ID'];
  /** Grouping around something to create a boundary or context, used for documenting, accounting, planning. */
  inScopeOf?: Maybe<Array<AccountingScope>>;
  /** An informal or formal textual identifier for an item. Does not imply uniqueness. */
  name?: Maybe<Scalars['String']>;
  /** A textual description or comment. */
  note?: Maybe<Scalars['String']>;
  /** References a concept in a common taxonomy or other classification scheme for purposes of categorization or grouping. */
  resourceClassifiedAs?: Maybe<Array<Scalars['URI']>>;
  /** Used to filter valueCalculations to find the one that matches the event. */
  resourceConformsTo?: Maybe<ResourceSpecification>;
  /** Relates a value calculation to a verb, like action, but for the related event. */
  valueAction: Action;
  /** The resource specification the event will apply to. */
  valueResourceConformsTo?: Maybe<ResourceSpecification>;
  /** References the unit used for the event. */
  valueUnit: Unit;
};

export type ValueCalculationCreateParams = {
  action: Scalars['ID'];
  formula: Scalars['String'];
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  resourceClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  resourceConformsTo?: InputMaybe<Scalars['ID']>;
  valueAction: Scalars['ID'];
  valueResourceConformsTo?: InputMaybe<Scalars['ID']>;
  valueUnit: Scalars['ID'];
};

export type ValueCalculationPage = {
  __typename?: 'ValueCalculationPage';
  edges: Array<ValueCalculation>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ValueCalculationResponse = {
  __typename?: 'ValueCalculationResponse';
  valueCalculation?: Maybe<ValueCalculation>;
};

export type ValueCalculationUpdateParams = {
  action?: InputMaybe<Scalars['ID']>;
  formula?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  inScopeOf?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  resourceClassifiedAs?: InputMaybe<Array<Scalars['URI']>>;
  resourceConformsTo?: InputMaybe<Scalars['ID']>;
  valueAction?: InputMaybe<Scalars['ID']>;
  valueResourceConformsTo?: InputMaybe<Scalars['ID']>;
  valueUnit?: InputMaybe<Scalars['ID']>;
};

export type Verb = {
  __typename?: 'Verb';
  verb?: Maybe<Scalars['String']>;
  verbDisplay?: Maybe<Scalars['String']>;
};

/** Query parameters for reading `Commitment`s related to an `Agent` */
export type AgentCommitmentSearchParams = {
  action?: InputMaybe<Scalars['ID']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  finished?: InputMaybe<Scalars['Boolean']>;
  searchString?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

/** Query parameters for reading `EconomicEvent`s related to an `Agent` */
export type AgentEventSearchParams = {
  action?: InputMaybe<Scalars['ID']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  searchString?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

/** Query parameters for reading `Plan`s related to an `Agent` */
export type AgentPlanSearchParams = {
  finished?: InputMaybe<Scalars['Boolean']>;
  searchString?: InputMaybe<Scalars['String']>;
};

/** Query parameters for reading `Process`es related to an `Agent` */
export type AgentProcessSearchParams = {
  finished?: InputMaybe<Scalars['Boolean']>;
  searchString?: InputMaybe<Scalars['String']>;
};

/** Query parameters for reading `EconomicResource`s related to an `Agent` */
export type AgentResourceSearchParams = {
  page?: InputMaybe<Scalars['Int']>;
  resourceClassification?: InputMaybe<Scalars['URI']>;
  searchString?: InputMaybe<Scalars['String']>;
};

/** Query parameters for reading `Process`es related to a `Plan` */
export type PlanProcessSearchParams = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  finished?: InputMaybe<Scalars['Boolean']>;
  searchString?: InputMaybe<Scalars['String']>;
};

export type CreateAgentRelationshipMutationVariables = Exact<{
  object: Scalars['ID'];
  relationship: Scalars['ID'];
  subject: Scalars['ID'];
}>;


export type CreateAgentRelationshipMutation = { __typename?: 'RootMutationType', createAgentRelationship?: { __typename?: 'AgentRelationshipResponse', agentRelationship: { __typename?: 'AgentRelationship', id: string } } | null };

export type CreateAgentRelationshipRoleMutationVariables = Exact<{
  roleLabel: Scalars['String'];
}>;


export type CreateAgentRelationshipRoleMutation = { __typename?: 'RootMutationType', createAgentRelationshipRole?: { __typename?: 'AgentRelationshipRoleResponse', agentRelationshipRole?: { __typename?: 'AgentRelationshipRole', id: string, roleLabel: string } | null } | null };

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String'];
  summary?: InputMaybe<Scalars['String']>;
  parentCategory?: InputMaybe<Scalars['ID']>;
}>;


export type CreateCategoryMutation = { __typename?: 'RootMutationType', createCategory?: { __typename?: 'Category', id?: string | null } | null };

export type CreateEconomicEventProduceMutationVariables = Exact<{
  agent: Scalars['ID'];
  unit: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Float']>;
  resourceSpec?: InputMaybe<Scalars['ID']>;
  categories?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type CreateEconomicEventProduceMutation = { __typename?: 'RootMutationType', createEconomicEvent?: { __typename?: 'EconomicEventResponse', economicEvent: { __typename?: 'EconomicEvent', id: string, note?: string | null, receiver: never, provider: never, resourceQuantity?: { __typename?: 'Measure', hasNumericalValue: number, hasUnit: { __typename?: 'Unit', label: string, symbol: string } } | null, resourceInventoriedAs?: { __typename?: 'EconomicResource', id: string, name?: string | null, onhandQuantity?: { __typename?: 'Measure', hasNumericalValue: number, hasUnit: { __typename?: 'Unit', label: string, symbol: string } } | null, accountingQuantity?: { __typename?: 'Measure', hasNumericalValue: number, hasUnit: { __typename?: 'Unit', label: string, symbol: string } } | null } | null }, economicResource?: { __typename?: 'EconomicResource', id: string } | null } | null };

export type CreateEconomicEventTransferMutationVariables = Exact<{
  provider: Scalars['ID'];
  receiver: Scalars['ID'];
  unit: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Float']>;
  resource?: InputMaybe<Scalars['ID']>;
  resourceSpec?: InputMaybe<Scalars['ID']>;
  categories?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type CreateEconomicEventTransferMutation = { __typename?: 'RootMutationType', createEconomicEvent?: { __typename?: 'EconomicEventResponse', economicEvent: { __typename?: 'EconomicEvent', id: string, note?: string | null, receiver: never, provider: never, resourceQuantity?: { __typename?: 'Measure', hasNumericalValue: number, hasUnit: { __typename?: 'Unit', label: string, symbol: string } } | null, resourceInventoriedAs?: { __typename?: 'EconomicResource', id: string, name?: string | null, onhandQuantity?: { __typename?: 'Measure', hasNumericalValue: number, hasUnit: { __typename?: 'Unit', label: string, symbol: string } } | null, accountingQuantity?: { __typename?: 'Measure', hasNumericalValue: number, hasUnit: { __typename?: 'Unit', label: string, symbol: string } } | null } | null }, economicResource?: { __typename?: 'EconomicResource', id: string } | null } | null };

export type CreateOrganizationMutationVariables = Exact<{
  name: Scalars['String'];
  primaryLocation: Scalars['ID'];
}>;


export type CreateOrganizationMutation = { __typename?: 'RootMutationType', createOrganization?: { __typename?: 'OrganizationResponse', agent: { __typename?: 'Organization', id: string } } | null };

export type CreateResourceSpecificationMutationVariables = Exact<{
  name: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type CreateResourceSpecificationMutation = { __typename?: 'RootMutationType', createResourceSpecification?: { __typename?: 'ResourceSpecificationResponse', resourceSpecification?: { __typename?: 'ResourceSpecification', id: string } | null } | null };

export type CreateStMutationVariables = Exact<{
  alt?: InputMaybe<Scalars['Float']>;
  lat?: InputMaybe<Scalars['Float']>;
  long?: InputMaybe<Scalars['Float']>;
  mappableAddress?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
}>;


export type CreateStMutation = { __typename?: 'RootMutationType', createSpatialThing?: { __typename?: 'SpatialThingResponse', spatialThing?: { __typename?: 'SpatialThing', id: string } | null } | null };

export type CreateUnitMutationVariables = Exact<{
  label: Scalars['String'];
}>;


export type CreateUnitMutation = { __typename?: 'RootMutationType', createUnit?: { __typename?: 'UnitResponse', unit?: { __typename?: 'Unit', id: string, label: string, symbol: string } | null } | null };

export type GetAgentRelationshipRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAgentRelationshipRolesQuery = { __typename?: 'RootQueryType', agentRelationshipRoles?: Array<{ __typename?: 'AgentRelationshipRole', id: string, roleLabel: string }> | null };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'RootQueryType', categories: { __typename?: 'CategoriesPage', edges: Array<{ __typename?: 'Category', id?: string | null, name?: string | null }> } };

export type GetOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationsQuery = { __typename?: 'RootQueryType', organizations?: Array<{ __typename?: 'Organization', id: string, name: string }> | null };

export type GetUnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnitsQuery = { __typename?: 'RootQueryType', units?: Array<{ __typename?: 'Unit', id: string, label: string, symbol: string }> | null };


export const CreateAgentRelationshipDocument = gql`
    mutation createAgentRelationship($object: ID!, $relationship: ID!, $subject: ID!) {
  createAgentRelationship(
    relationship: {object: $object, relationship: $relationship, subject: $subject}
  ) {
    agentRelationship {
      id
    }
  }
}
    `;
export const CreateAgentRelationshipRoleDocument = gql`
    mutation createAgentRelationshipRole($roleLabel: String!) {
  createAgentRelationshipRole(agentRelationshipRole: {roleLabel: $roleLabel}) {
    agentRelationshipRole {
      id
      roleLabel
    }
  }
}
    `;
export const CreateCategoryDocument = gql`
    mutation createCategory($name: String!, $summary: String, $parentCategory: ID) {
  createCategory(
    category: {name: $name, summary: $summary, parentCategory: $parentCategory}
  ) {
    id
  }
}
    `;
export const CreateEconomicEventProduceDocument = gql`
    mutation createEconomicEventProduce($agent: ID!, $unit: ID!, $note: String = "No description", $quantity: Float = 1, $resourceSpec: ID, $categories: [ID!]) {
  createEconomicEvent(
    event: {note: $note, action: "produce", provider: $agent, receiver: $agent, resourceQuantity: {hasUnit: $unit, hasNumericalValue: $quantity}}
    newInventoriedResource: {conformsTo: $resourceSpec, tags: $categories}
  ) {
    economicEvent {
      id
      note
      receiver {
        id
        name
        note
      }
      provider {
        id
        name
        note
      }
      resourceQuantity {
        hasNumericalValue
        hasUnit {
          label
          symbol
        }
      }
      resourceInventoriedAs {
        id
        name
        onhandQuantity {
          hasNumericalValue
          hasUnit {
            label
            symbol
          }
        }
        accountingQuantity {
          hasNumericalValue
          hasUnit {
            label
            symbol
          }
        }
      }
    }
    economicResource {
      id
    }
  }
}
    `;
export const CreateEconomicEventTransferDocument = gql`
    mutation createEconomicEventTransfer($provider: ID!, $receiver: ID!, $unit: ID!, $note: String = "No description", $quantity: Float = 1, $resource: ID, $resourceSpec: ID, $categories: [ID!]) {
  createEconomicEvent(
    event: {note: $note, action: "transfer", provider: $provider, receiver: $receiver, resourceInventoriedAs: $resource, resourceQuantity: {hasUnit: $unit, hasNumericalValue: $quantity}}
  ) {
    economicEvent {
      id
      note
      receiver {
        id
        name
        note
      }
      provider {
        id
        name
        note
      }
      resourceQuantity {
        hasNumericalValue
        hasUnit {
          label
          symbol
        }
      }
      resourceInventoriedAs {
        id
        name
        onhandQuantity {
          hasNumericalValue
          hasUnit {
            label
            symbol
          }
        }
        accountingQuantity {
          hasNumericalValue
          hasUnit {
            label
            symbol
          }
        }
      }
    }
    economicResource {
      id
    }
  }
}
    `;
export const CreateOrganizationDocument = gql`
    mutation createOrganization($name: String!, $primaryLocation: ID!) {
  createOrganization(
    organization: {name: $name, note: "", image: "", primaryLocation: $primaryLocation}
  ) {
    agent {
      id
    }
  }
}
    `;
export const CreateResourceSpecificationDocument = gql`
    mutation createResourceSpecification($name: String!, $note: String, $category: [ID!]) {
  createResourceSpecification(
    resourceSpecification: {name: $name, note: $note, tags: $category}
  ) {
    resourceSpecification {
      id
    }
  }
}
    `;
export const CreateStDocument = gql`
    mutation createST($alt: Float, $lat: Float, $long: Float, $mappableAddress: String, $name: String!) {
  createSpatialThing(
    spatialThing: {alt: $alt, lat: $lat, long: $long, name: $name, mappableAddress: $mappableAddress, note: ""}
  ) {
    spatialThing {
      id
    }
  }
}
    `;
export const CreateUnitDocument = gql`
    mutation createUnit($label: String!) {
  createUnit(unit: {label: $label, symbol: ""}) {
    unit {
      id
      label
      symbol
    }
  }
}
    `;
export const GetAgentRelationshipRolesDocument = gql`
    query getAgentRelationshipRoles {
  agentRelationshipRoles {
    id
    roleLabel
  }
}
    `;
export const GetCategoriesDocument = gql`
    query getCategories {
  categories {
    edges {
      id
      name
    }
  }
}
    `;
export const GetOrganizationsDocument = gql`
    query getOrganizations {
  organizations {
    id
    name
  }
}
    `;
export const GetUnitsDocument = gql`
    query getUnits {
  units {
    id
    label
    symbol
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createAgentRelationship(variables: CreateAgentRelationshipMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateAgentRelationshipMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAgentRelationshipMutation>(CreateAgentRelationshipDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createAgentRelationship');
    },
    createAgentRelationshipRole(variables: CreateAgentRelationshipRoleMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateAgentRelationshipRoleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAgentRelationshipRoleMutation>(CreateAgentRelationshipRoleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createAgentRelationshipRole');
    },
    createCategory(variables: CreateCategoryMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateCategoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCategoryMutation>(CreateCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createCategory');
    },
    createEconomicEventProduce(variables: CreateEconomicEventProduceMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateEconomicEventProduceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateEconomicEventProduceMutation>(CreateEconomicEventProduceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createEconomicEventProduce');
    },
    createEconomicEventTransfer(variables: CreateEconomicEventTransferMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateEconomicEventTransferMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateEconomicEventTransferMutation>(CreateEconomicEventTransferDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createEconomicEventTransfer');
    },
    createOrganization(variables: CreateOrganizationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateOrganizationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateOrganizationMutation>(CreateOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createOrganization');
    },
    createResourceSpecification(variables: CreateResourceSpecificationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateResourceSpecificationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateResourceSpecificationMutation>(CreateResourceSpecificationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createResourceSpecification');
    },
    createST(variables: CreateStMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateStMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateStMutation>(CreateStDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createST');
    },
    createUnit(variables: CreateUnitMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUnitMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUnitMutation>(CreateUnitDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUnit');
    },
    getAgentRelationshipRoles(variables?: GetAgentRelationshipRolesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAgentRelationshipRolesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAgentRelationshipRolesQuery>(GetAgentRelationshipRolesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAgentRelationshipRoles');
    },
    getCategories(variables?: GetCategoriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCategoriesQuery>(GetCategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCategories');
    },
    getOrganizations(variables?: GetOrganizationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOrganizationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrganizationsQuery>(GetOrganizationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getOrganizations');
    },
    getUnits(variables?: GetUnitsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUnitsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUnitsQuery>(GetUnitsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUnits');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;