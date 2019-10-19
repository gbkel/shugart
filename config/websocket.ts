const websocketConfig = {
	port: +process.env.PORT || 8080,
	clientTracking: true,
	perMessageDeflate: {
		zlibDeflateOptions: {
			chunkSize: 1024,
			memLevel: 7,
			level: 3
		},
		zlibInflateOptions: {
			chunkSize: 10 * 1024
		}
	}
}

export default websocketConfig
