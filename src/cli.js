import arg from "arg";
import prompts from "prompts";
import { createProject } from "./main";

function parseArgumentIntoOptions(rawArgs) {
  const args = arg(
    {
      // Types
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,

      // Aliases
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args._[0],
    runInstall: args["--install"] || false,
  };
}

async function promptForMissingOptions(options) {
  const defaultTemplate = "JavaScript";

  // If user wants default
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  // If user doesn't want default and doesn't input a template
  const questions = [];

  if (!options.template) {
    questions.push({
      type: "select",
      name: "template",
      message: "Please choose which project template to use",
      choices: [
        { title: "JavaScript", value: "JavaScript" },
        { title: "TypeScript", value: "TypeScript" },
      ],
      initial: 0,
    });
  }

  // If user doesn't want default and doesn't input git option
  if (!options.template) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repository?",
      initial: false,
    });
  }

  const answers = await prompts(questions);

  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
  };
}

export async function cli(args) {
  let options = parseArgumentIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}

// STARTED 12:30
