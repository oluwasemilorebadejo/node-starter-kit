import ncp from "ncp";
import fs from "fs";
import colors from "colors";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";
import shelljs from "shelljs";
import Listr from "listr";
import { projectInstall } from "pkg-install";

import { of } from "rxjs";

const access = promisify(fs.access);
const copy = promisify(ncp);

async function initGit(options) {
  const gitInitResult = shelljs.exec("git init", {
    cwd: options.targetDirectory,
  });

  if (gitInitResult.code !== 0) {
    return Promise.reject(new Error("Failed to initialize git"));
  }

  return;
}

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const currentFileUrl = fileURLToPath(import.meta.url);
  const templateDir = path.resolve(
    path.dirname(currentFileUrl),
    "../templates",
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name".red.bold, "ERROR");
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(options),
    },
    {
      title: "Initialize git",
      task: () => initGit(options),
      enabled: () => options.git, // Use a function to determine if the task should be enabled or skipped
    },
    {
      title: "Install dependencies",
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
        }),
      skip: () =>
        !options.runInstall
          ? "Pass --install to automatically install development dependencies"
          : undefined,
    },
  ]);

  await tasks.run();

  console.log("%s Project ready".green.bold, "DONE");
  return true;
}
