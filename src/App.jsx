import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ListPage from './pages/ListPage'
import NotFoundPage from './pages/NotFoundPage'
import UserDetailsPage from './pages/UserDetailsPage'
import UserSetupPage from './pages/UserSetupPage'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import BillingPage from './pages/BillingPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={ <NotFoundPage /> } />
        <Route path="/" element={ <HomePage /> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/binning" element={ <BillingPage /> } />
        <Route path="/users" element={ <ListPage /> } />
        <Route path="/user/:id" element={ <UserDetailsPage /> } />
        <Route path="/setup/user" element={ <UserSetupPage /> } />
        <Route path="/setup/user/:id" element={ <UserSetupPage /> } />
      </Routes>
    </>
  )
}
export default App