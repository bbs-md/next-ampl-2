/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const myCustomQuery = /* GraphQL */ `query MyCustomQuery($cvData: CvData) {
  myCustomQuery(cvData: $cvData)
}
` as GeneratedQuery<
  APITypes.MyCustomQueryQueryVariables,
  APITypes.MyCustomQueryQuery
>;
