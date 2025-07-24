import * as aws from "@pulumi/aws";
import { albQuotas } from "../config/quotas";

export async function createQuotaResources() {
  for (const quota of albQuotas) {
    const quotaInfo = await aws.servicequotas.getServiceQuota({
      serviceCode: quota.serviceCode,
      quotaCode: quota.quotaCode,
    });

    new aws.cloudwatch.MetricAlarm(`quota-${quota.quotaCode}`, {
      namespace: "AWS/Usage",
      metricName: "ResourceCount",
      dimensions: {
        Service: quota.serviceCode,
        Type: "Resource",
        Class: "Standard",
      },
      period: 300,
      evaluationPeriods: 1,
      threshold: quotaInfo.value * 0.8,
      comparisonOperator: "GreaterThanThreshold",
      statistic: "Average",
      alarmDescription: `Usage exceeds 80% of ${quota.name}`,
      alarmActions: [], // Optional: Add SNS topic ARN here
    });
  }
}

