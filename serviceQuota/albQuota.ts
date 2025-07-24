import * as aws from "@pulumi/aws";
import { ServiceQuotasClient, GetServiceQuotaCommand } from "@aws-sdk/client-service-quotas";

export async function checkAlbQuota(): Promise<{ usage: number; limit: number }> {
  const allLBs = await aws.lb.getLoadBalancers({});
  const albArns = allLBs.arns.filter(arn => arn.includes("app/"));
  const usage = albArns.length;

  const client = new ServiceQuotasClient({ region: aws.config.region });
  const command = new GetServiceQuotaCommand({
    ServiceCode: "elasticloadbalancing",
    QuotaCode: "L-53DA6B97"
  });

  const response = await client.send(command);
  const limit = response.Quota?.Value ?? 0;

  return { usage, limit };
}
