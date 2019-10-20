import shugart from "src/index"

export interface ShugartInterface {
	start: () => any
	client(host: string): Promise<void>
	get(key: string): Promise<string>
	set(key: string, data: string): Promise<string>
	host: string
}

declare const Shugart: ShugartInterface

export default Shugart
