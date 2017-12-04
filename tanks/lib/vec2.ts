export default class Vec2{
    public x: number
    public y: number

    constructor(vec: Vec2)
    constructor(xy: number)
    constructor(xy: [number])
    constructor(xy: [number, number])
    constructor(x: number, y: number)
    constructor(args: any[])
    constructor(...args: any[]){
        let v = this.toVector(args)

        this.x = v.x
        this.y = v.y
    }

    public add(vec: Vec2): Vec2
    public add(xy: number): Vec2
    public add(xy: [number]): Vec2
    public add(xy: [number, number]): Vec2
    public add(x: number, y: number): Vec2
    public add(args: any[]): Vec2
    public add(...args: any[]): Vec2 {
        let v = this.toVector(args)

        this.x += v.x
        this.y += v.y

        return this
    }

    public multiply(vec: Vec2): Vec2
    public multiply(xy: number): Vec2
    public multiply(xy: [number]): Vec2
    public multiply(xy: [number, number]): Vec2
    public multiply(x: number, y: number): Vec2
    public multiply(args: any[]): Vec2
    public multiply(...args: any[]): Vec2 {
        let v = this.toVector(args)
        
        this.x *= v.x
        this.y *= v.y

        return this
    }

    public range(maxX: number, maxY: number, minX: number = 0, minY: number = 0) {
        let {x, y} = this
        if(x > maxX) {
            this.x = maxX
            return 'maxX'
        }
        if(x < minX) {
            this.x = minX
            return 'minX'
        }
        if(y > maxY) {
            this.y = maxY
            return 'maxY'
        }
        if(y < minY) {
            this.y = minY
            return 'minY'
        }

        return null
    }

    public clone(): Vec2 {
        return new Vec2(this)
    }

    private toVector(...args: any[]): {x: number, y: number} {
        let [a, b = a] = args

        if(a instanceof Vec2)
            return {x: a.x, y: a.y}

        if(Array.isArray(a))
            return this.toVector(...a)

        return {x: a, y: b}
    }

    public static create(vec: Vec2): Vec2
    public static create(xy: number): Vec2
    public static create(xy: [number]): Vec2
    public static create(xy: [number, number]): Vec2
    public static create(x: number, y: number): Vec2
    public static create(args: any[]): Vec2
    public static create(...args: any[]): Vec2 {
        return new Vec2(args)
    }
}