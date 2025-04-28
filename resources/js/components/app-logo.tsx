import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left ">
                <span className="  text-[20px]  font-semibold">ប្រព័ន្ធគ្រប់គ្រងអវត្តមានសិស្ស</span>
                <p className=' text-gray-300'>Attendance Management System</p>
            </div>
        </>
    );
}
