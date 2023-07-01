const whitelist = ['http://localhost:5173']

export const corsOptions = (
	origin: string | undefined,
	callback: (err: Error | null, allow?: boolean) => void
) => {
	if (whitelist.indexOf(origin as string) !== -1 || !origin) {
		callback(null, true)
	} else {
		callback(new Error('Not allowed by CORS'))
	}
}
