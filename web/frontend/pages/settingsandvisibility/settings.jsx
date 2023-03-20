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
} from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import {
  SettingsMinor,
  ViewMinor,
  FinancesMajor,
  CircleTickMajor,
} from "@shopify/polaris-icons";

// ok, so the error was because of MoneyMinor

import { useState } from "react";

export default function Settings() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState({
    visibility: false,
    billingplans: false,
  });
  return (
    <Page>
      {/*<TitleBar title="Settings And Visibility" />*/}
      <Layout>
        <Layout.Section>
          <ButtonGroup segmented>
            <Button loading={isLoading.visibility} icon={ViewMinor} onClick={() => {
              setIsLoading((prevState) => ({
                  ...prevState,
                  visibility: true,
              }));
              navigate("/settingsandvisibility");
            }} >Visibility</Button>
            <Button icon={SettingsMinor} primary={true}>
              Settings
            </Button>
            <Button loading={isLoading.billingplans} icon={FinancesMajor} onClick={() => {
              setIsLoading((prevState) => ({
                  ...prevState,
                  billingplans: true,
              }));
              navigate("/settingsandvisibility/billingplan");
            }} >Billing Plans</Button>
          </ButtonGroup>

          <Layout.AnnotatedSection title="1. Customize your advanced settings">
            <Card sectioned>
              <Stack>
                <Checkbox label="Save orders as draft orders" />
                <Checkbox label="Disable your Shopify automatic discounts on the COD form" />
                <Checkbox label="Disable autofill and autocomplete on the COD form" />
                <Checkbox label="Add the kriya_cod_form tag to orders from the COD form" />
              </Stack>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection title="2. Select your redirect after your customers complete their purchase on the COD form">
            <Card sectioned>
              <Stack vertical>
                <RadioButton
                  label="Redirect customers to the default Shopify thank you page"
                  name="accounts"
                />
                <RadioButton
                  label="Redirect customers to a custom page or link"
                  name="accounts"
                />
                <RadioButton
                  label="Redirect customers to a WhatsApp chat with you"
                  name="accounts"
                />
              </Stack>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="3.Enable or disable abandoned orders"
            description="If a customer does not complete
               their order our app will save their abandoned
                order on your Shopify store so that you can 
                recover it later. You can enable abandoned 
                orders on this section."
          >
            <Card sectioned>
              <Stack>
                <Checkbox label="Enable abandoned orders" />
              </Stack>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="4. Block specific users from making orders"
            description="If you want to block specific users
               from making orders on the form enter
                their IP address here."
          >
            <Card sectioned>
              <Card.Section>
                <Stack>
                  <Checkbox label="Limit orders made from the same IP address in X hours" />
                </Stack>
              </Card.Section>
              <Card.Section>
                <Stack>
                  <TextField
                    multiline={4}
                    label="IP addresses to block (separated by a new line)"
                    helpText="You can find the IP address of your customers in the order details of their order on Shopify."
                    placeholder={`45.87.23.98${"\n"}34.89.23.89${"\n"}89.23.12.45`}
                  />
                </Stack>
              </Card.Section>
              <Card.Section>
                <Stack>
                  <TextField
                    multiline={4}
                    label="IP addresses to always allow (separated by a new line)"
                    helpText="You can find the IP address of your customers in the order details of their order on Shopify."
                    placeholder={`45.87.23.98${"\n"}34.89.23.89${"\n"}89.23.12.45`}
                  />
                </Stack>
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
