import Game from './game'
import Tank from './tank'
import Vec2 from './vec2'
import Textures from './textures'
import Keyboard from './keyboard'

export default class Player extends Tank{
    public position: Vec2
    public keyboard: Keyboard = new Keyboard()
    public intervalAnim: number

    constructor(public game: Game, color: number, dirrection: number, type: number, x: number, y: number) {
        super(color, dirrection, type)

        this.position = new Vec2(x, y)

    }

    public set dir(v: number) {
        let {position: p} = this

        if(this.dirrection !== v)
        {
            p.x = Math.ceil((p.x*5))/5
            p.y = Math.ceil((p.y*5))/5
        }
        this.dirrection = v
    }

    public animate(v: boolean) {
        if(v && !this.intervalAnim){
            this.intervalAnim = setInterval(() => {
                this.anim = this.anim ? 0 : 1
            }, 100)
        }else if(!v && this.intervalAnim) {
            clearInterval(this.intervalAnim)
            delete this.intervalAnim
        }
    }

    public update() {
        let {keyboard: k, position: p, game: g} = this
        let speed = 2.5 * g.now

        if(k.isKey('ArrowUp')){
            this.dir = 0
            p.add(0, -speed)
            this.animate(true)
        }else if(k.isKey('ArrowLeft')){
            this.dir = 1
            p.add(-speed, 0)
            this.animate(true)
        }else if(k.isKey('ArrowRight')){
            this.dir = 3
            p.add(speed, 0)
            this.animate(true)
        }else if(k.isKey('ArrowDown')){
            this.dir = 2
            p.add(0, speed)
            this.animate(true)
        }else{
            this.animate(false)
        }

        if(this.position.range(12, 12))
            this.animate(false)
        
    }

    public render() {
        let {position: p, game} = this
        let {ctx} = game.scene
        this.texture(ctx, p.x, p.y)
    }
}