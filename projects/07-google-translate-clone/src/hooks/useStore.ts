import { type State , Action, FromLanguage, Language } from "../types"
import { useReducer } from "react"

//1. Create a initialState
const initialState: State = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false
  }
  
  //2. Create a reducer
  function reducer (state: State, action: Action){
    const {type } = action
  
    switch(type){
      case 'INTERCHANGE_LANGUAGES':{
        if (state.fromLanguage === 'auto') return state

        const loading = state.fromText !== ''
        return{
          ...state,
          loading,
          result:'',
          fromLanguage: state.toLanguage,
          toLanguage: state.fromLanguage
        }
      }
      case 'SET_FROM_LANGUAGE':{
        if (state.fromLanguage == action.payload) return state

        const loading = state.fromText !== ''

        return{
          ...state,
          fromLanguage: action.payload,
          result: '',
          loading
        }
      }
      case 'SET_TO_LANGUAGE':{
        if (state.toLanguage == action.payload) return state

        const loading = state.fromText !== ''

        return{
          ...state,
          toLanguage: action.payload,
          loading
        }
      }
      case 'SET_FROM_TEXT':{
        const loading = action.payload !== ''

        return{
          ...state,
          loading,
          fromText: action.payload,
          result: ''
        }
      }
      case 'SET_RESULT':{
        return{
          ...state,
          loading: false,
          result: action.payload
        }
      }
    }

    return state
  }

  export function useStore(){

    //3. usar el hook useReducer
    const [{
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading
    }, dispatch] = useReducer(reducer, initialState)

    const interchangeLanguages = () => {
        dispatch({type:'INTERCHANGE_LANGUAGES'})
    }

    const setFromLanguage = (payload: FromLanguage) => {
        dispatch({type: 'SET_FROM_LANGUAGE', payload})
    }

    const setToLanguage =(payload: Language)=>{
        dispatch({type:'SET_TO_LANGUAGE', payload})
    }

    const setFromText =(payload: string)=>{
        dispatch({type:'SET_FROM_TEXT', payload})
    }

    const setResult =(payload: string)=>{
        dispatch({type:'SET_RESULT', payload})
    }

    return {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
        interchangeLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult
    }
  }