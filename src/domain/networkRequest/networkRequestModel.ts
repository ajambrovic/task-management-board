export enum NetworkRequestStatus {
  InProgress,
  Success,
  Fail,
}

export type NetworkRequestModel = {
  networkRequestStatus: NetworkRequestStatus;
};
