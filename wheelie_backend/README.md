# How to run the project

## Prerequisites

- [nvm](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)
- [Docker](https://docs.docker.com/desktop/setup/install/windows-install/)
  - `Docker compose` if you install Docker desktop it should be available

## Steps to run

The following script approach works on Mac/Linux/WSL only.
If you're using Windows, you might want to set up `git bash`, but the recommended way
is to use WSL, as we're utilising Docker anyway.

```bash
nvm install
nvm use
make up ## make up-verbose for debug logging
make migrate
npm run start:dev
```

To shutdown: `make down`

# Migration

If you need to change the data schema, a corresponding migration SQL script must be added

First, generate the file that follows the naming convention, for example:

```bash
make generate-migration-file db_name=wheelie db_schema=wheelie migration_name="update column"
```

Now open the generated file and make your SQL equivalent of your change in the code. After this is done, you can test your changes with

```bash
make migrate
```

# Project structure

```txt
wheelie_backend/
|_ src/
|  |_ main.ts ..................................... entry point
|  |_ app.module.ts ..............,,,,,,,,,,,,, main app module
|  |_ common/ ................. global constants, classes, etc.
|  |_ controllers/
|  |_ modules/ ................................ service modules
|  |_ entities/ ................................... DB entities
|_ test/ ............................................ E2E tests
|_ ...
|_ config files
```
