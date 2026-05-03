import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const { pathname } = useLocation();
  const isFullWidth = pathname === '/';

  if (isFullWidth) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-[#EDE6DF] flex items-center justify-center">
      <div className="w-[430px] lg:w-[80%] lg:p-0 rounded-[30px] overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}