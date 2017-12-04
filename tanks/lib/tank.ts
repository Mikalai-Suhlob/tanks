import Textures, { TextureSectorize } from './textures'

const colors = ['ytank', 'gtank', 'btank', 'rtank']

interface TankRender{
    (ctx: CanvasRenderingContext2D, x: number, y: number): void
}

export default class Tank{
    public anim: number = 0

    constructor(public color: number = 0, public dirrection: number = 0, public type = 0) {}

    public get texture(): TankRender {
        let {color, dirrection, type, anim} = this
        let t = Textures.get(colors[this.color]).sector(16, 16, 40, 40)
        
        return (ctx: CanvasRenderingContext2D, x: number, y: number) => {
            t.draw(ctx, dirrection * 2 + anim, type, x, y)
        }
    }
}