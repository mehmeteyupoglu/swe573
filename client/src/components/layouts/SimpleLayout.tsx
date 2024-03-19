import Header from '@/components/template/Header'
import SidePanel from '@/components/template/SidePanel'
import UserDropdown from '@/components/template/UserDropdown'
import HeaderLogo from '@/components/template/HeaderLogo'
import MobileNav from '@/components/template/MobileNav'
import HorizontalNav from '@/components/template/HorizontalNav'
import View from '@/views'
import LanguageSelector from '../template/LanguageSelector'
import ModeSwitcher from '../template/ThemeConfigurator/ModeSwitcher'

const HeaderActionsStart = () => {
    return (
        <>
            <p className="dark:text-sky-50 text-black font-extrabold text-3xl hidden lg:block">
                Communiche
            </p>
            <MobileNav />
        </>
    )
}

const HeaderActionsEnd = () => {
    return (
        <>
            {/* <SidePanel /> */}
            {/* <LanguageSelector /> */}
            <ModeSwitcher />
            <UserDropdown hoverable={false} />
        </>
    )
}

const SimpleLayout = () => {
    return (
        <div className="app-layout-simple flex flex-auto flex-col min-h-screen">
            <div className="flex flex-auto min-w-0">
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        container
                        className="shadow dark:shadow-2xl"
                        headerStart={<HeaderActionsStart />}
                        headerMiddle={<HorizontalNav />}
                        headerEnd={<HeaderActionsEnd />}
                    />
                    <View pageContainerType="contained" />
                </div>
            </div>
        </div>
    )
}

export default SimpleLayout
