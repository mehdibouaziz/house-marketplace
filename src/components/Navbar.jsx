import { useNavigate, useLocation, useMatch } from "react-router-dom"

import {ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'


const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const pathMatchRoute = (regex) => {
    return (regex.test(location.pathname))
  }

  return (
    <footer className="navbar">
        <nav className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListItem">
                    <ExploreIcon fill={(pathMatchRoute(/^\/$/) || pathMatchRoute(/^\/category\/*/)) ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' onClick={() => navigate('/')} />
                    <p className={(pathMatchRoute(/^\/$/) || pathMatchRoute(/\/category\/*/)) ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p>
                </li>
                <li className="navbarListItem">
                    <OfferIcon fill={pathMatchRoute(/^\/offers/) ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' onClick={() => navigate('/offers')} />
                    <p className={pathMatchRoute(/^\/offers/) ? 'navbarListItemNameActive' : 'navbarListItemName'}>Offers</p>
                </li>
                <li className="navbarListItem">
                    <PersonOutlineIcon fill={(pathMatchRoute(/^\/profile/) || pathMatchRoute(/^\/sign/)) ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' onClick={() => navigate('/profile')} />
                    <p className={pathMatchRoute(/^\/profile/) ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</p>
                </li>
            </ul>
        </nav>
    </footer>
  )
}

export default Navbar