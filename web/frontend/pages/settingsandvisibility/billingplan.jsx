import {
  Card,
  Page,
  Layout,
  TextContainer,
  Heading,
  Button,
  ButtonGroup,
  TextField,
  FormLayout,
  Banner,
  Checkbox,
  Stack,
  RadioButton,
  Icon,
  Spinner,
} from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import {
  SettingsMinor,
  ViewMinor,
  FinancesMajor,
  CircleTickMajor,
} from "@shopify/polaris-icons";

// ok, so the error was because of MoneyMinor

import { useState, useCallback } from "react";
import { api } from "../../api";
import { useAction, useFindFirst } from "@gadgetinc/react";

export default function Billingplan() {
  const [result] = useFindFirst(api.shopifyShop, {
    select: { plan: true },
  });
  const { data, fetching, error } = result;

  console.log(data?.plan);

  const navigate = useNavigate();

  const [shopResult] = useFindFirst(api.shopifyShop);
  const shopId = shopResult.data?.id;

  const [createSubscriptionResponse, createSubscription] = useAction(
    api.shopifyShop.subscribe
  );
  const subscribe = useCallback(async (plan, demo) => {
    await createSubscription({ id: shopId, plan, demo });
  });

  console.log(createSubscriptionResponse);

  const [growthPlanButton, setGrowthPlanButton] = useState(false);
  const [unlimitedPlanButton, setUnlimitedPlanButton] = useState(false);

  if (createSubscriptionResponse.data) {
    const data = createSubscriptionResponse.data;
    navigate(data.confirmationUrl);
    return (
      <Stack sectioned alignment="center">
        <p>Redirecting to confirm charge</p>
        <Spinner />
      </Stack>
    );
  }

  const [isLoading, setIsLoading] = useState({
    visibility: false,
    settings: false,
  });

  return (
    <Page>
      {/*<TitleBar title="Settings And Visibility" />*/}
      <Layout>
        <Layout.Section>
          <ButtonGroup segmented>
            <Button
              loading={isLoading.visibility}
              icon={ViewMinor}
              onClick={() => {
                setIsLoading((prevState) => ({
                  ...prevState,
                  visibility: true,
                }));
                navigate("/settingsandvisibility");
              }}
            >
              Visibility
            </Button>
            <Button
              loading={isLoading.settings}
              disabled
              icon={SettingsMinor}
              onClick={() => {
                setIsLoading((prevState) => ({
                  ...prevState,
                  settings: true,
                }));
                navigate("/settingsandvisibility/settings");
              }}
            >
              Settings (Comming Soon)
            </Button>
            <Button icon={FinancesMajor} primary={true}>
              Billing Plans
            </Button>
          </ButtonGroup>

          <Layout.Section>
            <Card title="Change your plan here" sectioned>
              <li>
                All plans only vary on the number of orders you can receive
                through the form.
              </li>
              <li>
                The unlimited plan gives you more flexibility and avoids any
                additional charges.
              </li>
              <li>
                You can cancel your subscription at any time by uninstalling
                this app.
              </li>
            </Card>
            <Layout.Section>
              <Stack distribution="fillEvenly">
                <Card sectioned>
                  <Card.Section>
                    <FormLayout>
                      <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                        FREE PLAN
                      </h4>
                      <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                        $0 /month
                      </h4>
                      <h4 style={{ textAlign: "center" }}>
                        80 Orders per month
                      </h4>
                    </FormLayout>
                  </Card.Section>
                  <Card.Section>
                    <Stack vertical>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Up to 80 orders per month</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>24/7 support</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Fully customizable form</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Fully customizable button</p>
                      </Stack>

                      {/*<Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Shipping rates</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Discount codes</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Abandoned orders</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Upsells</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Quantity Offers</p>
                      </Stack>*/}
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Tracking pixels</p>
                      </Stack>

                      <Button
                        disabled={
                          data ? (data.plan === "FREE" ? true : false) : null
                        }
                        fullWidth
                        primary
                      >
                        {data
                          ? data.plan === "FREE"
                            ? "Current plan"
                            : "Upgrade your plan"
                          : null}
                      </Button>
                    </Stack>
                  </Card.Section>
                </Card>
                <Card sectioned>
                  <Card.Section>
                    <FormLayout>
                      <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                        GROWTH PLAN
                      </h4>
                      <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                        $4.99 /month
                      </h4>
                      <h4 style={{ textAlign: "center" }}>
                        500 Orders per month
                      </h4>
                    </FormLayout>
                  </Card.Section>
                  <Card.Section>
                    <Stack vertical>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Up to 500 orders per month</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>24/7 support</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Fully customizable form</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Fully customizable button</p>
                      </Stack>
                      {/*<Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Shipping rates</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Discount codes</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Abandoned orders</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Upsells</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Quantity Offers</p>
                      </Stack>*/}
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Tracking pixels</p>
                      </Stack>

                      <Button
                        loading={growthPlanButton}
                        fullWidth
                        primary
                        onClick={() => {
                          setGrowthPlanButton(true);
                          subscribe("growth");
                        }}
                        disabled={
                          data ? (data.plan === "GROWTH" ? true : false) : null
                        }
                      >
                        {data
                          ? data.plan === "GROWTH"
                            ? "Current plan"
                            : "Upgrade your plan"
                          : null}
                      </Button>
                    </Stack>
                  </Card.Section>
                </Card>
                <Card sectioned>
                  <Card.Section>
                    <FormLayout>
                      <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                        UNLIMITED PLAN
                      </h4>
                      <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                        $14.99 /month
                      </h4>
                      <h4 style={{ textAlign: "center" }}>
                        Unlimited Orders per month
                      </h4>
                    </FormLayout>
                  </Card.Section>
                  <Card.Section>
                    <Stack vertical>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Unlimited orders per month</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>24/7 support</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Fully customizable form</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Fully customizable button</p>
                      </Stack>

                      {/*<Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Shipping rates</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Discount codes</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Abandoned orders</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Upsells</p>
                      </Stack>
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Quantity Offers</p>
                      </Stack>*/}
                      <Stack>
                        <Icon color="success" source={CircleTickMajor} />
                        <p>Tracking pixels</p>
                      </Stack>

                      <Button
                        disabled={
                          data
                            ? data.plan === "UNLIMITED"
                              ? true
                              : false
                            : null
                        }
                        loading={unlimitedPlanButton}
                        onClick={() => {
                          setUnlimitedPlanButton(true);
                          subscribe("unlimited");
                        }}
                        fullWidth
                        primary
                      >
                        {data
                          ? data.plan === "UNLIMITED"
                            ? "Current plan"
                            : "Upgrade your plan"
                          : null}
                      </Button>
                    </Stack>
                  </Card.Section>
                </Card>
              </Stack>
            </Layout.Section>
            <Layout.Section>
              <h4>
                All charges will be handled securely by Shopify Billing. If you
                select a plan with a monthly charge you will be redirected to
                Shopify Billing to confirm the charge.
              </h4>
            </Layout.Section>
          </Layout.Section>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
