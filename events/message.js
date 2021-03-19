const fs = require('fs');

module.exports = {
	name: 'message',
	execute(message) {
		//Logging System
		const timestamp = new Date();
		fs.appendFile(`./debug.log`, `timestamp: ${timestamp};\tAuthor: ${message.author.tag};\tServer: ${message.guild};\tChannel: #${message.channel.name};\tContent: ${message.content};\n`, function (err) {
			if (err) throw err;
		});
	},
};