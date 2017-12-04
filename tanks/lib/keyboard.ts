export default class Keyboard{
    public keys: string[] = []

    constructor() {
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            let index = this.keys.indexOf(e.key)

            if(index === -1)
                this.keys.push(e.key)
        })

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            let index = this.keys.indexOf(e.key)

            if(index !== -1)
                this.keys.splice(index, 1)
        })

        window.addEventListener('blur', () => {
            while(this.keys.length)
                this.keys.pop()
        })
    }

    public isKey(key: string) {
        return this.keys.indexOf(key) !== -1
    }
}