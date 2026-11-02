import { Configuration } from "@/api/client/runtime";
import FetchUtils from "@/api/util/FetchUtils";

export default function createBackendApiConfiguration(
  basePath: string
): Configuration {
  return new Configuration({
    basePath,
    fetchApi: FetchUtils.getOpenApiFetch(),
  });
}
