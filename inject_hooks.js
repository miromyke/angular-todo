var hook;

hook = '#!/usr/bin/node\n' +
'var exec = require(\'child_process\').execSync,\n' +
	'output;\n' +
'output = exec(\'protractor e2e/conf.js\');\n' +
'console.log(output);'

var fs = require('fs');

fs.renameSync('.git/hooks/pre-commit.sample', '.git/hooks/pre-commit')
fs.writeFileSync('.git/hooks/pre-commit', hook);