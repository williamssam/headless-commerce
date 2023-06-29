import { Question } from '@phosphor-icons/react'
import * as Tooltip from '@radix-ui/react-tooltip'

type InfoTooltipProps = {
	text: string
	className?: string
}

export const InfoTooltip = ({ text, className }: InfoTooltipProps) => {
	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<button
						type='button'
						className={`flex items-center gap-[2px] rounded-md bg-neutral-200 px-2 py-1 text-[0.65rem] font-medium uppercase tracking-wide ${className}`}
					>
						<span>What is this</span>
						<Question size={16} weight='fill' />
					</button>
				</Tooltip.Trigger>

				<Tooltip.Portal>
					<Tooltip.Content
						className='w-60 select-none rounded-md bg-neutral-800 p-4 text-sm text-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade'
						sideOffset={5}
					>
						{text}
						<Tooltip.Arrow className='fill-neutral-800' />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	)
}
