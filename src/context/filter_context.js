import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {

  const { products } = useProductsContext()
  //fetching the product[] data present in the state{} from the productContext.
  
  const [state, dispatch] = useReducer(reducer, initialState)

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  const updateSort = (e) => {
    // for demonstration
    // const name = e.target.name
    const value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: value })
  }

  const updateFilters = (e) => {
    let name = e.target.name 
    // this [name]: represents the 'text' in the filter{} inside the filter_context.js
    //because this 'text'in filter{} was assigned to the name attribute in the form. in filter.js
    let value = e.target.value

    if(name==='category'){   
      value=e.target.textContent
      // for accessing the content of each of the button
      // this is required as there is no value attribute in case of a button.
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }
  const clearFilters = () => {}

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  useEffect(() => {  
    dispatch({type:FILTER_PRODUCTS})//use for filtering
    dispatch({ type: SORT_PRODUCTS })//use for sorting
      }, [products, state.sort,state.filters])

  return (
    <FilterContext.Provider value={{...state, setGridView, setListView,updateSort, updateFilters,
      clearFilters,}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
