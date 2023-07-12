import { ArrowLeft, Plus } from '@phosphor-icons/react'
import { Link, LinkProps, useNavigate } from 'react-router-dom'

type PageHeaderProps = {
	title: string
	hasAdd?: boolean
	breadcrumb?: string
	to?: LinkProps['to']
	hasBackBtn?: boolean
	backText?: string
}

export const PageHeader = ({
	breadcrumb,
	hasAdd,
	title,
	to,
	hasBackBtn = false,
	backText,
}: PageHeaderProps) => {
	const navigate = useNavigate()

	return (
		<div className='bg-neutral-900 py-14'>
			<div className='mx-auto flex max-w-7xl items-center justify-between gap-2'>
				<div>
					{hasBackBtn ? (
						<button
							type='button'
							onClick={() => navigate(-1)}
							className='flex items-center gap-2 text-sm font-medium text-neutral-400'
						>
							<ArrowLeft size={16} weight='fill' />
							<span>{backText}</span>
						</button>
					) : null}

					<div>
						<p className='text-xs font-medium text-neutral-400'>
							{breadcrumb}
						</p>
						<h2 className='pt-1 text-5xl font-black capitalize text-neutral-100'>
							{title}
						</h2>
					</div>
				</div>

				{hasAdd && to ? (
					<Link
						to={to}
						className='flex items-center gap-2 rounded-md bg-neutral-800 px-6 py-2 text-sm text-neutral-200'
					>
						<Plus size={14} />
						<span>Add</span>
					</Link>
				) : null}
			</div>
		</div>
	)
}
