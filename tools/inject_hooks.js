var fs = require('fs'),
	exec = require('child_process').execSync,
	hook,
	commands,
	HOOKS = '.git/hooks';

hook = '#!/usr/bin/node\n' +
'var child = require(\'child_process\').exec(\'gulp pre-commit\');\n' +
'child.stdout.on(\'data\', function (buffer) {\n' +
'\tprocess.stdout.write(buffer.toString());\n' +
'});';


fs.writeFileSync(HOOKS + '/pre-commit', hook);
exec('chmod +x ' + HOOKS + '/pre-commit');