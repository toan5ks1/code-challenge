import CurrencySwapForm from "@/features/currency-swap/components/currency-swap-form"
import { DotPattern } from "../../components/magic-ui/dot-pattern"
import { cn } from "@/lib/utils"
import { MarqueeDemo } from "./components/marquee-crypto"

export default function Home() {
	return (
		<>
			<MarqueeDemo />
			<section className="container relative grid items-center gap-6 py-8 md:py-28">
				<div className="z-10">
					<div className="items-start gap-4 text-center">
						<h1 className="text-3xl font-extrabold md:text-4xl">
							Crypto Exchange
						</h1>
						<p className="text-lg text-muted-foreground">
							Free from sign-up, limits, complications
						</p>
					</div>

					<CurrencySwapForm />
				</div>

				<DotPattern
					className={cn(
						"[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
					)}
				/>
			</section>
		</>
	)
}
