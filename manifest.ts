import { Manifest } from "deno-slack-sdk/mod.ts";
import WordleWorkflow from "./workflows/wordle_workflow.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "wordle-word",
  description: "Set the channel topic with the wordle starting word",
  icon: "assets/icon.png",
  workflows: [WordleWorkflow],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "channels:manage",
    "groups:write",
  ],
});
