const { program } = require('commander');
const commanderHelp = require('../lib');

program
    .name('cli-name')
    .description('CLI to some JavaScript string utilities')
    .argument('<username>', 'user to login')
    .argument('[password]', 'password for user, if required', 'empty')
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
    .command('stop [service]', 'stop named service, or all if no name supplied');

// hide default help
program.helpInformation = function() {
    return '';
};
// custom help
program.on('--help', function() {
    // console.log(program);
    console.log('Usage and help');
    commanderHelp(program);
});

program.parse();

// last one if no args
if (program.rawArgs.length < 3) {
    program.help();
}
