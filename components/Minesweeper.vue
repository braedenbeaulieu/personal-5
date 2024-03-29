<template>
    <div>
        <div class="minsweeper-container">
			<h2 id="flag-counter">40</h2>
			<div id="minesweeper-game"></div>
            <p class="small-text">Keyboard Controls: Option for flag. Command or Space for click. Move with arrow keys.</p>
			<div class="difficulty-selector">
				<button id="easy-mode">Easy</button>
				<button id="normal-mode">Normal</button>
				<button id="hard-mode">Hard</button>
			</div>
		</div>
        <div class="mobile-message">
            <p class="text-2xl text-center py-3">Your screen size is too small.</p>
        </div>
        <div id="minesweeper-modal" class="p-4 text-center relative flex flex-col items-center justify-center bg-white">
            <div class="bg-white w-full border-b-2 border-black absolute top-0 left-0 flex justify-start">
                <div id="close" class="border-r-2 border-black h-4 w-5 flex justify-center items-center cursor-pointer hover:bg-gray-300">
                    <span class="-mr-[2px] -mt-[2px]">x</span>
                </div>
                <div id="minimize" class="border-r-2 border-black h-4 w-5 flex justify-center items-center cursor-pointer hover:bg-gray-300">
                    <span class="-mr-[2px]">-</span>
                </div>
            </div>
            <p class="text-lg my-2">You Lose!</p>
            <button id="play-again" class="block text-center relative w-36 h-12 mx-auto bg-black z-10 mt-1 -mb-2"><div class="w-full h-full leading-5 bg-white hover:bg-white absolute z-0 border-2 border-black p-2 -top-1 -left-1 hover:top-0 hover:left-0">Play</div></button>
        </div>
    </div>
</template>
<script setup lang="ts">
    class Minesweeper {
        container: HTMLElement|null
        total_bombs: number
        rows: number
        columns: number
        board: HTMLElement|null
        first_click: boolean
        bomb_sound: any|null
        fireworks_sound: any|null

        constructor(container: HTMLElement|null) {
            this.container = container
            this.total_bombs = 0
            this.rows = 0
            this.columns = 0
            this.board = null
            this.first_click = true
            
            if(container == null) {
                console.error('Something went wrong.')
                return
            }
            
            this.container?.addEventListener('contextmenu', (e) => {
                e.preventDefault()
            })

            this.initEventListeners()
        }

        getKey(key: string): string|false {
            switch(key) {
                case 'ArrowRight':
                    return 'right'
                case 'ArrowLeft':
                    return 'left'
                case 'ArrowDown':
                    return 'down'
                case 'ArrowUp':
                    return 'up'
                case ' ':
                case 'Meta':
                    return 'left-click'
                case 'Alt':
                    return 'right-click'
                case 'Enter':
                    return 'enter'
                default:
                    return false
            }
        }

        createCell(x: number, y: number , is_bomb: boolean, index: string): HTMLElement {
            let cell = document.createElement('div')
            cell.classList.add('cell')
            cell.dataset.x = x.toString()
            cell.dataset.y = y.toString()
            cell.dataset.isBomb = is_bomb ? '1' : '0'
            cell.dataset.isChecked = '0'
            cell.dataset.index = index

            return cell
        }

        getAllCells(): any[] {
            return Array.from(this.getBoard().querySelectorAll(`.cell`))
        }

        getCellByXY(x: number, y: number): HTMLElement {
            return this.getBoard().querySelector(`.cell[data-x="${x}"][data-y="${y}"]`)! as HTMLElement
        }

        selectCell(cell: HTMLElement) {
            let current_selection = this.getSelectedCell()
            if(current_selection) {
                current_selection.classList.remove('selected')
            }
            cell.classList.add('selected')
        }

        getSelectedCell(): HTMLElement|false {
            let current_selection = document.querySelector('.cell.selected') as HTMLElement
            if(current_selection) return current_selection
            
            current_selection = document.querySelector('.cell[data-x="0"][data-y="0"]') as HTMLElement
            if(current_selection) {
                current_selection.classList.add('selected')
                return current_selection
            }

            return false
        }

        moveSelectedCell(selected_cell: HTMLElement, direction: string) {
            let next_cell
            let x = selected_cell.dataset.x ? parseInt(selected_cell.dataset.x) : 0
            let y = selected_cell.dataset.y ? parseInt(selected_cell.dataset.y) : 0

            // console.log(x, y)
            switch(direction) {
                case 'right':
                    y++
                    if(y > 15) y = 0
                    break
                case 'left':
                    y--
                    if(y < 0) y = 15
                    break
                case 'up':
                    x--
                    if(x < 0) x = 15
                    break
                case 'down':
                    x++
                    if(x > 15) x = 0
                    break
            }

            next_cell = this.getCellByXY(x, y)
            if(next_cell) this.selectCell(next_cell)
        }

        doesCellHaveBomb(x: number, y: number): boolean {
            let cell = this.getCellByXY(x, y)
            if(!cell) return false
            return cell.dataset.isBomb == '1' ? true : false
        }

        getBoard() {
            if(this.board) return this.board
            let board = document.createElement('div')
            board.id = 'board'
            this.board = board
            return board
        }

        getDifficulty(): string {
            let difficulty_selector = document.querySelector('.difficulty-selector') as HTMLElement
            if(difficulty_selector != null && difficulty_selector.dataset.difficulty) {
                return difficulty_selector.dataset.difficulty
            }
            return 'normal'
        }

        setDifficulty(difficulty: string|null) {
            if(!difficulty) {
                difficulty = this.getDifficulty()
            } else {
                document.querySelector<HTMLElement>('.difficulty-selector')!.dataset.difficulty = difficulty
            }
            
            switch(difficulty) {
                case 'easy':
                    this.rows = 10
                    this.columns = 10
                    this.total_bombs = 10
                    break
                case 'normal':
                    this.rows = 16
                    this.columns = 16
                    this.total_bombs = 40
                    break
                case 'hard':
                    this.rows = 16
                    this.columns = 30
                    this.total_bombs = 99
                    break
                default:
                    this.rows = 16
                    this.columns = 16
                    this.total_bombs = 40
                    break
            }

            this.resetFlagCounter()
        }

        generateBoard() {
            // console.log('generating')
            let bombs_array: number[] = []
            let cells: HTMLElement[] = []
            let index: number = 1
            let difficulty: string = this.getDifficulty()

            this.getBoard()!.className = difficulty
            
            while(bombs_array.length < this.total_bombs) {
                let random = Math.floor(Math.random() * (this.rows * this.columns)) + 1
                if(bombs_array.indexOf(random) === -1) bombs_array.push(random)
            }

            for(let i = 0; i < this.rows; i++) {
                for(let j = 0; j < this.columns; j++) {
                    let cell = this.createCell(i, j, false, index.toString())
                    this.appendCell(cell)
                    cells.push(cell)
                    index++
                }
            }
        }

        addBombs(exclude: number|null = null) {
            // console.log('Adding bombs...')
            return new Promise(resolve => {
                // console.log('adding bombs')
                let cells = this.getAllCells()
                let bombs_array: number[] = []
                let is_bomb = false

                // console.log(this.total_bombs)
                
                while(bombs_array.length < this.total_bombs){
                    let random = Math.floor(Math.random() * (this.rows * this.columns)) + 1
                    if(bombs_array.indexOf(random) === -1 && random != exclude) bombs_array.push(random)
                }
        
                for(let cell of cells) {
                    is_bomb = (bombs_array.indexOf(parseInt(cell.dataset.index)) > -1) ? true : false
                    if(is_bomb) cell.dataset.isBomb = '1'
                }

                resolve(true)
            })
        }

        scanBoard() {
            return new Promise(resolve => {
                // console.log('Scanning board')
        
                for(let i = 0; i < this.rows; i++) {
                    for(let j = 0; j < this.columns; j++) {
                        let cell = this.getCellByXY(i, j)
                        if(!cell) continue
        
                        let { close_bombs } = this.checkNeighbourCellsForBombs(i, j)
                        if(close_bombs > 0) {
                            // @ts-ignore
                            cell.innerHTML = `<p>${close_bombs}</p>`
                        }
                        // @ts-ignore
                        cell.dataset.closeBombs = close_bombs
                    }
                }

                resolve(true)
            })
        }

        async resetBoard() {
            this.getBoard().innerHTML = ''
            this.setDifficulty(null)
            this.generateBoard()
            this.first_click = true
        }

        appendCell(cell: HTMLElement) {
            let board = this.getBoard()
            board.appendChild(cell)
        }

        render() {
            let board = this.getBoard()
            this.container?.append(board)
            this.setDifficulty(null)
            this.generateBoard()
            this.first_click = true
        }

        checkNeighbourCellsForBombs(current_x: number, current_y: number) {
            let cells_to_check = [
                [(current_x - 1), (current_y - 1)], [(current_x), (current_y - 1)], [(current_x + 1), (current_y - 1)],
                [(current_x - 1), (current_y)],     [(current_x), (current_y)],     [(current_x + 1), (current_y)],
                [(current_x - 1), (current_y + 1)], [(current_x), (current_y + 1)], [(current_x + 1), (current_y + 1)],
            ]
            let close_bombs = 0
            let neighbour_cells: any[] = []
            let direct_neighbour_cells: any[] = []

            for(let [x, y] of cells_to_check) {
                if(x < 0 || y < 0 || x > (this.rows) || y > (this.columns)) {
                    // console.log('out of bounds!')
                    continue
                }

                // if there is a bomb nearby, colour it orange
                let cell = this.getCellByXY(x, y) as HTMLElement
                if(cell) {
                    if(cell.dataset.isBomb === '1') {
                        close_bombs++
                    }

                    if(!(x == current_x && y == current_y)) {
                        neighbour_cells.push(cell)
                    }
                    
                    if(x == current_x || y == current_y && !(x == current_x && y == current_y)) {
                        direct_neighbour_cells.push(cell)
                    }
                }
            }

            return { 
                close_bombs,
                neighbour_cells,
                direct_neighbour_cells,
            }
        }

        isEveryCellChecked(): boolean {
            // if every square - number of bombs is equal to the number of checked cells
            if((document.querySelectorAll('.cell[data-is-checked="1"][data-is-bomb="0"]').length + 1) + this.total_bombs == (this.rows * this.columns)) {
                return true
            } 
            return false
        }

        showAllBombs(): void {
            let bombs = Array.from(document.querySelectorAll('.cell[data-is-bomb="1"]'))

            for(let bomb of bombs) {
                bomb.classList.add('boom')
            }
        }

        leftClick(clicked_cell: any): void {
            // console.log('Left click')
            if(this.isEveryCellChecked()) {
                this.winGame()
            }

            if(!clicked_cell) return
            if(clicked_cell.dataset.isChecked === '1') return
            clicked_cell.dataset.isChecked = '1'

            this.selectCell(clicked_cell)

            if(clicked_cell.dataset.flagged == 'true') {
                this.updateFlagCounter('up')
            }

            let x = parseInt(clicked_cell.dataset.x)
            let y = parseInt(clicked_cell.dataset.y)
            let is_bomb = parseInt(clicked_cell.dataset.isBomb) ? true : false

            if(is_bomb) {
                clicked_cell.classList.add('boom')
                setTimeout(() => {
                    this.resetFlagCounter()
                    this.loseGame()
                }, 20)
            } else {
                clicked_cell.classList.add('safe')
                if(clicked_cell.dataset.flagged == 'true') {
                    clicked_cell.dataset.flagged = 'false'
                    // this.updateFlagCounter('up')
                }
            }

            let { neighbour_cells, direct_neighbour_cells } = this.checkNeighbourCellsForBombs(x, y)
            clicked_cell.dataset.closeBombs
            if(clicked_cell.dataset.closeBombs === '0') {
                for(let cell of neighbour_cells) {
                    clicked_cell.dataset.isChecked = '1'
                    let x = cell.dataset.x
                    let y = cell.dataset.y
                    cell.classList.add('safe')
                    if(cell.dataset.flagged == 'true') {
                        cell.dataset.flagged = 'false'
                        // this.updateFlagCounter('up')
                    }
                    this.leftClick(this.getCellByXY(x, y))
                }
            } else {
                for(let cell of direct_neighbour_cells) {
                    if(cell.dataset.closeBombs === '0') {
                        clicked_cell.dataset.isChecked = '1'
                    }
                }
            }
        }

        rightClick(cell: any): void {
            if(cell.dataset.isChecked == '1') return
            if(!cell.dataset.flagged || cell.dataset.flagged == 'false') {
                cell.dataset.flagged = 'true'
                this.updateFlagCounter('down')
            } else if(cell.dataset.flagged == 'true') {
                cell.dataset.flagged = 'false'
                this.updateFlagCounter('up')
            }
        }

        async firstClick(cell: any) {
            // console.log('First click')
            this.setDifficulty(null)
            await this.addBombs(cell.dataset.index)
            await this.scanBoard()
            setTimeout(() => {
                this.leftClick(cell)
            }, 10) 
        }

        showConfetti() {
            this.fireworks_sound.play()
            let end = Date.now() + 2500
            let colors = ['#bb0000', '#ffffff'];

            (function frame() {
                // @ts-ignore
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                })
                // @ts-ignore
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                })

                if(Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }())
        }

        showBombConfetti() {
            this.bomb_sound.play()
            let defaults = {
                spread: 360,
                ticks: 50,
                gravity: 0,
                decay: 0.94,
                startVelocity: 30,
                shapes: ['star'],
                colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
            }

            function shoot() {
                // @ts-ignore
                confetti({
                    ...defaults,
                    particleCount: 40,
                    scalar: 1.2,
                    shapes: ['star']
                })

                // @ts-ignore
                confetti({
                    ...defaults,
                    particleCount: 10,
                    scalar: 0.75,
                    shapes: ['circle']
                })
            }

            setTimeout(shoot, 0)
            setTimeout(shoot, 100)
            setTimeout(shoot, 200)
        }

        loseGame() {
            this.toggleModal('You lose!')
            this.showBombConfetti()
            this.showAllBombs()
        }
        winGame() {
            this.toggleModal('You WIN!')
            this.showConfetti()
        }

        closeModal() {
            let modal = document.getElementById('modal') as HTMLElement
            if(!modal || modal == null) return
            modal.classList.remove('open')
            // @ts-ignore
            modal.querySelector('p').textContent = ''
        }

        toggleModal(message: string) {
            let modal = document.getElementById('modal') as HTMLElement
            if(!modal || modal == null) return
            modal.classList.toggle('open')
            // @ts-ignore
            modal.querySelector('p').textContent = message
        }

        updateFlagCounter(operation: string) {
            let flag_counter = document.getElementById('flag-counter') as HTMLElement
            if(operation == 'up') {
                flag_counter.innerHTML = (parseInt(flag_counter.innerHTML) + 1).toString()
            } else if(operation == 'down') {
                flag_counter.innerHTML = (parseInt(flag_counter.innerHTML) - 1).toString()
            }
        }

        resetFlagCounter() {
            let flag_counter = document.getElementById('flag-counter') as HTMLElement
            flag_counter.textContent = this.total_bombs.toString()
        }

        initEventListeners() {
            document.addEventListener('keydown', (e): void => {
                e.preventDefault()
                let key = this.getKey(e.key)
                if(!key) return

                let selected_cell = this.getSelectedCell() as HTMLElement
                if(!selected_cell) return

                if(key == 'left-click') {
                    if(this.first_click) {
                        this.firstClick(selected_cell)
                        this.first_click = false
                    } else {
                        this.leftClick(selected_cell)
                    }
                }

                if(key == 'right-click') {
                    this.rightClick(selected_cell)
                }
                
                if(key == 'enter') {
                    this.closeModal()
                    this.resetBoard()
                }
                
                if(['right', 'left', 'up', 'down'].indexOf(key) >= -1) {
                    let error_cell = document.querySelector('.cell.error') as HTMLElement
                    if(error_cell) {
                        error_cell.classList.remove('error')
                    }

                    this.moveSelectedCell(selected_cell, key)
                }
            })

            document.querySelector('#minimize')!.addEventListener('click', (e): void => {
                this.toggleModal('')
                this.resetBoard()
            })
            document.querySelector('#close')!.addEventListener('click', (e): void => {
                this.toggleModal('')
                this.resetBoard()
            })
            document.querySelector('#play-again')!.addEventListener('click', (e): void => {
                this.toggleModal('')
                this.resetBoard()
            })
            document.querySelector('#easy-mode')!.addEventListener('click', (e): void => {
                document.querySelector<HTMLElement>('.difficulty-selector')!.dataset.difficulty = 'easy'
                this.setDifficulty('easy')
                this.resetBoard()
            })
            document.querySelector('#normal-mode')!.addEventListener('click', (e): void => {
                document.querySelector<HTMLElement>('.difficulty-selector')!.dataset.difficulty = 'normal'
                this.setDifficulty('normal')
                this.resetBoard()
            })
            document.querySelector('#hard-mode')!.addEventListener('click', (e): void => {
                document.querySelector<HTMLElement>('.difficulty-selector')!.dataset.difficulty = 'hard'
                this.setDifficulty('hard')
                this.resetBoard()
            })
            
            let board = this.getBoard()
            board.addEventListener('mousedown', (e): void => {
                e.preventDefault()
                let target = e.target as HTMLElement
                if(target == null) return
                if(!target.classList.contains('cell')) return

                if(this.first_click) {
                    this.firstClick(target)
                    this.first_click = false
                } else {
                    if(e.button === 2 || (e.button === 0 && e.altKey === true)) {
                        this.rightClick(target)
                    } else {
                        this.leftClick(target)
                    }
                }
            })
        }
    }

    onMounted(() => {
        let explosion = new Audio('/explosion.wav');
        let fireworks = new Audio('/fireworks.wav');
        let board = new Minesweeper(document.getElementById('minesweeper-game'))

        if(explosion) {
            board.bomb_sound = explosion
        }
        if(fireworks) {
            board.fireworks_sound = fireworks
        }
        board.render()
    })
</script>
<style>
    :root {
        font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;

        color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
    }

    #minesweeper-modal {
        position: fixed;
        top: calc(50% - 60px);
        left: -150vw;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 240px;
        height: 120px;
        /* background-color: rgb(23, 158, 203); */
        box-shadow: 3px 3px 10px rgba(0, 0, 0, .2);
        border: 2px solid black;
        transition: left .15s;
    }
    
    #minesweeper-modal.open {
        left: 0;
    }

    .minsweeper-container {
        max-width: 1050px;
        width: 100%;
        padding: 0 15px;
        margin: 0 auto;
        display: none;
    }

    .mobile-message {
        display: block;
    }

    .small-text {
        text-align: center;
        font-size: 12px;
    }

    @media screen and (min-width: 800px) {
        .minsweeper-container {
            display: block;
        }
        .mobile-message {
            display: none;
        }
    }


    h1 {
        margin: 30px 0 10px;
        text-align: center;
    }

    .minsweeper-container h2 {
        margin: 50px 0;
        font-weight: 900;
        font-size: 5rem;
        text-align: center;
    }

    .difficulty-selector {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 15px;	
        margin-bottom: 15px;	
    }

    #board {
        margin: 40px auto 4px;
        /* border: 1px solid black; */
        display: flex;
        flex-wrap: wrap;
        gap: 1.5px;
        border-radius: 8px;
        overflow: hidden;
    }

    #board.easy {
        width: 334px!important;
    }
    #board.normal {
        width: 535px!important;
    }
    #board.hard {
        width: 1004px!important;
    }

    .cell {
        background-color: #fff;
        width: 32px;
        height: 32px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0px;
        overflow: hidden;
    }

    .cell p {
        color: black;
        font-weight: 900;
        pointer-events: none;
    }

    .cell[data-close-bombs="1"] p {
        color: blue;
    }
    .cell[data-close-bombs="2"] p {
        color: green;
    }
    .cell[data-close-bombs="3"] p {
        color: red;
    }
    .cell[data-close-bombs="4"] p {
        color: #e250f2;
    }
    .cell[data-close-bombs="5"] p {
        color: #9c2c1a;
    }
    .cell[data-close-bombs="6"] p {
        color: #f2d250;
    }
    .cell[data-close-bombs="7"] p {
        color: #42e02d;
    }
    .cell[data-close-bombs="8"] p {
        color: #2ed9c8;
    }

    .cell[data-is-bomb="0"]::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #c1c1c1;
    }

    .cell[data-is-bomb="1"] {
        background-color: #c1c1c1;
    }

    .cell[data-flagged="true"], .cell[data-flagged="true"]::after {
        background-color: white!important;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23ff5555' class='bi bi-flag' viewBox='0 0 16 16'%3E%3Cpath d='M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 80%;
        background-position: center;
    }

    .cell[data-is-checked="1"] {
        background-color: white;
    }

    .cell[data-is-bomb="1"] p {
        display: none;
    }

    .cell[data-is-checked="0"]:hover, .cell[data-is-checked="0"]:hover::after {
        background-color: #888;
    }

    .cell.safe::after {
        /* content: unset; */
        background-color: transparent;
    }

    .cell.boom {
        background-color: white!important;
        background-image: url("data:image/svg+xml,%3Csvg fill='%23000000' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='796 796 200 200' enable-background='new 796 796 200 200' xml:space='preserve'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cg%3E%3Cpath d='M889.414 877.934C889.413 877.934 889.414 877.934 889.414 877.934c-12.737 0-24.711 4.96-33.716 13.965 c-1.572 1.573-1.572 4.122 0 5.694c1.572 1.573 4.123 1.573 5.696 0c7.484-7.483 17.435-11.605 28.02-11.605 c10.584 0 20.538 4.123 28.023 11.606c0.786 0.787 1.817 1.181 2.847 1.18c1.031 0 2.062-0.393 2.848-1.18 c1.573-1.573 1.573-4.122 0-5.695C914.126 882.894 902.15 877.934 889.414 877.934z'%3E%3C/path%3E%3Cpath d='M954.393 866.523c5.926-5.926 9.189-13.804 9.189-22.183c0-8.379-3.264-16.257-9.188-22.183 c-2.358-2.36-6.184-2.359-8.543 0c-2.36 2.359-2.36 6.184-0.002 8.543c3.644 3.644 5.651 8.488 5.651 13.641 c0 5.151-2.007 9.995-5.649 13.639l-2.168 2.167c0 0-0.001 0.001-0.001 0.001l-3.055-3.056c-1.835-1.834-4.322-2.864-6.916-2.864 s-5.081 1.03-6.914 2.864l-5.136 5.135c-0.566 0.568-1.431 0.716-2.155 0.369c-9.275-4.438-19.503-6.779-30.09-6.779 c-18.644 0-36.172 7.26-49.356 20.443c-27.214 27.215-27.214 71.495 0 98.708c13.184 13.185 30.711 20.445 49.355 20.445 c18.643 0 36.173-7.261 49.355-20.445c21.443-21.443 25.988-53.483 13.64-79.421c-0.346-0.723-0.197-1.585 0.37-2.153l5.16-5.161 c3.817-3.819 3.817-10.01 0-13.829l-5.715-5.714c0.001 0 0.001 0 0.001-0.001L954.393 866.523z M930.227 966.427 c-10.901 10.9-25.396 16.904-40.812 16.904c-15.416 0-29.91-6.004-40.811-16.904c-22.503-22.504-22.503-59.12 0-81.623 c10.902-10.9 25.396-16.904 40.813-16.904s29.911 6.003 40.812 16.904C952.728 907.307 952.728 943.922 930.227 966.427z'%3E%3C/path%3E%3Cpath d='M935.287 817.365c0.785 0.786 1.817 1.18 2.848 1.18c1.029 0 2.061-0.393 2.848-1.179c1.573-1.572 1.573-4.123 0-5.696 l-6.304-6.305c-1.57-1.574-4.122-1.573-5.695 0c-1.573 1.573-1.573 4.122 0 5.696L935.287 817.365z'%3E%3C/path%3E%3Cpath d='M924.316 830.503h8.915c2.225 0 4.028-1.803 4.028-4.028c0-2.224-1.804-4.027-4.028-4.027h-8.915 c-2.225 0-4.027 1.804-4.027 4.027C920.289 828.7 922.092 830.503 924.316 830.503z'%3E%3C/path%3E%3Cpath d='M950.058 813.553c2.226 0 4.027-1.804 4.027-4.027v-8.915c0-2.225-1.802-4.028-4.027-4.028s-4.028 1.803-4.028 4.028v8.915 C946.029 811.749 947.832 813.553 950.058 813.553z'%3E%3C/path%3E%3Cpath d='M971.171 805.275c-1.573-1.572-4.124-1.572-5.695 0l-6.304 6.305c-1.573 1.572-1.573 4.122 0 5.695 c0.787 0.786 1.817 1.18 2.848 1.18s2.063-0.394 2.847-1.18l6.304-6.305C972.744 809.398 972.744 806.848 971.171 805.275z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 80%;
        background-position: center;
    }

    .cell.selected::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        border: 5px solid rgba(0, 109, 187, .9);
    }
</style>