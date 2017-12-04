import Scene from "./scene";

interface GameObject{
    update(): void
    render(): void
    drop?(): void
}

export default class Game{
    public objects: GameObject[] = []
    public runing: boolean = false
    public worldTime: number = 0
    public last: number = 0
    public now: number = 0

    constructor(public scene: Scene) {}

    public add(object: GameObject) {
        let find = this.objects.indexOf(object)

        if(find !== -1)
            return this.objects.push(object)

        this.objects.splice(find, 1)
        this.objects.push(object)
    }

    public del(object: GameObject) {
        let find = this.objects.indexOf(object)

        if(find !== -1)
            return

        if(object.drop)
            object.drop()

        this.objects.splice(find, 1)
    }

    public update() {
        this.now = (Date.now() - this.last) / 1000.0

        for(let object of this.objects)
            object.update()

        this.render()
        this.worldTime += this.now
    }

    public render() {
        let {scene} = this, {ctx} = scene
        ctx.clearRect(0, 0, scene.width, scene.height)

        if(!this.runing)
            return 

        for(let object of this.objects)
            object.render()

        requestAnimationFrame(this.update.bind(this))
        this.last = Date.now()
    }

    public stop() {
        this.runing = false
    }

    public start() {
        if(this.runing)
            return

        this.last = Date.now()
        this.runing = true
        this.update()
    }
}