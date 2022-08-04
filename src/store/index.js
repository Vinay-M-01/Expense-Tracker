import { createSlice, configureStore} from '@reduxjs/toolkit';


// this is for the authentication of the user 
const initialAuthState = {
    isAuthenticated: false,
    token:null,
    userId:null,
  };

  const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
      login(state, action) {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
      },
      logout(state) {
        state.isAuthenticated = false;
        state.token = null;
        state.userId = null;
      },
    },
  });

  // For tracking expenses
  const initialExpenseState = {
    expensesState: [],
    premiumState:false
  }
  
  const expenseSlice = createSlice({
    name: 'expenseSlice',
    initialState: initialExpenseState,
    reducers: {
      addUser(state, action) {
        state.expensesState = [...state.expensesState, action.payload]
      },
     
      reloadUserDetails(state, action){
        state.expensesState = action.payload
      },

      togglePremiumState(state){
        state.premiumState = true
      }
    },
  });

  const store = configureStore({
    reducer: {auth: authSlice.reducer, expenses: expenseSlice.reducer}
  });

  export const authActions = authSlice.actions;

  export const expenseActions = expenseSlice.actions

  export default store;