interface SceneOptions {
    fillStyle?: string
    globalCompositeOperation?: string
}

export default class Scene{
    public ctx: CanvasRenderingContext2D

    constructor(query: string, public width: number,public height: number, options: SceneOptions = {}) {
        let c = <HTMLCanvasElement>document.querySelector(query)

        if(!(c instanceof HTMLCanvasElement))
            throw new Error(`No find canvas in "${query}"`)

        c.width = width
        c.height = height

        this.ctx = c.getContext('2d')
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        this.ctx.globalCompositeOperation = "lighter"
        this.ctx.globalAlpha = 1
        this.ctx.imageSmoothingEnabled = false
        
        for(let key in options)
            this.ctx[key] = options[key]
    }
}