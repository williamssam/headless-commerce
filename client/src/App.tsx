import * as React from 'react'

function App() {
	const [count, setCount] = React.useState(0)

	return (
		<div className='flex min-h-screen flex-col items-center justify-center'>
			<h1 className='text-2xl'>
				<strong>Agba Cooker's 😉😎</strong> Vite + TS React Template
			</h1>
			<div className='flex flex-col pt-4'>
				<button
					onClick={() => setCount(count => count + 1)}
					className='mx-auto rounded bg-black px-6 py-1 capitalize text-white'
				>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>

			<p className='mt-10'>
				Find me on:{' '}
				<a
					href='https://github.com/williamssam'
					className='text-blue-600 underline'
				>
					Github
				</a>{' '}
				and
				<a
					href='https://williamssam.netlify.app/'
					className='text-blue-600 underline'
				>
					Portfolio
				</a>
			</p>
		</div>
	)
}

export default App
