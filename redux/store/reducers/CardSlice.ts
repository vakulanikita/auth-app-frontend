import { ICard } from './../../models/ICard';
import { TCategory } from '../../models/TCategory';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { current } from '@reduxjs/toolkit'
import axios from 'axios';

const initialCards = [
  {
    id: "1",
    title: "SOFA",
    src: "/card1.png",
    category: <const>"Design",
    isActive: false
  },
  {
    id: "2",
    title: "KeyBoard",
    src: "/card2.png",
    category: <const>"Branding",
    isActive: false
  },
  {
    id: "3",
    title: "Work Media",
    src: "/card3.png",
    category: <const>"Illustration",
    isActive: false
  },
  {
    id: "4",
    title: "DDDone",
    src: "/card4.png",
    category: <const>"Motion",
    isActive: false
  },
  {
    id: "5",
    title: "Abstract",
    src: "/card5.png",
    category: <const>"Design",
    isActive: false
  },
  {
    id: "6",
    title: "HandP",
    src: "/card6.png",
    category: <const>"Branding",
    isActive: false
  },
  {
    id: "7",
    title: "Architect",
    src: "/card7.png",
    category: <const>"Motion",
    isActive: false
  },
  {
    id: "8",
    title: "CalC",
    src: "/card8.png",
    category: <const>"Design",
    isActive: false
  },
  {
    id: "9",
    title: "Sport",
    src: "/card9.png",
    category: <const>"Branding",
    isActive: false
  },
]

interface UserState {
  cards: ICard[];
  activeCategory: TCategory,
  count: number;
}

const initialState: UserState = {
  cards: initialCards,
  activeCategory: "Show All",
  count: 0
}

console.log();

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    toggleActive(state, action: PayloadAction<string>) {
      const idx = state.cards.findIndex((item) => item.id === action.payload)
      state.cards[idx].isActive = !state.cards[idx].isActive
    },
    changeCategory(state, action: PayloadAction<TCategory>) {
      state.activeCategory = action.payload
    },
    addCards(state) {
      const newCards:ICard[] = initialCards.map(item => ({
        id: nanoid(5),
        title: `${item.title}_${nanoid(1)}`,
        src: item.src,
        category: item.category,
        isActive: false
      }))
      state.cards.push(...newCards)
    },
    deleteActiveCards(state) {
      const notActiveCards = state.cards.filter(s => s.isActive === false)
      state.cards = notActiveCards
    },
  },
})

export default cardSlice.reducer