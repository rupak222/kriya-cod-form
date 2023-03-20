import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
  Button,
  ButtonGroup,
  Icon,
  ProgressBar,
  FormLayout,
  Spinner,
} from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";

import {
  ButtonMinor,
  HeaderMajor,
  CircleTickMajor,
  ViewMajor,
  CircleAlertMajor,
} from "@shopify/polaris-icons";

import {
  useAction,
  useFindFirst,
  useFindOne,
  useFindMany,
} from "@gadgetinc/react";
import { api } from "../api";
import { useState, useEffect, useCallback } from "react";

export default function HomePage() {
  // const [shopResult] = useFindFirst(api.shopifyShop);
  // const email = shopResult.data?.email;

  // const [getDataRes, getData] = useAction(api.modelA.read);
  // const read = useCallback(async () => {
  //   let data = await getData({ id: "3" });
  //   // console.log(JSON.stringify(data));
  // });

  const [appBlockEnabled, setAppBlockEnabled] = useState(undefined);
  const isAppBlockEnabled = async () => {
    const response = await api.isAppBlockEnabled();
    setAppBlockEnabled(response.settings_data_json);
  };

  const [result] = useFindFirst(api.shopifyShop, {
    select: {
      email: true,
      ordersLimit: true,
      ordersReceived: true,
      plan: true,
      domain: true,
      tracker: true,
    },
  });
  const { data, fetching, error } = result;

  console.log(JSON.stringify(data?.email));

  console.log(JSON.stringify(data?.tracker));

  const date = new Date(data?.tracker);

  const date2 = new Date(data?.tracker + 2592000000);

  useEffect(() => {
    isAppBlockEnabled();
  }, []);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState({
    buyButton: false,
    formDesigner: false,
    visibility: false,
    changePlan: false,
    openVisibility: false,
  });

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card
            title="Welcome to Kriya COD Form! Follow these instructions to set up the app:"
            sectioned
          >
            <p>
              In case you encounter any difficulties, please reach out to us!
              Our customer support team is ready to assist you in setting up and
              activating the app on your store.
            </p>

            <Card sectioned>
              <Stack>
                <Icon color="success" source={CircleTickMajor} />
                <p>1. Install the app</p>
              </Stack>
            </Card>

            {appBlockEnabled === undefined ? (
              <Card sectioned>
                <Stack>
                  <Spinner size="large" />
                </Stack>
              </Card>
            ) : null}

            {appBlockEnabled === true ? (
              <Card sectioned>
                <Stack alignment="center">
                  <Stack.Item>
                    <Icon color="success" source={CircleTickMajor} />
                  </Stack.Item>
                  <Stack.Item fill>
                    <p>2. Activated the app on your store</p>
                  </Stack.Item>
                  <Stack.Item>
                    <Button
                      loading={isLoading.openVisibility}
                      onClick={() => {
                        setIsLoading((prevState) => ({
                          ...prevState,
                          openVisibility: true,
                        }));
                        navigate("/settingsandvisibility");
                      }}
                    >
                      Open Visibility
                    </Button>
                  </Stack.Item>
                </Stack>
              </Card>
            ) : null}

            {appBlockEnabled === false ? (
              <div
                style={{
                  backgroundColor: "#f2a699",
                  padding: "20px",
                  borderRadius: "10px",
                  marginTop: "15px",
                }}
              >
                <Stack>
                  <Icon color="critical" source={CircleAlertMajor} />
                  <p>2. Activate the app on your store</p>
                </Stack>
                <hr
                  style={{
                    marginTop: "15px",
                    marginBottom: "15px",
                    padding: "1px",
                    backgroundColor: "#e35a42",
                    border: "none",
                  }}
                />
                <Stack vertical>
                  <p>
                    To enable the app on your store complete these two easy
                    steps:{" "}
                  </p>
                  <p>1. Open your theme by clicking on this button: </p>
                  <Button
                    primary
                    url={`https://${data?.domain}/admin/themes/current/editor?context=apps&template=product&activateAppId=a80d6f97-b7e7-44cb-b696-d18a54469d2d/app-block`}
                  >
                    Open theme
                  </Button>
                  <p>
                    2. Click on the Save button on the top right corner of your
                    theme editor:
                  </p>
                  <img
                    src="https://res.cloudinary.com/dqcftnh4r/image/upload/v1677599577/screenshot-demo_cbjccb.png"
                    alt="Screenshot"
                  />
                  <p>
                    If you need help with this don't hesitate to contact us!
                  </p>
                  <a
                    href="https://t.me/kriya_support"
                    target="_blanks"
                    className="contact-us-btn"
                  >
                    <svg
                      style={{ fill: "white", width: "20px", height: "20px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                    >
                      <path d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z" />
                    </svg>
                    Contact Us
                  </a>
                </Stack>
              </div>
            ) : null}
          </Card>
        </Layout.Section>

        <Layout.Section secondary>
          <Card title="Helpful Resources" sectioned color="red">
            <Stack spacing="tight" vertical>
              <Button
                loading={isLoading.buyButton}
                textAlign="start"
                icon={ButtonMinor}
                fullWidth
                onClick={() => {
                  setIsLoading((prevState) => ({
                    ...prevState,
                    buyButton: true,
                  }));
                  navigate("/buybutton");
                }}
              >
                Buy Button
              </Button>
              <Button
                loading={isLoading.formDesigner}
                textAlign="start"
                icon={HeaderMajor}
                fullWidth
                onClick={() => {
                  setIsLoading((prevState) => ({
                    ...prevState,
                    formDesigner: true,
                  }));
                  navigate("/formdesigner");
                }}
              >
                Form Designer
              </Button>
              <Button
                loading={isLoading.visibility}
                textAlign="start"
                icon={ViewMajor}
                fullWidth
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
            </Stack>
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card title="The status of your orders" sectioned>
            <Card.Section>
              <Stack spacing="baseTight" vertical>
                <p>
                  Your currently subscribed plan on the app is the <strong>{data?.plan}</strong>{" "}
                  plan with a monthly limit of <strong>{data?.ordersLimit}</strong> processed
                  orders. Here is your current progress:
                </p>
                <p>
                  <strong>{data?.ordersReceived}/{data?.ordersLimit}</strong>
                </p>
                <div>
                  <ProgressBar
                    progress={
                      data ? (data.ordersReceived / data.ordersLimit) * 100 : 0
                    }
                    size="small"
                  />
                </div>
                <Button
                  loading={isLoading.changePlan}
                  onClick={() => {
                    setIsLoading((prevState) => ({
                      ...prevState,
                      changePlan: true,
                    }));
                    navigate("/settingsandvisibility/billingplan");
                  }}
                >
                  Change Plan
                </Button>
              </Stack>
            </Card.Section>
            <Card.Section>
              <Stack vertical>
                <p>
                  When the limit is reached, the app will stop creating orders.
                  Three automated notifications will be sent to <strong>{data?.email}</strong> at
                  80%, 90%, and 100% of the limit. To change the email for these
                  alerts, please get in contact us.
                </p>
                <p>Last order progress was reset on: <strong>{date.toString()}</strong></p>
                <p>
                  Next order progress reset will trigger on: <strong>{date2.toString()}</strong>
                </p>
              </Stack>
            </Card.Section>
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card title="Need help? Looking for a feature? Contact us!" sectioned>
            <Stack spacing="baseTight" vertical>
              <p>
                Don't hesitate to reach out to us if you need help or you are
                looking for a feature. Our support team is available to assist
                you. Contact us below!
              </p>
              <a
                href="https://t.me/kriya_support"
                target="_blanks"
                className="contact-us-btn"
              >
                <svg
                  style={{ fill: "white", width: "20px", height: "20px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z" />
                </svg>
                Contact Us
              </a>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
      {/*{
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js-na1.hs-scripts.com/24059663.js"
        ></script>
      }*/}
    </Page>
  );
}
