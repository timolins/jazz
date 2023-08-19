import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WithJazz } from "jazz-react";
import { LocalAuth } from "jazz-react-auth-local";
import { PrettyAuthComponent } from "./components/prettyAuth.tsx";
import { ThemeProvider } from "./components/themeProvider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <WithJazz
                auth={LocalAuth({
                    appName: "Todo List Example",
                    Component: PrettyAuthComponent,
                })}
                syncAddress={
                    new URLSearchParams(window.location.search).get("sync") ||
                    undefined
                }
            >
                <App />
                <Toaster />
            </WithJazz>
        </ThemeProvider>
    </React.StrictMode>
);
