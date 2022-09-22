import { faCheck, faForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Dispatch, SetStateAction, useState } from 'react'

import Component from './Component'

import { RootState } from '../store'
import gameSlice from '../store/gameSlice'
import { useSelector, useDispatch } from 'react-redux'

import './styles/gameStyles.css'
import modalSlice from '../store/modalSlice'

type Props = {
    className?: string | null
}

type Styles = {
    static: string
    dynamic?: string | null
}

const styles = {} as Styles

styles.static =
    'flex landscape:flex-col landscape:flex-col-reverse justify-center items-center gap-2 md:gap-3 lg:gap-4 p-2 md:p-3 lg:p-4 bg-neutral-300 border-x border-b border-neutral-400 rounded-b'

export default function Taskbar({ className = null }: Props) {
    styles.dynamic = className

    const dispatch = useDispatch()

    const modal = {
        state: useSelector((state: RootState) => state.modal),
        action: modalSlice.actions,
    }

    const [isEndTurn, setIsEndTurn] = useState<boolean>(false)

    const game = {
        state: useSelector((state: RootState) => state.game),
        action: gameSlice.actions,
    }

    const handleEndTurn = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setIsEndTurn(true)
        dispatch(
            modal.action.setIsShowGivePointModal(
                !modal.state.isShowGivePointModal
            )
        )
    }

    return (
        <Component id='Taskbar'>
            <div
                className={
                    game.state.isTurn
                        ? `${styles.static} ${styles.dynamic}`
                        : `avoid-clicks ${styles.static} ${styles.dynamic}`
                }
            >
                <button
                    className='w-1/2 flex justify-center items-center'
                    disabled={game.state.isTurn ? false : true}
                >
                    <FontAwesomeIcon icon={faForward} className='text-xl' />
                </button>
                <button
                    className='w-1/2 flex justify-center items-center'
                    onClick={handleEndTurn}
                    disabled={game.state.isTurn ? false : true}
                >
                    <FontAwesomeIcon icon={faCheck} className='text-xl' />
                </button>
            </div>
        </Component>
    )
}
