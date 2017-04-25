var requireDir = require('require-dir');

// Require all tasks in gulp dir, including subfolders
requireDir('./assets/js/gulp', {
	recurse: true
});