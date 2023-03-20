import {
  AppType,
  Provider as GadgetProvider,
  useGadget,
} from "@gadgetinc/react-shopify-app-bridge";
import { api } from "./api";

import { PolarisProvider } from "./components";

import { useAction, useFindFirst } from "@gadgetinc/react";

import { useCallback } from "react";

import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import {Spinner} from '@shopify/polaris';




/**
  Gadget's Provider takes care of App Bridge authentication, you do not need Shopify's default AppBridgeProvider.
*/
export default function App() {
  return (
    <GadgetProvider
      type={AppType.Embedded}
      shopifyApiKey={process.env["SHOPIFY_API_KEY"]}
      api={api}
    >
      <PolarisProvider>
        <EmbeddedApp />
      </PolarisProvider>
    </GadgetProvider>
  );
}

// This is where we make sure we have auth'd with AppBridge
// Once we have authenticated, we can render our app!
// Feel free to use the default page navigation that Shopify's CLI sets up for you
// example here - https://github.com/gadget-inc/examples/blob/main/packages/shopify-cli-embedded/web/frontend/App.jsx
function EmbeddedApp() {
  // we use `isAuthenticated` to render pages once the OAuth flow is complete!

  const [shopResult] = useFindFirst(api.shopifyShop);
  const shopId = shopResult.data?.id;

  const { isAuthenticated } = useGadget();



  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return isAuthenticated ? (

    <BrowserRouter>
            <NavigationMenu
              navigationLinks={[
                {
                  label: "Buy Button Editor",
                  destination: "/buybutton",
                },
                {
                  label: "Form Designer Editor",
                  destination: "/formdesigner",
                },
                {
                  label: "Settings & Visibility",
                  destination: "/settingsandvisibility",
                },
              ]}
            />
            <Routes pages={pages} />
      </BrowserRouter>
  ) : (
    <div style={{height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center"}} >
      <Spinner size="large" />
    </div>
  );
}