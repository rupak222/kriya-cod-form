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
  Frame,
  ContextualSaveBar,
} from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import {
  SettingsMinor,
  ViewMinor,
  FinancesMajor,
  CircleTickMajor,
} from "@shopify/polaris-icons";

// ok, so the error was because of MoneyMinor

import { useState, useCallback, useEffect } from "react";

import { api } from "../../api";


export default function Visibility() {
  const navigate = useNavigate();

  const [contextualSaveBar, setContextualSaveBar] = useState(false);
  const [
    contextualSaveBarSaveButtonLoading,
    setContextualSaveBarSaveButtonLoading,
  ] = useState(false);

  const [isLoading, setIsLoading] = useState({
    settings: false,
    billingplans: false,
  });

  const [visibilityPage, setVisibilityPage] = useState({
    form_status: true,
    hidden_add_to_cart: false,
    hidden_buy_now: false,
    min_amount: undefined,
    max_amount: undefined,
    invalid_order_total_message: undefined,
  });

  console.log(visibilityPage);

  const handleChange = useCallback((newChecked) => {
    setVisibilityPage((prevState) => ({
      ...prevState,
      hidden_add_to_cart: newChecked,
    }));
    setContextualSaveBar(true);
    console.log("newChecked : " + newChecked);
  }, []);

  const handleChange2 = useCallback((newChecked) => {
    setVisibilityPage((prevState) => ({
      ...prevState,
      hidden_buy_now: newChecked,
    }));
    setContextualSaveBar(true);
    console.log("newChecked : " + newChecked);
  }, []);

  const handleMinTextFieldChange = useCallback((newValue) => {
    setVisibilityPage((prevState) => ({
      ...prevState,
      min_amount: newValue,
    }));
    setContextualSaveBar(true);
  }, []);

  const handleMaxTextFieldChange = useCallback((newValue) => {
    setVisibilityPage((prevState) => ({
      ...prevState,
      max_amount: newValue,
    }));
    setContextualSaveBar(true);
  }, []);

  const handleInvalidTextFieldChange = useCallback((newValue) => {
    setVisibilityPage((prevState) => ({
      ...prevState,
      invalid_order_total_message: newValue,
    }));
    setContextualSaveBar(true);
  }, []);



  const runReadMetafieldFunction = async () => {
    try{
        const data = await api.readMetafield({ key: "visibility_page_json" });
        setVisibilityPage(JSON.parse(data.response));
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Data fetching complete.");
    }
  }


  const runUpdateMetafieldFunction = useCallback(async (data) => {
    try {
      const result = await api.updateMetafield({ key: "visibility_page_json", data: data })
      setContextualSaveBarSaveButtonLoading(false);
      setContextualSaveBar(false);

      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Data updating complete.");
    }
  });



  useEffect(() => {
    runReadMetafieldFunction();
  }, []);

  return (
    <Page>
      <div
        style={{
          height: "60px",
          display: contextualSaveBar ? null : "none",
        }}
      >
        <Frame>
          <ContextualSaveBar
            alignContentFlush
            message="Unsaved changes"
            saveAction={{
              onAction: () => {
                console.log("add form submit logic");
                runUpdateMetafieldFunction(JSON.stringify(visibilityPage));
                setContextualSaveBarSaveButtonLoading(true);
              },
              loading: contextualSaveBarSaveButtonLoading ? true : false,
              disabled: false,
            }}
          />
        </Frame>
      </div>
      <Layout>
        <Layout.Section>
          <ButtonGroup segmented>
            <Button icon={ViewMinor} primary={true}>
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
            <Button
              loading={isLoading.billingplans}
              icon={FinancesMajor}
              onClick={() => {
                setIsLoading((prevState) => ({
                  ...prevState,
                  billingplans: true,
                }));
                navigate("/settingsandvisibility/billingplan");
              }}
            >
              Billing Plans
            </Button>
          </ButtonGroup>

          <Layout.AnnotatedSection
            title="Activate or deactivate your form"
            description="Select to either deactivate your
               form, enable only on product pages, only on
                the cart page, or on both cart and product pages."
          >
            <Card sectioned>
              <FormLayout>
                <ButtonGroup segmented>
                  <Button
                    disabled
                    primary={visibilityPage.form_status ? true : false}
                    onClick={() => {
                      setVisibilityPage((prevState) => ({
                        ...prevState,
                        form_status: true,
                      }));
                      if(!visibilityPage.form_status){
                        setContextualSaveBar(true);
                      }
                    }}
                  >
                    Enabled
                  </Button>
                  {/*  <Button>Only cart page</Button>
                  <Button>Only product pages</Button>
                  <Button>Both cart and product pages</Button>*/}
                  <Button
                    disabled
                    primary={visibilityPage.form_status ? false : true}
                    onClick={() => {
                      setVisibilityPage((prevState) => ({
                        ...prevState,
                        form_status: false,
                      }));
                      if(visibilityPage.form_status){
                        setContextualSaveBar(true);
                      }
                    }}
                  >
                    Disabled
                  </Button>
                  <p> (Coming Soon)</p>
                </ButtonGroup>
                {visibilityPage.form_status ? (
                  <Banner status="success">
                    <p>Kriya COD Form is correctly enabled on your theme.</p>
                  </Banner>
                ) : undefined}
              </FormLayout>
            </Card>
            {/*<Card sectioned title="Cart page settings">
              <Checkbox label="Hide the Checkout button on your cart" />
            </Card>*/}
            <Card sectioned title="Product pages settings">
              <FormLayout>
                <Checkbox
                  label="Hide the Add to Cart button on product pages"
                  checked={visibilityPage.hidden_add_to_cart}
                  onChange={handleChange}
                />
                <Checkbox
                  checked={visibilityPage.hidden_buy_now}
                  onChange={handleChange2}
                  label="Hide the Buy Now button on product pages"
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Restrict your order form to specific products,
               collections, countries, or order total ranges."
            description="Here you can choose to show your COD order
               form only for customers from specific countries or for
                specific products and collections. You can also limit
                 the COD form based on the order total."
          >
            <Card>
              <Card.Section>
                <Checkbox
                  disabled
                  label="Enable your form only for specific products and collections (Coming Soon)"
                />
              </Card.Section>
            </Card>
            <Card>
              <Card.Section>
                <Checkbox
                  disabled
                  label="Enable your form only for specific countries (Coming Soon)"
                />
              </Card.Section>
            </Card>
            <Card
              title="Your form will only be active if the order total is between: (Coming Soon)"
              sectioned
            >
              <FormLayout>
                <Stack>
                  <TextField
                    disabled
                    label="Minimum"
                    type="number"
                    autoComplete="off"
                    value={visibilityPage.min_amount}
                    onChange={handleMinTextFieldChange}
                  />
                  <TextField
                    disabled
                    label="Maximum"
                    type="number"
                    autoComplete="off"
                    value={visibilityPage.max_amount}
                    onChange={handleMaxTextFieldChange}
                  />
                </Stack>
                <TextField
                  disabled
                  label="Invalid order total message"
                  autoComplete="off"
                  value={visibilityPage.invalid_order_total_message}
                  onChange={handleInvalidTextFieldChange}
                />
                <p>
                  This message will be shown to customers if their order total
                  does not meet the criteria configured above.
                </p>
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
