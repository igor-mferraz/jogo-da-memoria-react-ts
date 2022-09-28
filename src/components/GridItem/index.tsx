import { GridItemType } from '../../types/gridItem'
import * as C from './styles'
import b7Svg from '../../svgs/b7.svg'
import {items} from '../../data/item'
type Props = {
    item: GridItemType,
    onClick: () => void
}


export const GridItem = ({item,onClick}:Props) =>{
    return(
        <C.Container
            showBackGround = {item.permenantShow || item.show}
            onClick={onClick}
        >

            {item.permenantShow === false && item.show === false &&
                <C.Icon opacity={.1} src={b7Svg} alt=""/>
            }
            {(item.permenantShow || item.show) && item.item !== null &&
                <C.Icon src={items[item.item].icon} alt="" />
            }
        </C.Container>

    )
}