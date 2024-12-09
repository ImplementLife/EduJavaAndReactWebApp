import { Route, Routes }  from 'react-router-dom'
import HomePage           from '@/pages/HomePage/HomePage'
import ListPage           from '@/pages/UserListPage/UserListPage'
import NotFoundPage       from '@/pages/NotFoundPage/NotFoundPage'
import UserDetailsPage    from '@/pages/UserDetailsPage/UserDetailsPage'
import UserSetupPage      from '@/pages/UserSetupPage/UserSetupPage'
import LoginPage          from '@/pages/LoginPage/LoginPage'
import LogoutPage         from '@/pages/LogoutPage/LogoutPage'
import BillingPage        from '@/pages/BillingPage/BillingPage'
import Footer             from '@/components/common/Footer/Footer'
import Navbar             from '@/components/common/Navbar/Navbar'
import                         '@/css/App.css'

export default function App() {
  return (
    <div className="app-container bgSecondary">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/users" element={<ListPage />} />
          <Route path="/user/:id" element={<UserDetailsPage />} />
          <Route path="/setup/user" element={<UserSetupPage />} />
          <Route path="/setup/user/:id" element={<UserSetupPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}