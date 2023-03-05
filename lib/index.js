const EC = require('eight-colors');
const CG = require('console-grid');

module.exports = (program) => {

    const cliName = program._name;

    const cliOptions = program.options.map(function(o) {
        return {
            name: ` ${o.flags}`,
            description: o.description
        };
    });
    cliOptions.push({
        name: ` ${program._helpFlags}`,
        description: program._helpDescription
    });

    const rows = [{
        name: cliName,
        description: program._description,
        subs: cliOptions
    }];

    program._args.forEach((item) => {

        // console.log(item);

        const variadic = item.variadic ? '...' : '';

        const argName = item._name;
        const arg = item.required ? `<${argName}${variadic}>` : `[${argName}${variadic}]`;

        let desc = item.description;
        if (item.defaultValue) {
            desc += ` (default: ${item.defaultValue})`;
        }

        rows.push({
            name: `${cliName} ${arg}`,
            description: desc
        });
    });

    let hasAlias = false;

    program.commands.filter(function(cmd) {
        return !cmd._noHelp && cmd._name !== '*';
    }).map(function(cmd) {
        const args = cmd._args.map(function(arg) {
            const nameOutput = arg._name + (arg.variadic ? '...' : '');
            return arg.required ? `<${nameOutput}>` : `[${nameOutput}]`;
        }).join(' ');
        const argsStr = args ? ` ${args}` : '';
        const name = `${cliName} ${EC.cyan(cmd._name)}${argsStr}`;

        const alias = `${cmd._aliases}`;
        if (alias) {
            hasAlias = true;
        }
        const command = {
            name: name,
            alias: EC.cyan(alias),
            description: cmd._description
        };
        if (cmd.options.length) {
            command.subs = cmd.options.map(function(o) {
                let desc = o.description;
                if (o.defaultValue) {
                    desc += ` (default: ${o.defaultValue})`;
                }
                return {
                    name: ` ${o.flags}`,
                    description: desc
                };
            });
        }
        return command;
    }).forEach((cmd) => {
        rows.push({
            innerBorder: true
        });
        rows.push(cmd);
    });

    const columns = [{
        id: 'name',
        name: 'Commands/Options'
    }, {
        id: 'description',
        name: 'Description',
        maxWidth: 200
    }];


    if (hasAlias) {
        columns.push({
            id: 'alias',
            name: 'Alias'
        });
    }

    CG({
        options: {
            nullPlaceholder: ''
        },
        columns,
        rows
    });
};
