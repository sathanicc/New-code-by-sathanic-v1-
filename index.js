const client = require('./lib/client');

const connect = async (retries = 5, delay = 5000) => {
	try {
		console.log('[INFO] Connecting to WhatsApp...');
		await client.connect();
		console.log('[SUCCESS] Bot connected successfully!');
	} catch (error) {
		console.error(`[ERROR] Connection failed: ${error.message}`);
		
		if (retries > 0) {
			console.log(`[RETRY] Retrying in ${delay / 1000} seconds... (${retries} attempts left)`);
			setTimeout(() => connect(retries - 1, delay), delay);
		} else {
			console.error('[FATAL] Maximum retry limit reached. Exiting...');
			process.exit(1);
		}
	}
};

connect();
