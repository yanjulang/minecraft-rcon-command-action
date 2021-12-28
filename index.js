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
		
		console.log('connected to ${host}:${port}');
		console.log('executing command "${command}"');
		
		console.log(await rcon.send(command));
		
		console.log('Done, exiting...');
		rcon.end();
	} catch (error) {
		console.log('Error occurred!');
		core.setFailed(error.message);
	}
}
run();