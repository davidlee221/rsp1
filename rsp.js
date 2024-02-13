/* SETUP DOM */
const container = document.querySelector('#container');

const gameArea = document.querySelector('#game-area');

const choiceList = ['Rock', 'Scissors', 'Paper']

const MAPPING = {
    rock: 0,
    scissors: 1,
    paper: 2
}


let round = 1
let game = 0;
let record = [];

const getComputerChoice = () => {
    const randInt =  Math.floor(Math.random() * 100) % 3
        return randInt
}

const compMapping = (selected) => {
    return Object.keys(MAPPING).find(key => MAPPING[key] === selected)
}

const playRound = (playerSelection, computerSelection) => {
    const value = MAPPING[playerSelection.toLowerCase()]
    const result = value - computerSelection
    if (result < 0 && result > -2)
        return 1
    else if (result === 0)
        return 0
    else return -1
}

const resultArea = document.querySelector('#result-area');
choiceMade = (playerSelect) => {
    // let playerSelect = prompt('enter a shape:')
    // while (!Object.keys(MAPPING).includes(playerSelect))
        // playerSelect = prompt('enter a VALID shape:')
    const computerSelect = getComputerChoice()
    result = playRound(playerSelect, computerSelect)
    resultArea.textContent = resultMap({sum: result, player: playerSelect, ai: computerSelect})
    record.push(resultMap({sum: result, player: playerSelect, ai: computerSelect, forRecord: true}))

    if (round === 5)
        gameArea.textContent = resultMap({sum: game, game: true})

    game += result
    round += 1
}

choiceList.forEach(choice => {
    const btn = document.createElement('button')
    btn.textContent = choice
    btn.addEventListener('click', () => choiceMade(choice))
    container.appendChild(btn)
})

const resultMap = (props) => {
    const {sum, player, ai, game, forRecord} = props
    if (sum > 0) {
        if (forRecord)
            return 'win'
        return game 
            ? `You won the game.  The record was ${record}`
            : `You won the round, it was ${player} (you) vs. ${compMapping(ai)} (AI)`
    }
    else if (sum < 0) {
        if (forRecord)
            return 'loss'
        return game
            ? `You lost the game. The record was ${record}`
            : `You lost the round, it was ${player} (you) vs. ${compMapping(ai)} (AI)`
    }
    else {
        if (forRecord)
            return 'tie'
        return game
            ? `It was a tie?  The record was ${record}`
            : `It was a tie, it was ${player} (you) vs. ${compMapping(ai)} (AI)`
    }
}
