import Vec2 from './lib/vec2'
import Scene from './lib/scene'
import Textures from './lib/textures'
import Game from './lib/game';
import Player from './lib/player'

async function load() {
    await Textures.load('assets/yellow_tanks.png', 'ytank')
    await Textures.load('assets/green_tanks.png', 'gtank')
    await Textures.load('assets/blue_tanks.png', 'btank')
    await Textures.load('assets/red_tanks.png', 'rtank')
}

async function main() {
    const scene = new Scene('canvas', 520, 520)
    const game = new Game(scene)
    const player = new Player(game, 0, 0, 0, 4, 12)

    game.add(player)
    game.start() 
}

window.addEventListener('load', async () => {
    try{
        await load()
        await main()
    }catch(e) {
        console.error(e)
    }
})