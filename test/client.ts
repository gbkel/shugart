import Shugart from "../src"

async function boot() {
	await Shugart.connect("http://localhost:8081")
	console.log(Shugart.host)
	let i = 0

	setInterval(async () => {
		const data = { eae: `MOTA-${i}` }
		await Shugart.set("mota", data)
		console.log(await Shugart.get("mota"))
		i++
	}, 500)
}
boot()
