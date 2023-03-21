import {
  Card,
  Page,
  Layout,
  TextContainer,
  Heading,
  FormLayout,
  TextField,
  Button,
  TextStyle,
  Stack,
  ChoiceList,
  ButtonGroup,
  ColorPicker,
  RangeSlider,
  Banner,
  Icon,
  Popover,
  ActionList,
  Frame,
  ContextualSaveBar,
  Select,
} from "@shopify/polaris";

import {
  CartMajor,
  ShipmentMajor,
  QuickSaleMajor,
  HideMinor,
} from "@shopify/polaris-icons";


import { useState, useCallback, useEffect } from "react";

import { buyButton } from "../assets";

import "animate.css";

import { HexColorPicker } from "react-colorful";

import { api } from "../api";

import {
  useAction,
  useFindFirst,
  useFindOne,
  useFindMany,
} from "@gadgetinc/react";

export default function BuyButton() {

  // getting "Warning: Cannot update a component (`EmbeddedApp`) while rendering a different component (`BuyButton`). To locate the bad setState() call inside `BuyButton`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render" because of this 
  // re-rendering the component multiple times
  // const [shopResult] = useFindFirst(api.shopifyShop);
  // const shopId = shopResult.data?.id;



  const updateBuyButtonDataFunction = useCallback(async (data) => {
    try {
      await api.updateMetafield({ key: "buy_button_page_json", data: data })
      setContextualSaveBarSaveButtonLoading(false);
      setContextualSaveBar(false);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Data updating complete.");
    }
  });

  console.log("hello world");



  const runReadMetafieldFunction = async () => {
    // tried useAction but find api.{globalAction} better, useAction returning data: proxy
    try{
        const data = await api.readMetafield({ key: "buy_button_page_json" });
        setBuyButtonData(JSON.parse(data.response));
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Data fetching complete.");
    }
  }


  useEffect(() => {
    runReadMetafieldFunction();
  }, []);

  // the only way i think is to organise the states in one state and update in useEffect.

  const [buyButtonData, setBuyButtonData] = useState({
    buttonText: "Loading...",
    buttonAnimation: ["none"],
    buttonIcon: "quick_sale_major_icon",
    backgroundColor: "#020503",
    textColor: "#fcfcfc",
    borderColor: "#050a06",
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 0,
    shadow: 10,
    shadowColor: "red",
  });

  const handleIconSelectedChange = useCallback((value) => {
    setBuyButtonData((prevState) => ({
      ...prevState,
      buttonIcon: value,
    }));

    setContextualSaveBar(true);
  }, []);

  const [contextualSaveBar, setContextualSaveBar] = useState(false);
  const [contextualSaveBarSaveButtonLoading, setContextualSaveBarSaveButtonLoading] = useState(false);

  const [popoverActive, setPopoverActive] = useState(true);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Shadow Color
    </Button>
  );

  const buttonTextHandleChange = useCallback((value) => {
    setBuyButtonData((prevState) => ({
      ...prevState,
      buttonText: value,
    }));

    setContextualSaveBar(true);
  }, []);

  const handleChange = useCallback((value) => {
    setBuyButtonData((prevState) => ({
      ...prevState,
      buttonAnimation: value,
    }));

    setContextualSaveBar(true);
  }, []);

  const handleButtonBackgroundColorChange = useCallback((value) => {
    setBuyButtonData((prevState) => ({
      ...prevState,
      backgroundColor: value,
    }));
    setContextualSaveBar(true);
  });

  const handleButtonTextColorChange = useCallback((value) => {
    setBuyButtonData((prevState) => ({
      ...prevState,
      textColor: value,
    }));
    setContextualSaveBar(true);
  });

  const handleButtonBorderColorChange = useCallback((value) => {
    setBuyButtonData((prevState) => ({
      ...prevState,
      borderColor: value,
    }));
    setContextualSaveBar(true);
  });

  const handleFontSizeRangeSliderChange = useCallback((value) => {
    setBuyButtonData((prevState) => ({
      ...prevState,
      fontSize: value,
    }));
    setContextualSaveBar(true);
  }, []);

  const handleBorderRadiusRangeSliderChange = useCallback((value) => {
    setBuyButtonData((prevState) => ({
      ...prevState,
      borderRadius: value,
    }));
    setContextualSaveBar(true);
  }, []);

  const handleBorderWidthRangeSliderChange = useCallback((value) => {
    setBuyButtonData((prevState) => ({
      ...prevState,
      borderWidth: value,
    }));
    setContextualSaveBar(true);
  }, []);

  const handleShadowRangeSliderChange = useCallback((value) => {
    setBuyButtonData((prevState) => ({
      ...prevState,
      shadow: value,
    }));
    setContextualSaveBar(true);
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
                updateBuyButtonDataFunction(JSON.stringify(buyButtonData));
                setContextualSaveBarSaveButtonLoading(true);
              },
              loading: contextualSaveBarSaveButtonLoading ? true : false,
              disabled: false,
            }}
          />
        </Frame>
      </div>
      <Layout>
        <Layout.Section oneHalf>
          <Card sectioned>
            <FormLayout>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Stack wrap vertical>
                  <TextField
                    id="button_animation_textfi"
                    spacing="extraTight"
                    label="Button Text"
                    onChange={buttonTextHandleChange}
                    autoComplete="off"
                    value={buyButtonData.buttonText}
                  />
                  <ChoiceList
                    title="Button Animation"
                    choices={[
                      { label: "None", value: "none" },
                      { label: "Tada", value: "tada" },
                      { label: "Bounce", value: "bounce" },
                      { label: "Pulse", value: "pulse" },
                      { label: "Flash", value: "flash" },
                      { label: "RubberBand", value: "rubberBand" },
                      { label: "ShakeX", value: "shakeX" },
                      { label: "ShakeY", value: "shakeY" },
                      { label: "Swing", value: "swing" },
                      { label: "HeartBeat", value: "heartBeat" },
                    ]}
                    selected={buyButtonData.buttonAnimation}
                    onChange={handleChange}
                  />
                </Stack>
              </div>

              <p>Button Icon</p>
              <Stack>
                <ButtonGroup segmented>
                  <Button
                    primary={buyButtonData.buttonIcon == "none" ? true : false}
                    onClick={() => {
                      handleIconSelectedChange("none");
                    }}
                    icon={HideMinor}
                  ></Button>
                  <Button
                    primary={
                      buyButtonData.buttonIcon == "quick_sale_major_icon"
                        ? true
                        : false
                    }
                    onClick={() => {
                      handleIconSelectedChange("quick_sale_major_icon");
                    }}
                    icon={QuickSaleMajor}
                  ></Button>
                  <Button
                    primary={
                      buyButtonData.buttonIcon == "shipment_major_icon"
                        ? true
                        : false
                    }
                    onClick={() => {
                      handleIconSelectedChange("shipment_major_icon");
                    }}
                    icon={ShipmentMajor}
                  ></Button>
                  <Button
                    primary={
                      buyButtonData.buttonIcon == "cart_major_icon"
                        ? true
                        : false
                    }
                    onClick={() => {
                      handleIconSelectedChange("cart_major_icon");
                    }}
                    icon={CartMajor}
                  ></Button>
                </ButtonGroup>
                <Select
                  options={[
                    { label: "Other Icons", value: "none" },
                    {
                      label: "Shopping Bag Icon",
                      value: "shopping_bag_fontawesome",
                    },
                    { label: "Fast Delivery Icon", value: "truck_fontawesome" },
                    { label: "Tag Icon", value: "tag_fontawesome" },
                    {
                      label: "Shopping Basket Icon",
                      value: "basket_fontawesome",
                    },
                    { label: "Shop Icon", value: "shop_fontawesome" },
                    { label: "Store Icon", value: "store_fontawesome" },
                    { label: "Gift Icon", value: "gift_fontawesome" },
                  ]}
                  onChange={handleIconSelectedChange}
                  value={buyButtonData.buttonIcon}
                />
              </Stack>

              <p>Background Color</p>
              <HexColorPicker
                color={buyButtonData.backgroundColor}
                onChange={handleButtonBackgroundColorChange}
              />
              <p>Text Color</p>
              <HexColorPicker
                onChange={handleButtonTextColorChange}
                color={buyButtonData.textColor}
              />
              <p>Border Color</p>
              <HexColorPicker
                onChange={handleButtonBorderColorChange}
                color={buyButtonData.borderColor}
              />

              <Stack>
                <RangeSlider
                  label="Font Size"
                  value={buyButtonData.fontSize}
                  onChange={handleFontSizeRangeSliderChange}
                  output
                  min={10}
                  max={20}
                />
                <RangeSlider
                  label="Border Radius"
                  value={buyButtonData.borderRadius}
                  onChange={handleBorderRadiusRangeSliderChange}
                  output
                  min={0}
                  max={10}
                />
                <RangeSlider
                  label="Border Width"
                  value={buyButtonData.borderWidth}
                  onChange={handleBorderWidthRangeSliderChange}
                  output
                  min={0}
                  max={10}
                />
                <Stack vertical>
                  <RangeSlider
                    label="Shadow"
                    value={buyButtonData.shadow}
                    onChange={handleShadowRangeSliderChange}
                    output
                    min={0}
                    max={10}
                  />
                  {/*<Popover
                    active={popoverActive}
                    activator={activator}
                    autofocusTarget="first-node" 
                    onClose={togglePopoverActive}
                  >
                    <div
                      style={{ padding: "10px", display: "flex", gap: "7px" }}
                    >
                      <div
                        style={{
                          padding: "15px",
                          backgroundColor: "red",
                          borderRadius: "15px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setBuyButtonData((prevState) => ({
                            ...prevState,
                            shadowColor: "red",
                          }));
                          togglePopoverActive();
                          setContextualSaveBar(true);
                        }}
                      />
                      <div
                        style={{
                          padding: "15px",
                          backgroundColor: "blue",
                          borderRadius: "15px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setBuyButtonData((prevState) => ({
                            ...prevState,
                            shadowColor: "blue",
                          }));
                          togglePopoverActive();
                          setContextualSaveBar(true);
                        }}
                      />
                      <div
                        style={{
                          padding: "15px",
                          backgroundColor: "purple",
                          borderRadius: "15px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setBuyButtonData((prevState) => ({
                            ...prevState,
                            shadowColor: "purple",
                          }));
                          togglePopoverActive();
                          setContextualSaveBar(true);
                        }}
                      />
                      <div
                        style={{
                          padding: "15px",
                          backgroundColor: "black",
                          borderRadius: "15px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setBuyButtonData((prevState) => ({
                            ...prevState,
                            shadowColor: "black",
                          }));
                          togglePopoverActive();
                        }}
                      />
                    </div>
                  </Popover>*/}
                </Stack>
              </Stack>

              <Banner title="Suggestions?" status="info">
                <FormLayout>
                  <p>
                    We value your input and would love to hear any suggestions
                    you may have to improve our services. Please feel free to
                    share your thoughts and ideas with us.
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
                </FormLayout>
              </Banner>
            </FormLayout>
          </Card>
        </Layout.Section>
        <div className="live-preview-container">
          <p style={{ fontWeight: "bold", paddingTop: "100px" }}>
            Live Preview:{" "}
          </p>
          <button
            style={{
              backgroundColor: buyButtonData.backgroundColor,
              borderColor: buyButtonData.borderColor,
              borderRadius: `${buyButtonData.borderRadius}px`,
              boxShadow:
                buyButtonData.shadow != "0"
                  ? `${buyButtonData.shadow / 2}px ${
                      buyButtonData.shadow
                    }px 18px ${buyButtonData.shadowColor}`
                  : null,
              borderWidth: `${buyButtonData.borderWidth}px`,
            }}
            className={`btn animate__animated animate__infinite animate__${buyButtonData.buttonAnimation[0]}`}
          >
            {buyButtonData.buttonIcon != "none" ? (
              <FindSVGForSelect
                prop={buyButtonData.buttonIcon}
                color={buyButtonData.textColor}
              />
            ) : null}

            <span
              style={{
                color: buyButtonData.textColor,
                fontSize: `${buyButtonData.fontSize}px`,
              }}
            >
              {buyButtonData.buttonText}
            </span>
          </button>
        </div>
      </Layout>
    </Page>
  );
}

function FindSVGForSelect({ prop, color }) {
  if (prop == "none") {
    return null;
  } else if (prop == "shopping_bag_fontawesome") {
    return (
      <svg
        style={{ fill: color }}
        className="svg_icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
      </svg>
    );
  } else if (prop == "quick_sale_major_icon") {
    return (
      <svg
        style={{ fill: color }}
        viewBox="0 0 20 20"
        className="svg_icon"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5 0a1 1 0 0 0 0 2h1v1a1 1 0 0 0 .917.997l10.943.911-.727 5.092h-10.133a1 1 0 0 0-1 1v3.17a3.001 3.001 0 1 0 3.83 1.83h3.34a3 3 0 1 0 2.83-2h-8v-2h10a1 1 0 0 0 .99-.859l1-7a1 1 0 0 0-.907-1.138l-11.083-.923v-1.08a1 1 0 0 0-1-1h-2zm11 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
        ></path>
        <path d="M0 3a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2h-1a1 1 0 0 1-1-1zm1 3a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-6zm-1 5a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1zm1 3a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2h-1z"></path>
      </svg>
    );
  } else if (prop == "shipment_major_icon") {
    return (
      <svg
        style={{ fill: color }}
        viewBox="0 0 20 20"
        className="svg_icon"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M1.5 2a1.5 1.5 0 0 0-1.5 1.5v11a1.5 1.5 0 0 0 1.5 1.5h.5a3 3 0 1 0 6 0h4a3 3 0 1 0 6 0h.5a1.5 1.5 0 0 0 1.5-1.5v-3.361a1.5 1.5 0 0 0-.214-.772l-2.783-4.639a1.5 1.5 0 0 0-1.286-.728h-2.717v-1.5a1.5 1.5 0 0 0-1.5-1.5h-10zm13.5 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-11-1a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm13.234-6h-4.234v-3h2.434l1.8 3z"
        ></path>
      </svg>
    );
  } else if (prop == "cart_major_icon") {
    return (
      <svg
        style={{ fill: color }}
        viewBox="0 0 20 20"
        className="svg_icon"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M1 1c0-.552.45-1 1.004-1h1.505c.831 0 1.505.672 1.505 1.5v.56l12.574.908c.877.055 1.52.843 1.397 1.71l-.866 6.034a1.504 1.504 0 0 1-1.489 1.288h-11.616v2h10.043a3.005 3.005 0 0 1 3.011 3c0 1.657-1.348 3-3.01 3a3.005 3.005 0 0 1-2.84-4h-5.368a3.005 3.005 0 0 1-2.84 4 3.005 3.005 0 0 1-3.01-3c0-1.306.838-2.418 2.007-2.83v-12.17h-1.003a1.002 1.002 0 0 1-1.004-1zm4.014 3.064v5.936h11.18l.727-5.07-11.907-.866zm9.04 12.936c0-.552.449-1 1.003-1 .554 0 1.004.448 1.004 1s-.45 1-1.004 1a1.002 1.002 0 0 1-1.003-1zm-11.047 0c0-.552.45-1 1.004-1s1.003.448 1.003 1-.449 1-1.003 1a1.002 1.002 0 0 1-1.004-1z"
        ></path>
      </svg>
    );
  } else if (prop == "truck_fontawesome") {
    return (
      <svg
        style={{ fill: color }}
        className="svg_icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
      >
        <path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
      </svg>
    );
  } else if (prop == "tag_fontawesome") {
    return (
      <svg
        style={{ fill: color }}
        className="svg_icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
      </svg>
    );
  } else if (prop == "basket_fontawesome") {
    return (
      <svg
        style={{ fill: color }}
        className="svg_icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
      </svg>
    );
  } else if (prop == "shop_fontawesome") {
    return (
      <svg
        style={{ fill: color }}
        className="svg_icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
      >
        <path d="M36.8 192H603.2c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0H121.7c-16 0-31 8-39.9 21.4L6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM64 224V384v80c0 26.5 21.5 48 48 48H336c26.5 0 48-21.5 48-48V384 224H320V384H128V224H64zm448 0V480c0 17.7 14.3 32 32 32s32-14.3 32-32V224H512z" />
      </svg>
    );
  } else if (prop == "store_fontawesome") {
    return (
      <svg
        style={{ fill: color }}
        className="svg_icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path d="M531.6 103.8L474.3 13.1C469.2 5 460.1 0 450.4 0H93.6C83.9 0 74.8 5 69.7 13.1L12.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM483.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H112V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H432c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z" />
      </svg>
    );
  } else if (prop == "gift_fontawesome") {
    return (
      <svg
        style={{ fill: color }}
        className="svg_icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M190.5 68.8L225.3 128H224 152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40zM32 288V464c0 26.5 21.5 48 48 48H224V288H32zM288 512H432c26.5 0 48-21.5 48-48V288H288V512z" />
      </svg>
    );
  } else {
    return null;
  }
}
