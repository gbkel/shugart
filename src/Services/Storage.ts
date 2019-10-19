import * as Level from "level"

class StorageService {
	set(storage: Level, key: string, data: any) {
		return new Promise((resolve, reject) => {
			storage.put(key, JSON.stringify(data), (error: any) => {
				if (error) {
					console.error(error)
					reject(false)
				} else {
					resolve(true)
				}
			})
		})
	}

	get(storage: Level, key: string) {
		return new Promise((resolve, reject) => {
			storage.get(key, (error: any, value: any) => {
				if (error) {
					console.error(error)
					reject(null)
				} else if (!value) {
					resolve(null)
				} else {
					resolve(value)
				}
			})
		})
	}
}

export default new StorageService()
