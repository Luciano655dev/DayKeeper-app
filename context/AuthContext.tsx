import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react"

// Define types
type User = {
  id: string
  name: string
  email: string
}

type State = {
  user: User | null
}

type Action = { type: "LOGIN"; payload: User } | { type: "LOGOUT" }

type AuthContextType = {
  state: State
  dispatch: Dispatch<Action>
}

// Create Context with proper type
const AuthContext = createContext<AuthContextType | undefined>(undefined)

const initialState: State = {
  user: null,
}

function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload }
    case "LOGOUT":
      return { ...state, user: null }
    default:
      return state
  }
}

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
