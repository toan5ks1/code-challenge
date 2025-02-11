import { Marquee } from "@/components/magic-ui/marquee"
import { Currency, currencyData } from "@/features/currency-swap/data/currency"
import { cn } from "@/lib/utils"

const ReviewCard = ({ currency, price, date }: Currency) => {
	return (
		<figure
			className={cn(
				"relative h-full cursor-pointer overflow-hidden rounded-xl border px-3 py-2",
				// light styles
				"border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
				// dark styles
				"dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
			)}
		>
			<div className="flex flex-row items-center gap-2">
				<img
					className="rounded-full"
					width="32"
					height="32"
					alt=""
					src={`/tokens/${currency}.svg`}
				/>
				<div>
					<div className="flex items-start justify-between text-sm font-medium">
						<figcaption className="dark:text-white">{currency}</figcaption>
						<p className="dark:text-white/40">${price.toFixed(2)}</p>
					</div>
					{date && <p className="text-xs">{new Date(date).toLocaleString()}</p>}
				</div>
			</div>
		</figure>
	)
}

export function MarqueeDemo() {
	return (
		<Marquee pauseOnHover className="[--duration:90s]">
			{currencyData.map((item, index) => (
				<ReviewCard key={index} {...item} />
			))}
		</Marquee>
	)
}
