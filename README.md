# Commander Help
> Styled Help for [Commander.js](https://github.com/tj/commander.js)

## Install
```sh
npm i commander-help
```

## Usage
```js
const { program } = require('commander');
const commanderHelp = require('commander-help');

program
    .name('cli-name')
    .description('CLI to some JavaScript string utilities')
    .argument('<username>', 'user to login')
    .argument('[password...]', 'password for user, if required', 'empty')
    .option('-t, --title <honorific>', 'title to use before name')
    .option('-d, --debug', 'display some debugging')
    .version('0.8.0', '-v, --version');

program.command('split')
    .description('Split a string into substrings')
    .argument('<string>', 'string to split')
    .alias('s')
    .option('--first', 'display just the first substring', '#')
    .option('-s, --separator <char>', 'separator character', ',')
    .action(() => {});

program
    .command('clone <source> [dest]')
    .description('clone a repository into a newly created directory')
    .alias('c')
    .action((source, destination) => {
        console.log('clone command called');
    });

program
    .command('start <service>', 'start named service')
    .command('stop [service...]', 'stop named service, or all if no name supplied');

// hide default help
program.helpInformation = function() {
    return '';
};
// custom help
program.on('--help', function() {
    console.log('Usage and help');
    commanderHelp(program);
});

program.parse();

Usage and help
┌──────────────────────────────────┬───────────────────────────────────────────────────┬───────┐
│ Commands/Options                 │ Description                                       │ Alias │
├──────────────────────────────────┼───────────────────────────────────────────────────┼───────┤
│ ├ cli-name                       │ CLI to some JavaScript string utilities           │       │
│ │ ├  -t, --title <honorific>     │ title to use before name                          │       │
│ │ ├  -d, --debug                 │ display some debugging                            │       │
│ │ ├  -v, --version               │ output the version number                         │       │
│ │ └  -h, --help                  │ display help for command                          │       │
│ ├ cli-name <username>            │ user to login                                     │       │
│ ├ cli-name [password...]         │ password for user, if required (default: empty)   │       │
├──────────────────────────────────┼───────────────────────────────────────────────────┼───────┤
│ ├ cli-name split <string>        │ Split a string into substrings                    │ s     │
│ │ ├  --first                     │ display just the first substring (default: #)     │       │
│ │ └  -s, --separator <char>      │ separator character (default: ,)                  │       │
├──────────────────────────────────┼───────────────────────────────────────────────────┼───────┤
│ ├ cli-name clone <source> [dest] │ clone a repository into a newly created directory │ c     │
├──────────────────────────────────┼───────────────────────────────────────────────────┼───────┤
│ ├ cli-name start <service>       │ start named service                               │       │
├──────────────────────────────────┼───────────────────────────────────────────────────┼───────┤
│ └ cli-name stop [service...]     │ stop named service, or all if no name supplied    │       │
└──────────────────────────────────┴───────────────────────────────────────────────────┴───────┘

```
see [test/test.js](/test/test.js)

## CHANGELOG
- 1.0.1
    - fixed variadic args

- 1.0.0