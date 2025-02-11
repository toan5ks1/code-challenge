import CurrencySwapForm from "@/features/currency-swap/components/currency-swap-form"
import { OrbitingCirclesCrypto } from "./components/orbiting-circles-crypto"

export default function Home() {
	return (
		<section className="container relative grid items-center gap-6 py-8 md:py-36">
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
			{/* Orbiting Circles Background */}
			<div className="absolute inset-0 flex h-[calc(100dvh-4.1rem)] items-center">
				<OrbitingCirclesCrypto />
			</div>
		</section>
	)
}
