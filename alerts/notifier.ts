import * as aws from "@pulumi/aws";

const topicArn = "arn:aws:sns:us-east-1:267613166907:eks-cosmos-dev-alarm-topic";

export async function sendSnsAlert(message: string) {
  new aws.sns.TopicSubscription("quota-alert-subscription", {
    topic: topicArn,
    protocol: "email",
    endpoint: "raji@mannathechnologies.in", // Change to your alert email
  });

  console.log("Quota Alert Sent: " + message);
}
