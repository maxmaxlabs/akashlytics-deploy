import { useQuery } from "react-query";
import { QueryKeys } from "./queryKeys";
import axios from "axios";
import { ApiUrlService } from "../shared/utils/apiUtils";
import { deploymentToDto } from "../shared/utils/deploymentDetailUtils";

async function getDeploymentList(address) {
  if (!address) throw new Error("address must be defined.");

  const response = await axios.get(ApiUrlService.deploymentList(address));
  let deployments = response.data;

  return deployments.deployments.map((d) => deploymentToDto(d));
}

export function useDeploymentList(address, options) {
  return useQuery(QueryKeys.getDeploymentListKey(address), () => getDeploymentList(address), options);
}
