import * as Level from "level"

class StorageService {
	set(storage: Level, key: string, data: any) {
		return new Promise(resolve => {
			storage.put(key, JSON.stringify(data), (error: any) => {
				if (error) {
					resolve(0)
				} else {
					resolve(1)
				}
			})
		})
	}

	get(storage: Level, key: string) {
		return new Promise(resolve => {
			storage.get(key, (error: any, value: any) => {
				if (error) {
					resolve(0)
				} else {
					resolve(value)
				}
			})
		})
	}

	delete(storage: Level, key: string) {
		return new Promise(resolve => {
			storage.del(key, (error: any) => {
				if (error) {
					resolve(0)
				} else {
					resolve(1)
				}
			})
		})
	}
}

export default new StorageService()
