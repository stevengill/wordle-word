import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

/**
 * A Workflow is a set of steps that are executed in order.
 * Each step in a Workflow is a function.
 * https://api.slack.com/future/workflows
 */
const WordleWorkflow = DefineWorkflow({
  callback_id: "wordle_workflow",
  title: "Pick a wordle word",
  description: "Pick a wordle word",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["interactivity"],
  },
});

/**
 * For collecting input from users, we recommend the
 * built-in OpenForm function as a first step.
 * https://api.slack.com/future/functions#open-a-form
 */
const inputForm = WordleWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "New Wordle Word",
    interactivity: WordleWorkflow.inputs.interactivity,
    submit_label: "Submit",
    fields: {
      elements: [{
        name: "word",
        title: "New Werdle Starting Word",
        type: Schema.types.string,
      }],
      required: ["word"],
    },
  },
);

WordleWorkflow.addStep(Schema.slack.functions.UpdateChannelTopic, {
  channel_id: WordleWorkflow.inputs.channel,
  topic: `The word today is ${inputForm.outputs.fields.word}`,
});

export default WordleWorkflow;
