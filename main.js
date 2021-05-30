const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

let game = {
    score: 0,
    fruits:[],
    player: {
        x:10,
        y:10,

        commands :{
            ArrowDown(){
                if(game.player.y < canvas.height-1){
                    game.player.y +=1
                }

            },
            ArrowUp(){
                if(game.player.y > 0){
                    game.player.y -=1
                }

            },
            ArrowLeft(){
                if(game.player.x>0){
                    game.player.x -=1
                }

            },
            ArrowRight(){
                if(game.player.x < canvas.width-1){
                    game.player.x +=1
                }

            }
        },
        move(e){
            const key = e.key
            const command = this.commands[key]
            if(command){
                command()
                game.colision()
            }

        }

    },

    render(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for(let i of game.fruits){
            if(i){
                ctx.fillStyle = 'red'
                ctx.fillRect(i.x, i.y, 1, 1)
            }

        }

        ctx.fillStyle = 'black'
        ctx.fillRect(game.player.x, game.player.y, 1, 1)

    },

    addFruit(){
        let x = Math.floor(Math.random()*canvas.width)
        let y = Math.floor(Math.random()*canvas.height)

        let fruit = {x, y}
        game.fruits.push(fruit)
    },

    colision(){
        for(let i in this.fruits){
            if(game.fruits[i].x==this.player.x && game.fruits[i].y==this.player.y){
                delete game.fruits[i]
                game.score+=1
                showCurrentScore()
            }
        }
    }

}

function showCurrentScore(){
    let scorePanel = document.querySelector('.score')
    scorePanel.textContent = `Pontuação: ${game.score}`
}


window.addEventListener('keydown', (e) =>{
    game.player.move(e)
})

function start(){
    setInterval(game.render, 100)
    setInterval(game.addFruit, 2500)
}
start()
