import Vec2 from "./vec2";

export const TextureList: Texture[] = []

export class TextureSectorize{
    public x: number
    public y: number
    public mX: number
    public mY: number

    constructor(public texture: Texture, x: number, y: number, mX: number, mY: number) {
        this.x = x
        this.y = y
        this.mX = mX
        this.mY = mY
    }
    
    public draw(ctx: CanvasRenderingContext2D, sX: number, sY: number, pX: number, pY: number) {
        let {x, y, mX, mY, texture} = this
        
        let s = Vec2.create(sX, sY).multiply(x, y)
        let m = Vec2.create(pX, pY).multiply(mX, mY)

        texture.draw(ctx, s.x, s.y, x, y, m.x, m.y, mX, mY)
    }
}

export class Texture{
    public name: string
    public width: number
    public height: number

    constructor(public image: HTMLImageElement, name: string = image.src) {
        this.name = name
        this.width = image.width
        this.height = image.height
    }

    public sector(x: number, y: number = x, mX: number = x, mY: number = y){
        return new TextureSectorize(this, x, y, mX, mY)
    }

    public draw(ctx: CanvasRenderingContext2D, sX: number, sY: number, sW: number, sH: number, dX: number, dY: number, dW: number, dH) {
        ctx.drawImage(this.image, sX, sY, sW, sH, dX, dY, dW, dH)
    }
}

export default class TexturesStore {
    public static textureList: Texture[] = []

    public static load(url: string, name: string = url): Promise<void> {
        return new Promise((resolve, reject) => {
            let img = new Image()

            img.src = url

            img.onload = () => {
                this.textureList.push(new Texture(img, name))
                console.log(`Loaded texture "${url}"`)
                resolve()
            }
            img.onerror = (e) => reject(e)
        })
    }

    public static get(name: string): Texture {
        for(let texture of this.textureList)
            if(texture.name === name)
                return texture
        
        throw new Error(`No loaded texture ${name}`)
    }
}