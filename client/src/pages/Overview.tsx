import { Metrics } from 'components/Metrics'

export const Overview = () => {
	return (
		<>
			<div className='bg-neutral-900 pb-24 pt-16'>
				<div className='mx-auto max-w-7xl'>
					<p className='text-xs font-medium text-neutral-400'>
						Home / Overview
					</p>
					<h2 className='pt-1 font-barlow text-4xl text-neutral-300'>
						Welcome back,{' '}
						<span className='font-semibold text-neutral-100'>
							Williams
						</span>
					</h2>
					<p className='max-w-[60ch] pt-2 text-sm text-neutral-400'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
						dolor doloremque. Quia.
					</p>
				</div>
			</div>
			<section className='mx-auto max-w-7xl'>
				<Metrics />
			</section>
		</>
	)
}
