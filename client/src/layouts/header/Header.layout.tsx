import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import logoPNG from '@/assets/photos/logo.png';
import { IconLogin, IconLogout, IconSignup, IconTheme, IconGithub } from '@/shared/components/icons';
import { useApi } from '@/shared/hooks';
import Hamburger from 'hamburger-react';
import { HamburgerMenu } from './components/HamburgerMenu.component';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery.hook';

export function Header() {
    const { auth, setAuth } = useAuth();
    const { userApi, cartApi } = useApi();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const isMobile = useMediaQuery('(max-width: 1279px)');

    // Fetch cart count
    useEffect(() => {
        const fetchCartCount = async () => {
            if (auth?.user) {
                try {
                    const response = await cartApi.getUserCart(auth.user.user_id);
                    if ('userCart' in response) {
                        setCartCount(response.userCart.length);
                    }
                } catch (error) {
                    console.error('Error fetching cart count:', error);
                }
            } else {
                // For guest users, get count from localStorage
                const guestCart = localStorage.getItem('cart');
                if (guestCart) {
                    try {
                        const cart = JSON.parse(guestCart);
                        setCartCount(cart.productIds?.length || 0);
                    } catch (error) {
                        setCartCount(0);
                    }
                } else {
                    setCartCount(0);
                }
            }
        };

        fetchCartCount();
    }, [auth, cartApi]);

    const handleLogout = async () => {
        try {
            const message = await userApi.logout();
            setAuth(null);
            console.log(message);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full glass shadow-lg">
            <div
                className="container relative mx-auto flex flex-row items-center justify-between px-6 py-4
                mobile-lg:flex-row-reverse mobile-lg:px-4
                "
            >
                {/* Hamburger */}
                <button
                    className="peer relative z-20 hidden
                    bg-primary-50 dark:bg-primary-900 pc-sm:block pc-sm:rounded-full 
                    pc-sm:border-2 pc-sm:border-solid pc-sm:border-primary-400
                    pc-sm:p-2 tablet-md:p-1.5
                    hover:bg-primary-100 dark:hover:bg-primary-800
                    transition-all duration-300"
                >
                    <Hamburger
                        color="#10b981"
                        direction="right"
                        size={24}
                        easing="ease-in"
                        duration={0.21}
                        label="Show menu"
                        toggled={isMenuOpen && isMobile}
                        toggle={setIsMenuOpen}
                    />
                </button>

                {/* Menu */}
                <HamburgerMenu
                    isMenuOpen={isMenuOpen && isMobile}
                    onLinkClick={setIsMenuOpen}
                />

                {/* Logo */}
                <nav className="flex items-center">
                    <Link to="/" className="transition-transform duration-300 hover:scale-105">
                        <img
                            src={logoPNG}
                            alt="yourDukaan logo"
                            className="w-auto object-contain"
                            style={{height: "6rem"}}
                        />
                    </Link>
                </nav>

                {/* Navigation */}
                <nav className="pc-sm:hidden">
                    <ul className="flex flex-row gap-8 items-center">
                        <li>
                            <Link 
                                to="/" 
                                className="nav-link text-lg font-medium"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/products" 
                                className="nav-link text-lg font-medium"
                            >
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/cart" 
                                className="nav-link text-lg font-medium relative"
                            >
                                Cart
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                        {auth?.user && (
                            <li>
                                <Link 
                                    to={`/profile/${auth?.user.user_id}`}
                                    className="nav-link text-lg font-medium"
                                >
                                    Profile
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* Aside (Auth, Theme, Github) */}
                <aside className="mobile-lg:hidden">
                    <menu
                        className="flex flex-row items-center gap-3 font-medium
                        pc-sm:items-start pc-sm:justify-center
                        tablet-md:gap-2 
                        tablet-sm:flex-col tablet-sm:items-center tablet-sm:justify-center tablet-sm:gap-3"
                    >
                        {/* Auth */}
                        {auth?.user ? (
                            <li>
                                <button
                                    className="btn-secondary flex items-center gap-2 px-4 py-2 text-sm
                                    tablet-md:px-3 tablet-md:py-1.5"
                                    onClick={handleLogout}
                                >
                                    <IconLogout className="size-5" />
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/auth"
                                        className="btn-outline flex items-center gap-2 px-4 py-2 text-sm
                                        tablet-md:px-3 tablet-md:py-1.5
                                        tablet-sm:px-4
                                        "
                                    >
                                        <IconLogin className="size-5 tablet-md:size-4" />
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/auth/signup"
                                        className="btn-primary flex items-center gap-2 px-4 py-2 text-sm
                                        tablet-md:px-3 tablet-md:py-1.5"
                                    >
                                        <IconSignup className="size-5 tablet-md:size-4" />
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* Theme */}
                        <li className="hidden pc-sm:hidden">
                            <button className="p-2 rounded-lg bg-background-100 dark:bg-background-800 
                                hover:bg-primary-50 dark:hover:bg-primary-900
                                transition-all duration-300 border-2 border-transparent
                                hover:border-primary-400">
                                <IconTheme
                                    theme="light"
                                    className="size-5"
                                />
                            </button>
                        </li>

                        {/* Github */}
                        <li className="pc-sm:hidden">
                            <Link
                                to="https://github.com/guptaritik2712/yourDukaan"
                                className="p-2 rounded-lg bg-background-100 dark:bg-background-800
                                hover:bg-primary-50 dark:hover:bg-primary-900
                                transition-all duration-300 border-2 border-transparent
                                hover:border-primary-400
                                flex items-center"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconGithub className="size-5" />
                            </Link>
                        </li>
                    </menu>
                </aside>
            </div>
        </header>
    );
}
