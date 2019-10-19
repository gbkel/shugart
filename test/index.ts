import Shugart from "../src/Shugart"

async function boot() {
	await Shugart.client("http://localhost:8888")

	let i = 0

	setInterval(async () => {
		const data = JSON.stringify({ eae: `MOTA-${i}` })
		await Shugart.set(`mota`, data)
		console.log(await Shugart.get(`mota`))
		i++
	}, 500)
}
boot()
