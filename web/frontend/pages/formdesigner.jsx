import {
  Card,
  Page,
  Layout,
  TextContainer,
  Heading,
  Button,
  FormLayout,
  ButtonGroup,
  Banner,
  Stack,
  Select,
  Pagination,
  Icon,
  TextField,
  Checkbox,
  RangeSlider,
  Popover,
  ContextualSaveBar,
  Frame,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState, useCallback, useEffect } from "react";

import { formDesigner } from "../assets";

import {
  ButtonMinor,
  HeaderMajor,
  CircleUpMajor,
  CircleDownMajor,
  ViewMinor,
  HideMinor,
  EditMinor,
  TickMinor,
} from "@shopify/polaris-icons";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { HexColorPicker } from "react-colorful";

import {
  useAction,
  useFindFirst,
  useFindOne,
  useFindMany,
} from "@gadgetinc/react";

import { api } from "../api";

const finalSpaceCharacters = [
  {
    id: "order_summary_field",
    name: "ORDER SUMMARY",
    data: null,
    hidden: false,
  },
  {
    id: "totals_summary_field",
    name: "TOTALS SUMMARY",
    data: {
      field1: {
        type: "TextField",
        label: "Subtotal title",
        value: "Subtotal",
      },
      field2: {
        type: "TextField",
        label: "Shipping title",
        value: "Shipping",
      },
      field3: {
        type: "TextField",
        label: "Total title",
        value: "Total",
      },
    },
    hidden: false,
  },
  {
    id: "shipping_rates_field",
    name: "SHIPPING RATES",
    data: {
      field1: {
        type: "TextField",
        label: "Title",
        value: "Shipping method",
      },
      field2: {
        type: "TextField",
        label: "Free text",
        value: "Free",
      },
    },
    hidden: false,
  },
  // {
  //   id: "discount_codes_field",
  //   name: "DISCOUNT CODES",
  //   data: {
  //     invalid_discount_code_error_text: "Enter a valid discount code.",
  //     one_discount_code_allowed_error_text:
  //       "Only 1 discount per order is allowed.",
  //   },
  //   visibility: true,
  // },
  {
    id: "enter_your_shipping_address_field",
    name: "Enter your shipping address",
    data: {
      field1: {
        type: "TextField",
        label: "Text",
        value: "Enter your shipping address",
      },
      field2: {
        type: "Select",
        label: "Alignment",
        value: "center",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
        ],
      },
      field3: {
        type: "RangeSlider",
        label: "Font Size",
        value: 21,
      },
      field4: {
        type: "Select",
        label: "Font Weight",
        value: "bold",
        options: [
          { label: "Bold", value: "bold" },
          { label: "Normal", value: "normal" },
        ],
      },
    },
    hidden: false,
  },
  {
    id: "first_name_field",
    name: "First name",
    data: {
      field1: {
        type: "TextField",
        label: "Label",
        value: "First Name",
      },
      field2: {
        type: "TextField",
        label: "Placeholder",
        value: "First Name",
      },
      field3: {
        type: "Checkbox",
        label: "Show field icon",
        checked: true,
      },
      field4: {
        type: "Checkbox",
        label: "Required",
        checked: true,
      },
      field5: {
        type: "Minmax TextField",
        minLabel: "Min Length",
        minValue: 3,
        maxLabel: "Max Length",
        maxValue: 250,
      },
      field6: {
        type: "Helper TextField",
        label: "Invalid value error text",
        value: "",
        helpText:
          "If you leave this field empty the app will use your Invalid generic field error text if the customer enters an invalid value. You can edit the generic error text at the bottom of this page.",
      },
    },
    hidden: false,
  },
  {
    id: "last_name_field",
    name: "Last name",
    data: {
      field1: {
        type: "TextField",
        label: "Label",
        value: "Last Name",
      },
      field2: {
        type: "TextField",
        label: "Placeholder",
        value: "Last Name",
      },
      field3: {
        type: "Checkbox",
        label: "Show field icon",
        checked: true,
      },
      field4: {
        type: "Checkbox",
        label: "Required",
        checked: true,
      },
      field5: {
        type: "Minmax TextField",
        minLabel: "Min Length",
        minValue: 3,
        maxLabel: "Max Length",
        maxValue: 250,
      },
      field6: {
        type: "Helper TextField",
        label: "Invalid value error text",
        value: "",
        helpText:
          "If you leave this field empty the app will use your Invalid generic field error text if the customer enters an invalid value. You can edit the generic error text at the bottom of this page.",
      },
    },
    hidden: false,
  },
  {
    id: "phone_number_field",
    name: "Phone number",
    data: {
      field1: {
        type: "TextField",
        label: "Label",
        value: "Phone number",
      },
      field2: {
        type: "TextField",
        label: "Placeholder",
        value: "Phone",
      },
      field3: {
        type: "Checkbox",
        label: "Show field icon",
        checked: true,
      },
      field4: {
        type: "Checkbox",
        label: "Required",
        checked: true,
      },
      field5: {
        type: "Minmax TextField",
        minLabel: "Min Length",
        minValue: 1,
        maxLabel: "Max Length",
        maxValue: 15,
      },
      field6: {
        type: "TextField",
        label: "Invalid phone error text",
        value: "Enter a valid phone number.",
      },
    },
    hidden: false,
  },
  {
    id: "address_field",
    name: "Address",
    data: {
      field1: {
        type: "TextField",
        label: "Label",
        value: "Address",
      },
      field2: {
        type: "TextField",
        label: "Placeholder",
        value: "Address",
      },
      field3: {
        type: "Checkbox",
        label: "Show field icon",
        checked: true,
      },
      field4: {
        type: "Checkbox",
        label: "Required",
        checked: true,
      },
      field5: {
        type: "Minmax TextField",
        minLabel: "Min Length",
        minValue: 3,
        maxLabel: "Max Length",
        maxValue: 150,
      },
      field6: {
        type: "Helper TextField",
        label: "Invalid value error text",
        value: "",
        helpText:
          "If you leave this field empty the app will use your Invalid generic field error text if the customer enters an invalid value. You can edit the generic error text at the bottom of this page.",
      },
    },
    hidden: true,
  },
  {
    id: "address_2_field",
    name: "Address 2",
    data: {
      field1: {
        type: "TextField",
        label: "Label",
        value: "Address 2",
      },
      field2: {
        type: "TextField",
        label: "Placeholder",
        value: "Address 2",
      },
      field3: {
        type: "Checkbox",
        label: "Show field icon",
        checked: true,
      },
      field4: {
        type: "Checkbox",
        label: "Required",
        checked: false,
      },
      field5: {
        type: "Minmax TextField",
        minLabel: "Min Length",
        minValue: 3,
        maxLabel: "Max Length",
        maxValue: 150,
      },
      field6: {
        type: "Helper TextField",
        label: "Invalid value error text",
        value: "",
        helpText:
          "If you leave this field empty the app will use your Invalid generic field error text if the customer enters an invalid value. You can edit the generic error text at the bottom of this page.",
      },
    },
    hidden: true,
  },
  {
    id: "state_field",
    name: "State",
    data: {
      field1: {
        type: "TextField",
        label: "Label",
        value: "State",
      },
      field2: {
        type: "TextField",
        label: "Placeholder",
        value: "State",
      },
      field3: {
        type: "Checkbox",
        label: "Required",
        checked: true,
      },
    },
    hidden: false,
  },
  {
    id: "city_field",
    name: "City",
    data: {
      field1: {
        type: "TextField",
        label: "Label",
        value: "City",
      },
      field2: {
        type: "TextField",
        label: "Placeholder",
        value: "City",
      },
      field3: {
        type: "Checkbox",
        label: "Show field icon",
        checked: true,
      },
      field4: {
        type: "Checkbox",
        label: "Required",
        checked: true,
      },
      field5: {
        type: "Minmax TextField",
        minLabel: "Min Length",
        minValue: 3,
        maxLabel: "Max Length",
        maxValue: 10,
      },
      field6: {
        type: "Helper TextField",
        label: "Invalid value error text",
        value: "",
        helpText:
          "If you leave this field empty the app will use your Invalid generic field error text if the customer enters an invalid value. You can edit the generic error text at the bottom of this page.",
      },
    },
    hidden: false,
  },
  {
    id: "pincode_field",
    name: "Pincode",
    data: {
      field1: {
        type: "TextField",
        label: "Label",
        value: "Pincode",
      },
      field2: {
        type: "TextField",
        label: "Placeholder",
        value: "Pincode",
      },
      field3: {
        type: "Checkbox",
        label: "Show field icon",
        checked: true,
      },
      field4: {
        type: "Checkbox",
        label: "Required",
        checked: true,
      },
      field5: {
        type: "Minmax TextField",
        minLabel: "Min Length",
        minValue: 6,
        maxLabel: "Max Length",
        maxValue: 6,
      },
      field6: {
        type: "Helper TextField",
        label: "Invalid value error text",
        value: "",
        helpText:
          "If you leave this field empty the app will use your Invalid generic field error text if the customer enters an invalid value. You can edit the generic error text at the bottom of this page.",
      },
      field7: {
        type: "Checkbox",
        label: "Is Number?",
        checked: true,
      },
    },

    hidden: true,
  },
  {
    id: "email_field",
    name: "Email",
    data: {
      field1: {
        type: "TextField",
        label: "Label",
        value: "Email",
      },
      field2: {
        type: "TextField",
        label: "Placeholder",
        value: "Email",
      },
      field3: {
        type: "Checkbox",
        label: "Show field icon",
        checked: true,
      },
      field4: {
        type: "Checkbox",
        label: "Required",
        checked: false,
      },
      field5: {
        type: "Minmax TextField",
        minLabel: "Min Length",
        minValue: 1,
        maxLabel: "Max Length",
        maxValue: 100,
      },
      field6: {
        type: "TextField",
        label: "Invalid email error text",
        value: "Enter a valid email address.",
      },
    },
    hidden: true,
  },
  {
    id: "order_note_field",
    name: "Order Note",
    data: {
      field1: {
        type: "TextField",
        label: "Label",
        value: "Order Note",
      },
      field2: {
        type: "TextField",
        label: "Placeholder",
        value: "Order Note",
      },
      field3: {
        type: "Checkbox",
        label: "Show field icon",
        checked: true,
      },
      field4: {
        type: "Checkbox",
        label: "Required",
        checked: false,
      },
      field5: {
        type: "Minmax TextField",
        minLabel: "Min Length",
        minValue: 1,
        maxLabel: "Max Length",
        maxValue: 250,
      },
      field6: {
        type: "Helper TextField",
        label: "Invalid value error text",
        value: "",
        helpText:
          "If you leave this field empty the app will use your Invalid generic field error text if the customer enters an invalid value. You can edit the generic error text at the bottom of this page.",
      },
    },
    hidden: true,
  },
  // {
  //   id: "newsletter_field",
  //   name: "Subscribe to stay updated with new products and offers!",
  //   data: {
  //     label: "Subscribe to stay updated with new products and offers!",
  //     preselect_checkbox: false,
  //   },
  //   visibility: true,
  // },
  // {
  //   id: "accpet_terms_field",
  //   name: "Accept our terms and conditions",
  //   data: {
  //     label: "Accept our terms and conditions</a>",
  //     required: false,
  //   },
  //   visibility: true,
  // },
  {
    id: "summit_button_field",
    name: "COMPLETE ORDER - {order_total}",
    data: {
      field1: {
        type: "TextField",
        label: "Button text",
        value: "COMPLETE ORDER",
      },
    },
    hidden: false,
  },
];

export default function FormDesigner() {
  const [result] = useFindFirst(api.shopifyShop, {
    select: { countryName: true, countryCode: true },
  });
  const { data, fetching, error } = result;

  const [characters, updateCharacters] = useState(finalSpaceCharacters);
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    //running javascript to move the elements.
    let drag = document.querySelector(`#${result.draggableId}`);
    let drop = document.querySelector(
      `#${characters[result.destination.index].id}`
    );

    if (result.source.index > result.destination.index) {
      drop.before(drag);
    } else {
      drop.after(drag);
    }

    updateCharacters(items);

    if (result.source.index !== result.destination.index) {
      setContextualSaveBar(true);
    }
  }

  const [formDesignerData2, setFormDesignerData2] = useState({
    titleName: "Loading...",
    hideCloseButton: false,
    hideFieldLabels: false,
    textfieldFocusColor: "textfieldfocus-blue",
    textfieldBorderRadius: "6",
    textfieldBorderWidth: "2px",
    requiredErrorText: "This field is required.",
    invalidValueErrorText: "Enter a valid value.",
  });

  const titleFormHandleChange = useCallback((newValue) => {
    setFormDesignerData2((prevState) => ({
      ...prevState,
      titleName: newValue,
    }));
    setContextualSaveBar(true);
  }, []);

  const hideCloseFormButtonHandleChange = useCallback((newValue) => {
    setFormDesignerData2((prevState) => ({
      ...prevState,
      hideCloseButton: newValue,
    }));
    setContextualSaveBar(true);
  }, []);

  const hideFieldsLabelsHandleChange = useCallback((newValue) => {
    setFormDesignerData2((prevState) => ({
      ...prevState,
      hideFieldLabels: newValue,
    }));
    setContextualSaveBar(true);
  }, []);

  // we don't send this data to database, it's only for frontend use
  const [editButtonValue, setEditButtonValue] = useState({
    totals_summary_field: false,
    shipping_rates_field: false,
    enter_your_shipping_address_field: false,
    first_name_field: false,
    last_name_field: false,
    phone_number_field: false,
    state_field: false,
    city_field: false,
    summit_button_field: false,
  });
  const handleChangeee = useCallback((newValue, id, key) => {
    console.log("value of id is " + id + " and value of key is " + key);
    updateCharacters((prevState) => {
      // Find the index of the object with id "totals_summary_field"
      const index = prevState.findIndex((obj) => obj.id === id);
      if (index !== -1) {
        // Create a new data object with the updated field1 value
        const updatedData = {
          ...prevState[index].data,
          [key]: {
            ...prevState[index].data[key],
            value: newValue,
          },
        };
        // Create a new object with the same properties except for data
        const updatedObj = { ...prevState[index], data: updatedData };
        // Create a new array with the updated object and the rest of the objects
        const updatedArr = [
          ...prevState.slice(0, index),
          updatedObj,
          ...prevState.slice(index + 1),
        ];
        // Return the updated array
        return updatedArr;
      } else {
        // If the object is not found, return the previous state
        return prevState;
      }
    });
    setContextualSaveBar(true);
  }, []);

  const handleChangeee2 = useCallback((newValue, id, key) => {
    console.log("value of id is " + id + " and value of key is " + key);
    updateCharacters((prevState) => {
      // Find the index of the object with id "totals_summary_field"
      const index = prevState.findIndex((obj) => obj.id === id);
      if (index !== -1) {
        // Create a new data object with the updated field1 value
        const updatedData = {
          ...prevState[index].data,
          [key]: {
            ...prevState[index].data[key],
            value: newValue,
          },
        };
        // Create a new object with the same properties except for data
        const updatedObj = { ...prevState[index], data: updatedData };
        // Create a new array with the updated object and the rest of the objects
        const updatedArr = [
          ...prevState.slice(0, index),
          updatedObj,
          ...prevState.slice(index + 1),
        ];
        // Return the updated array
        return updatedArr;
      } else {
        // If the object is not found, return the previous state
        return prevState;
      }
    });
    setContextualSaveBar(true);
  }, []);

  const handleChangeee3 = useCallback((newValue, id, key) => {
    console.log("value of id is " + id + " and value of key is " + key);
    updateCharacters((prevState) => {
      // Find the index of the object with id "totals_summary_field"
      const index = prevState.findIndex((obj) => obj.id === id);
      if (index !== -1) {
        // Create a new data object with the updated field1 value
        const updatedData = {
          ...prevState[index].data,
          [key]: {
            ...prevState[index].data[key],
            checked: !prevState[index].data[key].checked,
          },
        };
        // Create a new object with the same properties except for data
        const updatedObj = { ...prevState[index], data: updatedData };
        // Create a new array with the updated object and the rest of the objects
        const updatedArr = [
          ...prevState.slice(0, index),
          updatedObj,
          ...prevState.slice(index + 1),
        ];
        // Return the updated array
        return updatedArr;
      } else {
        // If the object is not found, return the previous state
        return prevState;
      }
    });
    setContextualSaveBar(true);
  }, []);

  const handleChangeee4 = useCallback((newValue, id, key) => {
    updateCharacters((prevState) => {
      const index = prevState.findIndex((obj) => obj.id === id);
      if (index !== -1) {
        const updatedData = {
          ...prevState[index].data,
          [key]: {
            ...prevState[index].data[key],
            value: newValue,
          },
        };
        const updatedObj = { ...prevState[index], data: updatedData };
        const updatedArr = [
          ...prevState.slice(0, index),
          updatedObj,
          ...prevState.slice(index + 1),
        ];
        return updatedArr;
      } else {
        return prevState;
      }
    });
    setContextualSaveBar(true);
  }, []);

  const handleChangeee5MinValue = useCallback((newValue, id, key) => {
    updateCharacters((prevState) => {
      const index = prevState.findIndex((obj) => obj.id === id);
      if (index !== -1) {
        const updatedData = {
          ...prevState[index].data,
          [key]: {
            ...prevState[index].data[key],
            minValue: newValue,
          },
        };
        const updatedObj = { ...prevState[index], data: updatedData };
        const updatedArr = [
          ...prevState.slice(0, index),
          updatedObj,
          ...prevState.slice(index + 1),
        ];
        return updatedArr;
      } else {
        return prevState;
      }
    });
    setContextualSaveBar(true);
  }, []);

  const handleChangeee5MaxValue = useCallback((newValue, id, key) => {
    updateCharacters((prevState) => {
      const index = prevState.findIndex((obj) => obj.id === id);
      if (index !== -1) {
        const updatedData = {
          ...prevState[index].data,
          [key]: {
            ...prevState[index].data[key],
            maxValue: newValue,
          },
        };
        const updatedObj = { ...prevState[index], data: updatedData };
        const updatedArr = [
          ...prevState.slice(0, index),
          updatedObj,
          ...prevState.slice(index + 1),
        ];
        return updatedArr;
      } else {
        return prevState;
      }
    });
    setContextualSaveBar(true);
  }, []);

  const handleChangeee6 = useCallback((newValue, id, key) => {
    updateCharacters((prevState) => {
      const index = prevState.findIndex((obj) => obj.id === id);
      if (index !== -1) {
        const updatedData = {
          ...prevState[index].data,
          [key]: {
            ...prevState[index].data[key],
            value: newValue,
          },
        };
        const updatedObj = { ...prevState[index], data: updatedData };
        const updatedArr = [
          ...prevState.slice(0, index),
          updatedObj,
          ...prevState.slice(index + 1),
        ];
        return updatedArr;
      } else {
        return prevState;
      }
    });
    setContextualSaveBar(true);
  }, []);

  function editFormFields(id) {
    if (editButtonValue[id]) {
      const obj = characters.find((obj) => obj.id === id);
      if (obj && obj.data) {
        for (const key in obj.data) {
          if (typeof obj.data[key] === "object") {
            // The property value is an object
            return (
              <div>
                <Stack vertical>
                  {Object.entries(obj.data).map(([key, value]) => {
                    console.log(`key: ${key}, value: ${JSON.stringify(value)}`);

                    switch (value.type) {
                      case "TextField":
                        return (
                          <TextField
                            label={value.label}
                            value={value.value}
                            onChange={(newValue) =>
                              handleChangeee(newValue, id, key)
                            }
                          />
                        );
                      case "Select":
                        return (
                          <Select
                            label={value.label}
                            value={value.value}
                            options={value.options}
                            onChange={(newValue) =>
                              handleChangeee2(newValue, id, key)
                            }
                          />
                        );
                      case "RangeSlider":
                        return (
                          <RangeSlider
                            label={value.label}
                            value={value.value}
                            onChange={(newValue) => {
                              handleChangeee4(newValue, id, key);
                            }}
                            output
                            min={10}
                            max={21}
                          />
                        );
                      case "Checkbox":
                        return (
                          <Checkbox
                            label={value.label}
                            checked={value.checked}
                            onChange={(newValue) =>
                              handleChangeee3(newValue, id, key)
                            }
                          />
                        );
                      case "Minmax TextField":
                        return (
                          <Stack>
                            <TextField
                              label={value.minLabel}
                              value={value.minValue}
                              type="number"
                              onChange={(newValue) => {
                                handleChangeee5MinValue(newValue, id, key);
                              }}
                            />
                            <TextField
                              label={value.maxLabel}
                              value={value.maxValue}
                              type="number"
                              onChange={(newValue) => {
                                handleChangeee5MaxValue(newValue, id, key);
                              }}
                            />
                          </Stack>
                        );
                      case "Helper TextField":
                        return (
                          <TextField
                            label={value.label}
                            value={value.value}
                            helpText={value.helpText}
                            onChange={(newValue) => {
                              handleChangeee6(newValue, id, key);
                            }}
                          />
                        );
                      default:
                        return null;
                    }
                  })}
                </Stack>
              </div>
            );
          } else {
            // The property value is not an object
            return <div>The property value is not an object.</div>;
          }
        }
      }
    } else {
      return null;
    }
  }

  const [whichTabUserOn, setWhichTabUserOn] = useState("popup");
  const [bannerText, setBannerText] = useState(
    "Upon clicking the app's Buy Button, a form will appear as a popup on the same page for your customers to complete their purchase."
  );

  const [selected, setSelected] = useState(`IN`);

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    { label: `${data?.countryName}`, value: `${data?.countryCode}` },
  ];

  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const realArray = ["sanju", "rakesh", "agam", "maga"];

  const activator = (
    <div>
      <Button onClick={togglePopoverActive} disclosure>
        Color
      </Button>
      <p style={{ color: "grey" }}>
        Textbox on focus color, click on any textbox to see the effect.
      </p>
    </div>
  );

  function handleTextboxBorderRadiusChange(newValue) {
    setFormDesignerData2((prevState) => ({
      ...prevState,
      textfieldBorderRadius: newValue,
    }));
    setContextualSaveBar(true);
  }

  const runReadMetafieldFunction = async () => {
    try {
      const data = await api.readMetafield({ key: "form_designer_page_json" });
      // setBuyButtonData(JSON.parse(data.response));
      console.log(JSON.parse(data.response2));

      const responesArray = JSON.parse(data.response);
      let modalContainer = document.getElementById("mainModalContainer");

      responesArray.map((element, index) => {
        const currentElement = document.getElementById(element.id);
        modalContainer.append(currentElement);
      });

      updateCharacters(JSON.parse(data.response));
      setFormDesignerData2(JSON.parse(data.response2));
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Data fetching complete.");
    }
  };

  const runUpdateMetafieldFunction = useCallback(async (param1, param2) => {
    try {
      await api.updateMetafield({
        key: "form_designer_page_json",
        data: param1,
        data2: param2,
      });
      setContextualSaveBarSaveButtonLoading(false);
      setContextualSaveBar(false);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Data updating complete.");
    }
  });

  useEffect(() => {
    runReadMetafieldFunction();
  }, []);

  const [contextualSaveBar, setContextualSaveBar] = useState(false);
  const [
    contextualSaveBarSaveButtonLoading,
    setContextualSaveBarSaveButtonLoading,
  ] = useState(false);

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
                runUpdateMetafieldFunction(
                  JSON.stringify(characters),
                  JSON.stringify(formDesignerData2)
                );
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
          <FormLayout>
            <p style={{ fontWeight: "bold", fontSize: 15 }}>
              1. Select your form mode
            </p>
            <Card sectioned>
              <Stack vertical>
                <ButtonGroup segmented>
                  <Button
                    primary={whichTabUserOn == "popup" ? true : false}
                    onClick={() => {
                      setWhichTabUserOn("popup");
                      setBannerText(
                        "Upon clicking the app's Buy Button, a form will appear as a popup on the same page for your customers to complete their purchase."
                      );
                    }}
                  >
                    Popup
                  </Button>
                  <Button
                    primary={whichTabUserOn == "embedded" ? true : false}
                    onClick={() => {
                      setWhichTabUserOn("embedded");
                      setBannerText(
                        "Your customers will see the form embedded directly on their pages so they won't have to click any buttons to open it."
                      );
                    }}
                    disabled
                  >
                    Embedded (Coming Soon)
                  </Button>
                </ButtonGroup>
                <Banner status="info">
                  <FormLayout>
                    <p>{bannerText}</p>
                  </FormLayout>
                </Banner>
              </Stack>
            </Card>

            <p style={{ fontWeight: "bold", fontSize: 15 }}>
              2. COD Form country (View Only)
            </p>
            <p style={{ fontSize: 14 }}>
              The country you have selected in Shopify determines the
              international dialing code, currency, and state/province/etc that
              will be used for your order.
            </p>
            <Card sectioned>
              <Select
                label="Country"
                options={options}
                onChange={handleSelectChange}
                value={`${data?.countryCode}`}
                disabled
              />
            </Card>
            <p style={{ fontWeight: "bold", fontSize: 15 }}>
              3. Customize your form (Drag and Drop List)
            </p>
            <Card sectioned>
              <Stack vertical>
                <Select
                  label="Textbox border width"
                  options={[
                    { label: "2px", value: "2px" },
                    { label: "1px", value: "1px" },
                  ]}
                  value={formDesignerData2.textfieldBorderWidth}
                  onChange={(newValue) => {
                    setFormDesignerData2((prevState) => ({
                      ...prevState,
                      textfieldBorderWidth: newValue,
                    }));
                    setContextualSaveBar(true);
                  }}
                />

                <Popover
                  active={popoverActive}
                  activator={activator}
                  autofocusTarget="first-node"
                  onClose={togglePopoverActive}
                >
                  <div style={{ padding: "10px", display: "flex", gap: "7px" }}>
                    <div
                      style={{
                        padding: "15px",
                        backgroundColor: "dodgerBlue",
                        borderRadius: "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setFormDesignerData2((prevState) => ({
                          ...prevState,
                          textfieldFocusColor: "textfieldfocus-blue",
                        }));
                        togglePopoverActive();
                        setContextualSaveBar(true);
                      }}
                    />
                    <div
                      style={{
                        padding: "15px",
                        backgroundColor: "#ff381e",
                        borderRadius: "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setFormDesignerData2((prevState) => ({
                          ...prevState,
                          textfieldFocusColor: "textfieldfocus-red",
                        }));
                        togglePopoverActive();
                        setContextualSaveBar(true);
                      }}
                    />
                    <div
                      style={{
                        padding: "15px",
                        backgroundColor: "#8f1eff",
                        borderRadius: "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setFormDesignerData2((prevState) => ({
                          ...prevState,
                          textfieldFocusColor: "textfieldfocus-purple",
                        }));
                        togglePopoverActive();
                        setContextualSaveBar(true);
                      }}
                    />
                    <div
                      style={{
                        padding: "15px",
                        backgroundColor: "#ff1ec3",
                        borderRadius: "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setFormDesignerData2((prevState) => ({
                          ...prevState,
                          textfieldFocusColor: "textfieldfocus-pink",
                        }));
                        togglePopoverActive();
                        setContextualSaveBar(true);
                      }}
                    />
                    <div
                      style={{
                        padding: "15px",
                        backgroundColor: "#ff8b1e",
                        borderRadius: "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setFormDesignerData2((prevState) => ({
                          ...prevState,
                          textfieldFocusColor: "textfieldfocus-orange",
                        }));
                        togglePopoverActive();
                        setContextualSaveBar(true);
                      }}
                    />
                    <div
                      style={{
                        padding: "15px",
                        backgroundColor: "#ff561e",
                        borderRadius: "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setFormDesignerData2((prevState) => ({
                          ...prevState,
                          textfieldFocusColor: "textfieldfocus-brown",
                        }));
                        togglePopoverActive();
                        setContextualSaveBar(true);
                      }}
                    />
                  </div>
                </Popover>

                <RangeSlider
                  label="Textbox border radius"
                  value={formDesignerData2.textfieldBorderRadius}
                  onChange={handleTextboxBorderRadiusChange}
                  output
                  min={0}
                  max={20}
                />

                <TextField
                  label="Title Form"
                  value={formDesignerData2.titleName}
                  onChange={titleFormHandleChange}
                />
                <Checkbox
                  label="Hide close form button"
                  checked={formDesignerData2.hideCloseButton}
                  onChange={hideCloseFormButtonHandleChange}
                />
                <Checkbox
                  label="Hide fields labels"
                  checked={formDesignerData2.hideFieldLabels}
                  onChange={hideFieldsLabelsHandleChange}
                />

                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="characters">
                    {(provided) => (
                      <ul
                        className="characters"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {characters.map(({ id, name, data }, index) => {
                          return (
                            <Draggable key={id} draggableId={id} index={index}>
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      width: "100%",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <div className="container">
                                        <Button
                                          onClick={() => {
                                            updateCharacters((prevState) => {
                                              // Find the index of the object with id "shipping_rates_field"
                                              const index = prevState.findIndex(
                                                (obj) => obj.id === id
                                              );
                                              if (index !== -1) {
                                                // Create a new object with the same properties except for visibility
                                                const updatedObj = {
                                                  ...prevState[index],
                                                  hidden:
                                                    !prevState[index].hidden,
                                                };
                                                // Create a new array with the updated object and the rest of the objects
                                                const updatedArr = [
                                                  ...prevState.slice(0, index),
                                                  updatedObj,
                                                  ...prevState.slice(index + 1),
                                                ];
                                                // Return the updated array
                                                return updatedArr;
                                              } else {
                                                // If the object is not found, return the previous state
                                                return prevState;
                                              }
                                            });
                                            setContextualSaveBar(true);
                                          }}
                                          icon={
                                            characters.find(
                                              (obj) => obj.id === id
                                            ).hidden
                                              ? HideMinor
                                              : ViewMinor
                                          }
                                        />
                                        <p
                                          style={{
                                            fontWeight: "600",
                                            fontSize: 14,
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {name}
                                        </p>
                                      </div>
                                      {data !== null ? (
                                        <div style={{ marginRight: "10px" }}>
                                          <Button
                                            onClick={() => {
                                              setEditButtonValue(
                                                (prevState) => ({
                                                  ...prevState,
                                                  [id]: !prevState[id],
                                                })
                                              );
                                            }}
                                            icon={
                                              editButtonValue[id]
                                                ? TickMinor
                                                : EditMinor
                                            }
                                          ></Button>
                                        </div>
                                      ) : null}
                                    </div>
                                    <hr
                                      style={{
                                        marginTop: "15px",
                                        marginBottom: "10px",
                                        display: !editButtonValue[id]
                                          ? "none"
                                          : null,
                                      }}
                                    />
                                    {editFormFields(id)}
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </Stack>
            </Card>
            <p style={{ fontWeight: "bold", fontSize: 15 }}>
              4. Customize the generic form texts
            </p>
            <Card sectioned>
              <Stack vertical>
                <TextField
                  label="Required error text"
                  value={formDesignerData2.requiredErrorText}
                  onChange={(newValue) => {
                    setFormDesignerData2((prevState) => ({
                      ...prevState,
                      requiredErrorText: newValue,
                    }));
                    setContextualSaveBar(true);
                  }}
                />
                <TextField
                  label="Invalid value error text"
                  value={formDesignerData2.invalidValueErrorText}
                  onChange={(newValue) => {
                    setFormDesignerData2((prevState) => ({
                      ...prevState,
                      invalidValueErrorText: newValue,
                    }));
                    setContextualSaveBar(true);
                  }}
                />
              </Stack>
            </Card>
          </FormLayout>
        </Layout.Section>

        <div className="onehalf">
          <p style={{ fontWeight: "bold" }}>Live Preview: </p>
          <div
            className="container"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              padding: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <section
              id="mainModalContainer"
              className="modal hidden"
              style={{ backgroundColor: "white" }}
            >
              <div className="flex">
                <h3>{formDesignerData2.titleName}</h3>
                <button
                  style={{
                    display: formDesignerData2.hideCloseButton
                      ? "none"
                      : "inline",
                  }}
                  className="btn-close"
                >
                  <i
                    className="fa-solid fa-xmark"
                    style={{ fontSize: "18px" }}
                  ></i>
                </button>
              </div>

              <div
                style={{
                  display: characters.find(
                    (obj) => obj.id === "order_summary_field"
                  ).hidden
                    ? "none"
                    : null,
                }}
                id="order_summary_field"
              >
                <hr
                  style={{
                    height: "1px",
                    backgroundColor: "silver",
                    border: "none",
                    marginBottom: "5px",
                  }}
                />
                <div className="flex">
                  <div className="flex">
                    <img
                      className="img"
                      src="https://cdn.shopify.com/s/files/1/0381/0823/3863/products/58_9bf0f11f-af10-49d9-af79-df2e0e338b56.jpg?v=1649056202"
                      alt="Product Image"
                      width="500"
                      height="600"
                    />
                    <h5 style={{ margin: "10px" }}>3D Screen Magnifier</h5>
                  </div>
                  <label>Rs. 599.00</label>
                </div>
                <hr
                  style={{
                    height: "1px",
                    backgroundColor: "silver",
                    border: "none",
                    marginTop: "5px",
                  }}
                />
              </div>

              <div
                id="totals_summary_field"
                style={{
                  display: characters.find(
                    (obj) => obj.id === "totals_summary_field"
                  ).hidden
                    ? "none"
                    : "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "0.4rem",
                  backgroundColor: "#e8ebe9",
                  padding: "10px",
                  borderRadius: "6px",
                  marginTop: "7px",
                  marginBottom: "7px",
                }}
              >
                <div className="flex">
                  <h5>
                    {
                      characters.find(
                        (obj) => obj.id === "totals_summary_field"
                      ).data.field1.value
                    }
                  </h5>
                  <label>Rs. 599.00</label>
                </div>
                <div className="flex">
                  <h5>
                    {
                      characters.find(
                        (obj) => obj.id === "totals_summary_field"
                      ).data.field2.value
                    }
                  </h5>
                  <label>Free</label>
                </div>
                <hr
                  style={{
                    height: "1px",
                    backgroundColor: "silver",
                    border: "none",
                  }}
                />
                <div className="flex">
                  <h5>
                    {
                      characters.find(
                        (obj) => obj.id === "totals_summary_field"
                      ).data.field3.value
                    }
                  </h5>
                  <label>Rs. 599.00</label>
                </div>
              </div>

              <div
                style={{
                  display: characters.find(
                    (obj) => obj.id === "shipping_rates_field"
                  ).hidden
                    ? "none"
                    : null,
                }}
                id="shipping_rates_field"
              >
                <label style={{ marginTop: "7px" }}>
                  {
                    characters.find((obj) => obj.id === "shipping_rates_field")
                      .data.field1.value
                  }
                </label>
                <div
                  className="flex"
                  style={{
                    padding: "12px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    marginBottom: "7px",
                  }}
                >
                  <div className="flex">
                    <input
                      type="radio"
                      id="html"
                      name="fav_language"
                      value="HTML"
                      defaultChecked
                      style={{ cursor: "pointer", width: "auto" }}
                    />
                    <label
                      htmlFor="html"
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                    >
                      Free Shipping
                    </label>
                  </div>
                  <label>
                    {
                      characters.find(
                        (obj) => obj.id === "shipping_rates_field"
                      ).data.field2.value
                    }
                  </label>
                </div>
              </div>

              <div
                id="enter_your_shipping_address_field"
                style={{
                  display: characters.find(
                    (obj) => obj.id === "enter_your_shipping_address_field"
                  ).hidden
                    ? "none"
                    : "flex",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  justifyContent: characters.find(
                    (obj) => obj.id === "enter_your_shipping_address_field"
                  ).data.field2.value,
                }}
              >
                <p
                  style={{
                    fontWeight: characters.find(
                      (obj) => obj.id === "enter_your_shipping_address_field"
                    ).data.field4.value,
                    fontSize: `${
                      characters.find(
                        (obj) => obj.id === "enter_your_shipping_address_field"
                      ).data.field3.value
                    }px`,
                  }}
                >
                  {
                    characters.find(
                      (obj) => obj.id === "enter_your_shipping_address_field"
                    ).data.field1.value
                  }
                </p>
              </div>

              <div
                id="first_name_field"
                className="first_name_div_field"
                style={{
                  display: characters.find(
                    (obj) => obj.id === "first_name_field"
                  ).hidden
                    ? "none"
                    : null,
                  marginTop: "6px",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    display: formDesignerData2.hideFieldLabels
                      ? "none"
                      : "inline",
                  }}
                  className={
                    characters.find((obj) => obj.id === "first_name_field").data
                      .field4.checked
                      ? "required"
                      : undefined
                  }
                >
                  {
                    characters.find((obj) => obj.id === "first_name_field").data
                      .field1.value
                  }{" "}
                </label>
                <div className="inputWithIcon" style={{ marginTop: "5px" }}>
                  <input
                    type="text"
                    placeholder={
                      characters.find((obj) => obj.id === "first_name_field")
                        .data.field2.value
                    }
                    autoComplete="off"
                    className={formDesignerData2.textfieldFocusColor}
                    style={{
                      borderRadius: `${formDesignerData2.textfieldBorderRadius}px`,
                      border: `${formDesignerData2.textfieldBorderWidth} solid #aaa`,
                      paddingLeft: characters.find(
                        (obj) => obj.id === "first_name_field"
                      ).data.field3.checked
                        ? "35px"
                        : "12px",
                    }}
                    minLength={
                      characters.find((obj) => obj.id === "first_name_field")
                        .data.field5.minValue
                    }
                    maxLength={
                      characters.find((obj) => obj.id === "first_name_field")
                        .data.field5.maxValue
                    }
                  />
                  <i
                    style={{
                      display: characters.find(
                        (obj) => obj.id === "first_name_field"
                      ).data.field3.checked
                        ? undefined
                        : "none",
                    }}
                    className="fa fa-user fa-lg fa-fw"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>

              <div
                id="last_name_field"
                style={{
                  display: characters.find(
                    (obj) => obj.id === "last_name_field"
                  ).hidden
                    ? "none"
                    : null,
                  marginTop: "6px",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    display: formDesignerData2.hideFieldLabels
                      ? "none"
                      : "inline",
                  }}
                  className={
                    characters.find((obj) => obj.id === "last_name_field").data
                      .field4.checked
                      ? "required"
                      : undefined
                  }
                >
                  {
                    characters.find((obj) => obj.id === "last_name_field").data
                      .field1.value
                  }
                </label>
                <div className="inputWithIcon" style={{ marginTop: "5px" }}>
                  <input
                    type="text"
                    placeholder={
                      characters.find((obj) => obj.id === "last_name_field")
                        .data.field2.value
                    }
                    className={formDesignerData2.textfieldFocusColor}
                    style={{
                      borderRadius: `${formDesignerData2.textfieldBorderRadius}px`,
                      border: `${formDesignerData2.textfieldBorderWidth} solid #aaa`,
                      paddingLeft: characters.find(
                        (obj) => obj.id === "last_name_field"
                      ).data.field3.checked
                        ? "35px"
                        : "12px",
                    }}
                    minLength={
                      characters.find((obj) => obj.id === "last_name_field")
                        .data.field5.minValue
                    }
                    maxLength={
                      characters.find((obj) => obj.id === "last_name_field")
                        .data.field5.maxValue
                    }
                  />
                  <i
                    style={{
                      display: characters.find(
                        (obj) => obj.id === "last_name_field"
                      ).data.field3.checked
                        ? undefined
                        : "none",
                    }}
                    className="fa fa-user fa-lg fa-fw"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>

              <div
                id="phone_number_field"
                style={{
                  display: characters.find(
                    (obj) => obj.id === "phone_number_field"
                  ).hidden
                    ? "none"
                    : null,
                  marginTop: "6px",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    display: formDesignerData2.hideFieldLabels
                      ? "none"
                      : "inline",
                  }}
                  className={
                    characters.find((obj) => obj.id === "phone_number_field")
                      .data.field4.checked
                      ? "required"
                      : undefined
                  }
                >
                  {
                    characters.find((obj) => obj.id === "phone_number_field")
                      .data.field1.value
                  }
                </label>
                <div className="inputWithIcon" style={{ marginTop: "5px" }}>
                  <input
                    type="number"
                    placeholder={
                      characters.find((obj) => obj.id === "phone_number_field")
                        .data.field2.value
                    }
                    className={formDesignerData2.textfieldFocusColor}
                    style={{
                      borderRadius: `${formDesignerData2.textfieldBorderRadius}px`,
                      border: `${formDesignerData2.textfieldBorderWidth} solid #aaa`,
                      paddingLeft: characters.find(
                        (obj) => obj.id === "phone_number_field"
                      ).data.field3.checked
                        ? "35px"
                        : "12px",
                    }}
                    minLength={
                      characters.find((obj) => obj.id === "phone_number_field")
                        .data.field5.minValue
                    }
                    maxLength={
                      characters.find((obj) => obj.id === "phone_number_field")
                        .data.field5.maxValue
                    }
                  />
                  <i
                    style={{
                      display: characters.find(
                        (obj) => obj.id === "phone_number_field"
                      ).data.field3.checked
                        ? undefined
                        : "none",
                    }}
                    className="fa fa-phone fa-lg fa-fw"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>

              <div
                id="address_field"
                className="city_div_field"
                style={{
                  display: characters.find((obj) => obj.id === "address_field")
                    .hidden
                    ? "none"
                    : null,
                  marginTop: "6px",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    display: formDesignerData2.hideFieldLabels
                      ? "none"
                      : "inline",
                  }}
                  className={
                    characters.find((obj) => obj.id === "address_field").data
                      .field4.checked
                      ? "required"
                      : undefined
                  }
                >
                  {
                    characters.find((obj) => obj.id === "address_field").data
                      .field1.value
                  }
                </label>
                <div className="inputWithIcon" style={{ marginTop: "5px" }}>
                  <input
                    type="text"
                    placeholder={
                      characters.find((obj) => obj.id === "address_field").data
                        .field2.value
                    }
                    className={formDesignerData2.textfieldFocusColor}
                    style={{
                      borderRadius: `${formDesignerData2.textfieldBorderRadius}px`,
                      border: `${formDesignerData2.textfieldBorderWidth} solid #aaa`,
                      paddingLeft: characters.find(
                        (obj) => obj.id === "address_field"
                      ).data.field3.checked
                        ? "35px"
                        : "12px",
                    }}
                    minLength={
                      characters.find((obj) => obj.id === "address_field").data
                        .field5.minValue
                    }
                    maxLength={
                      characters.find((obj) => obj.id === "address_field").data
                        .field5.maxValue
                    }
                  />
                  <i
                    style={{
                      display: characters.find(
                        (obj) => obj.id === "address_field"
                      ).data.field3.checked
                        ? undefined
                        : "none",
                    }}
                    className="fa fa-location-dot fa-lg fa-fw"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>

              <div
                id="address_2_field"
                className="city_div_field"
                style={{
                  display: characters.find(
                    (obj) => obj.id === "address_2_field"
                  ).hidden
                    ? "none"
                    : null,
                  marginTop: "6px",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    display: formDesignerData2.hideFieldLabels
                      ? "none"
                      : "inline",
                  }}
                  className={
                    characters.find((obj) => obj.id === "address_2_field").data
                      .field4.checked
                      ? "required"
                      : undefined
                  }
                >
                  {
                    characters.find((obj) => obj.id === "address_2_field").data
                      .field1.value
                  }
                </label>
                <div className="inputWithIcon" style={{ marginTop: "5px" }}>
                  <input
                    type="text"
                    placeholder={
                      characters.find((obj) => obj.id === "address_2_field")
                        .data.field2.value
                    }
                    className={formDesignerData2.textfieldFocusColor}
                    style={{
                      borderRadius: `${formDesignerData2.textfieldBorderRadius}px`,
                      border: `${formDesignerData2.textfieldBorderWidth} solid #aaa`,
                      paddingLeft: characters.find(
                        (obj) => obj.id === "address_2_field"
                      ).data.field3.checked
                        ? "35px"
                        : "12px",
                    }}
                    minLength={
                      characters.find((obj) => obj.id === "address_2_field")
                        .data.field5.minValue
                    }
                    maxLength={
                      characters.find((obj) => obj.id === "address_2_field")
                        .data.field5.maxValue
                    }
                  />
                  <i
                    style={{
                      display: characters.find(
                        (obj) => obj.id === "address_2_field"
                      ).data.field3.checked
                        ? undefined
                        : "none",
                    }}
                    className="fa fa-location-dot fa-lg fa-fw"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>

              <div
                id="state_field"
                style={{
                  display: characters.find((obj) => obj.id === "state_field")
                    .hidden
                    ? "none"
                    : null,
                  marginTop: "6px",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    display: formDesignerData2.hideFieldLabels
                      ? "none"
                      : "inline",
                  }}
                  className={
                    characters.find((obj) => obj.id === "state_field").data
                      .field3.checked
                      ? "required"
                      : undefined
                  }
                >
                  {
                    characters.find((obj) => obj.id === "state_field").data
                      .field1.value
                  }
                </label>
                <select
                  name="cars"
                  id="cars"
                  className={formDesignerData2.textfieldFocusColor}
                  style={{
                    marginTop: "5px",
                    height: "34px",
                    padding: "5px",
                    borderRadius: `${formDesignerData2.textfieldBorderRadius}px`,
                    border: `${formDesignerData2.textfieldBorderWidth} solid #aaa`,
                  }}
                >
                  <option value="state">
                    {
                      characters.find((obj) => obj.id === "state_field").data
                        .field2.value
                    } 
                  </option>
                  {/*                  <option value="saab">Assam</option>
                  <option value="mercedes">Tripura</option>
                  <option value="audi">Tamil Nadu</option>
*/}{" "}
                </select>
              </div>

              <div
                id="city_field"
                className="city_div_field"
                style={{
                  display: characters.find((obj) => obj.id === "city_field")
                    .hidden
                    ? "none"
                    : null,
                  marginTop: "6px",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    display: formDesignerData2.hideFieldLabels
                      ? "none"
                      : "inline",
                  }}
                  className={
                    characters.find((obj) => obj.id === "city_field").data
                      .field4.checked
                      ? "required"
                      : undefined
                  }
                >
                  {
                    characters.find((obj) => obj.id === "city_field").data
                      .field1.value
                  }
                </label>
                <div className="inputWithIcon" style={{ marginTop: "5px" }}>
                  <input
                    type="text"
                    placeholder={
                      characters.find((obj) => obj.id === "city_field").data
                        .field2.value
                    }
                    className={formDesignerData2.textfieldFocusColor}
                    style={{
                      borderRadius: `${formDesignerData2.textfieldBorderRadius}px`,
                      border: `${formDesignerData2.textfieldBorderWidth} solid #aaa`,
                      paddingLeft: characters.find(
                        (obj) => obj.id === "city_field"
                      ).data.field3.checked
                        ? "35px"
                        : "12px",
                    }}
                    minLength={
                      characters.find((obj) => obj.id === "city_field").data
                        .field5.minValue
                    }
                    maxLength={
                      characters.find((obj) => obj.id === "city_field").data
                        .field5.maxValue
                    }
                  />
                  <i
                    style={{
                      display: characters.find((obj) => obj.id === "city_field")
                        .data.field3.checked
                        ? undefined
                        : "none",
                    }}
                    className="fa fa-location-dot fa-lg fa-fw"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>

              <div
                id="pincode_field"
                className="city_div_field"
                style={{
                  display: characters.find((obj) => obj.id === "pincode_field")
                    .hidden
                    ? "none"
                    : null,
                  marginTop: "6px",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    display: formDesignerData2.hideFieldLabels
                      ? "none"
                      : "inline",
                  }}
                  className={
                    characters.find((obj) => obj.id === "pincode_field").data
                      .field4.checked
                      ? "required"
                      : undefined
                  }
                >
                  {
                    characters.find((obj) => obj.id === "pincode_field").data
                      .field1.value
                  }
                </label>
                <div className="inputWithIcon" style={{ marginTop: "5px" }}>
                  <input
                    type="text"
                    placeholder={
                      characters.find((obj) => obj.id === "pincode_field").data
                        .field2.value
                    }
                    className={formDesignerData2.textfieldFocusColor}
                    style={{
                      borderRadius: `${formDesignerData2.textfieldBorderRadius}px`,
                      border: `${formDesignerData2.textfieldBorderWidth} solid #aaa`,
                      paddingLeft: characters.find(
                        (obj) => obj.id === "pincode_field"
                      ).data.field3.checked
                        ? "35px"
                        : "12px",
                    }}
                    minLength={
                      characters.find((obj) => obj.id === "pincode_field").data
                        .field5.minValue
                    }
                    maxLength={
                      characters.find((obj) => obj.id === "pincode_field").data
                        .field5.maxValue
                    }
                  />
                  <i
                    style={{
                      display: characters.find(
                        (obj) => obj.id === "pincode_field"
                      ).data.field3.checked
                        ? undefined
                        : "none",
                    }}
                    className="fa fa-location-dot fa-lg fa-fw"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>

              <div
                id="email_field"
                className="city_div_field"
                style={{
                  display: characters.find((obj) => obj.id === "email_field")
                    .hidden
                    ? "none"
                    : null,
                  marginTop: "6px",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    display: formDesignerData2.hideFieldLabels
                      ? "none"
                      : "inline",
                  }}
                  className={
                    characters.find((obj) => obj.id === "email_field").data
                      .field4.checked
                      ? "required"
                      : undefined
                  }
                >
                  {
                    characters.find((obj) => obj.id === "email_field").data
                      .field1.value
                  }
                </label>
                <div className="inputWithIcon" style={{ marginTop: "5px" }}>
                  <input
                    type="text"
                    placeholder={
                      characters.find((obj) => obj.id === "email_field").data
                        .field2.value
                    }
                    className={formDesignerData2.textfieldFocusColor}
                    style={{
                      borderRadius: `${formDesignerData2.textfieldBorderRadius}px`,
                      border: `${formDesignerData2.textfieldBorderWidth} solid #aaa`,
                      paddingLeft: characters.find(
                        (obj) => obj.id === "email_field"
                      ).data.field3.checked
                        ? "35px"
                        : "12px",
                    }}
                    minLength={
                      characters.find((obj) => obj.id === "email_field").data
                        .field5.minValue
                    }
                    maxLength={
                      characters.find((obj) => obj.id === "email_field").data
                        .field5.maxValue
                    }
                  />
                  <i
                    style={{
                      display: characters.find(
                        (obj) => obj.id === "email_field"
                      ).data.field3.checked
                        ? undefined
                        : "none",
                    }}
                    className="fa fa-envelope fa-lg fa-fw"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>

              <div
                id="order_note_field"
                className="city_div_field"
                style={{
                  display: characters.find(
                    (obj) => obj.id === "order_note_field"
                  ).hidden
                    ? "none"
                    : null,
                  marginTop: "6px",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    display: formDesignerData2.hideFieldLabels
                      ? "none"
                      : "inline",
                  }}
                  className={
                    characters.find((obj) => obj.id === "order_note_field").data
                      .field4.checked
                      ? "required"
                      : undefined
                  }
                >
                  {
                    characters.find((obj) => obj.id === "order_note_field").data
                      .field1.value
                  }
                </label>
                <div className="inputWithIcon" style={{ marginTop: "5px" }}>
                  <input
                    type="text"
                    placeholder={
                      characters.find((obj) => obj.id === "order_note_field")
                        .data.field2.value
                    }
                    className={formDesignerData2.textfieldFocusColor}
                    style={{
                      borderRadius: `${formDesignerData2.textfieldBorderRadius}px`,
                      border: `${formDesignerData2.textfieldBorderWidth} solid #aaa`,
                      paddingLeft: characters.find(
                        (obj) => obj.id === "order_note_field"
                      ).data.field3.checked
                        ? "35px"
                        : "12px",
                    }}
                    minLength={
                      characters.find((obj) => obj.id === "order_note_field")
                        .data.field5.minValue
                    }
                    maxLength={
                      characters.find((obj) => obj.id === "order_note_field")
                        .data.field5.maxValue
                    }
                  />
                  <i
                    style={{
                      display: characters.find(
                        (obj) => obj.id === "order_note_field"
                      ).data.field3.checked
                        ? undefined
                        : "none",
                    }}
                    className="fa fa-note-sticky fa-lg fa-fw"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>

              <button
                id="summit_button_field"
                className="btn order_summit_button"
                style={{
                  display: characters.find(
                    (obj) => obj.id === "summit_button_field"
                  ).hidden
                    ? "none"
                    : "flex",
                  justifyContent: "center",
                  margin: "6px 0px",
                }}
              >
                {
                  characters.find((obj) => obj.id === "summit_button_field")
                    .data.field1.value
                }
              </button>
            </section>
          </div>
        </div>
      </Layout>
    </Page>
  );
}
