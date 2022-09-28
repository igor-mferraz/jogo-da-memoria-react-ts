import { useEffect, useState } from 'react'
import * as C from './App.styles'
import logoImg from './assets/devmemory_logo.png'
import { Button } from './components/Button'
import { InfoItem } from './components/InfoItem'
import RestartIcon from './svgs/restart.svg'
import { GridItemType } from './types/gridItem'
import { items } from './data/item'
import { GridItem } from './components/GridItem'
import { formatTimeElapsed } from './helpers/formatTimeElapsed'

function App() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([])


  useEffect(()=>{
    resetAndCreateGrid()
  },[])

  useEffect(()=>{
    const timer = setInterval(()=>{
      if(playing){
        setTime(time + 1);
      }
  },1000);
      return () => clearInterval(timer)
    },[playing,time])

    //verifica se os abertos são iguais
    useEffect(()=>{
      if(showCount === 2) {
        let aberto = gridItems.filter(item => item.show === true);
        if(aberto.length === 2) {
          
          
        // verificar se eles são iguais, tornalos permanentes
          if(aberto[0].item === aberto[1].item){
            let tempGrid = [...gridItems]
            for(let i in tempGrid) {
              if(tempGrid[i].show){
                tempGrid[i].permenantShow = true;
                tempGrid[i].show = false
              }
            }
            setGridItems(tempGrid)
            setShowCount(0)
            
          } else {
            //fechando cartas diferentes
            setTimeout(()=>{
              let tempGrid = [...gridItems]
                for(let i in tempGrid){
              tempGrid[i].show = false
            }

            setGridItems(tempGrid)
            setShowCount(0)
            },1000)
          }
        
          setMoveCount(moveCount => moveCount + 1)
        }
      }
    },[showCount, gridItems])

    //verificar se o jogo acabou
    useEffect(()=>{
      if(moveCount > 0 && gridItems.every(item => item.permenantShow === true)) {
        setPlaying(false)
      }
    },[moveCount, gridItems])





  const resetAndCreateGrid = () =>{
    //1 - resetar o jogo
    setTime(0)
    setMoveCount(0)
    setShowCount(0)
    
    // 2 - criar grid 
    let grid: GridItemType[] = []
    for(let i=0; i < (items.length * 2); i++){
      grid.push({
        item:null,
        show: false,
        permenantShow: false
      })
    }
    //2.2 - prencher o grid
    for(let w = 0; w < 2; w++){
      for(let i = 0; i < items.length; i++){
        let pos = -1;
        while (pos < 0 || grid[pos].item !== null ){
          pos = Math.floor(Math.random() * (items.length * 2));
        }

        grid[pos].item= i;
      }
    }

    // 2.3 - jogar no state
    setGridItems(grid)

    // 3 - começar o jogo
    setPlaying(true)
  }




  const handleItemClick = (index:number)=>{
    if(playing && index !== null && showCount < 2){
      let tempGrid = [...gridItems];

      if(tempGrid[index].permenantShow === false && tempGrid[index].show === false) {
        tempGrid[index].show = true;
        setShowCount(showCount + 1);
      }
      setGridItems(tempGrid);

    }
  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImg} alt="log" width="200" />
        </C.LogoLink>

        <C.InfoArea>
          
          <InfoItem label='Tempo' value={formatTimeElapsed(time)} />
          <InfoItem label='Jogadas' value={moveCount.toString()}/>
        </C.InfoArea>

        <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}/>
      </C.Info>




      <C.GridArea>
        <C.Grid>
          {gridItems.map((item,index)=>(
            <GridItem
              key={index}
              item={item}
              onClick={()=> handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>

    </C.Container>
  )
}

export default App
