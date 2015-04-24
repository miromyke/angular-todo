var fs = require('fs'),
	exec = require('child_process').execSync,
	hook,
	commands,
	HOOKS = '.git/hooks';

hook = '#!/usr/bin/node\n' +
'var exec = require(\'child_process\').execSync;\n';

commands = fs.readFileSync('.pre-commit', 'utf-8');

commands.split('\n').forEach(function (cmd) {
	hook += 'exec(\'' + cmd + '\');';
});

fs.writeFileSync('.git/hooks/pre-commit', hook);
exec('chmod +x .git/hooks/pre-commit');