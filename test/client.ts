import Shugart from "../src"

async function boot() {
	await Shugart.client("http://localhost:8081")

	let i = 0

	setInterval(async () => {
		const data = JSON.stringify({ eae: `MOTA-${i}` })
		await Shugart.set(`mota`, data)
		console.log(await Shugart.get(`mota1`))
		i++
	}, 500)
}
boot()