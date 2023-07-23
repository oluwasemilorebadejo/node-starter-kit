# Node Starter Kit - Documentation

Node Starter Kit is a command-line interface (CLI) tool that allows developers to quickly bootstrap Node.js projects. It provides a set of utilities to copy project files, initialize a Git repository, and install project dependencies.

## Installation

To install Node Starter Kit, you need to have Node.js and npm (Node Package Manager) installed on your system. Once you have Node.js installed, open your terminal and run the following command:

`npm install @oluwasemilore/node-starter-kit`

## Usage

After installing Node Starter Kit, you can run it from the command line using the following command:

`node-starter-kit template [options]`

### Templates

The templates include:

- `JavaScript`: Bootstrap a JavaScript project.
- `TypeScript`: Bootstrap a TypeScript project.

### Options

- `--git`, `-g`: Initialize a Git repository in the project directory.
- `--yes`, `-y`: Skip all prompts and use default options.
- `--install`, `-i`: Automatically install project dependencies after creating the project.

## Examples

### Create a new JavaScript project:

`node-starter-kit`

This will prompt you to choose a project template (JavaScript or TypeScript) and whether to initialize a Git repository.

### Create a JavaScript project with Git initialized and dependencies installed:

`node-starter-kit javascript --git --install`

This will create a new JavaScript project, initialize a Git repository, and automatically install project dependencies.

## Project Structure

The generated project will have the following structure:

```bash
project-name/
├── src/
├── package.json
```

## Contributing

We welcome contributions from the community! If you find any bugs or have suggestions for new features, please open an issue on the [GitHub repository](https://github.com/oluwasemilorebadejo/node-starter-kit/issues).

The TypeScript template hasn't been implemented yet. Feel free to contribrute.

To contribute to the codebase, follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your changes.
4. Make your changes and commit them with descriptive commit messages.
5. Push your changes to your forked repository.
6. Create a pull request from your branch to the main repository.

## License

Node Starter Kit is released under the MIT License. See [LICENSE](https://github.com/oluwasemilorebadejo/node-starter-kit/blob/main/LICENSE) for more details.

## Credits

Node Starter Kit is developed and maintained by Oluwasemilore Badejo.
