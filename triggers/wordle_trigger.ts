import { Trigger } from "deno-slack-api/types.ts";
import WordleWorkflow from "../workflows/wordle_workflow.ts";

/**
 * Triggers determine when Workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/future/triggers
 */
const wordleTrigger: Trigger<typeof WordleWorkflow.definition> = {
  type: "shortcut",
  name: "Set the wordle word",
  description: "Set the wordle word",
  workflow: "#/workflows/wordle_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
    channel: {
      value: "{{data.channel_id}}",
    },
  },
};

export default wordleTrigger;
