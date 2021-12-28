const core = require('@actions/core');
const github = require('@actions/github');

const {Rcon} = require('rcon-client');

async function run() {
	try {
		const host = core.getInput('host');
		const port = core.getInput('port');
		const password = core.getInput('password');
		const command = core.getInput('command');
		
		const rcon = await Rcon.connect({host: host, port: port, password: password});
		
		console.log("executing command...")
		console.log(await rcon.send(command));
		rcon.end();
	} catch (error) {
		core.setFailed(error.message);
	}
}

console.log("running...");
run();