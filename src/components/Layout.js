import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#EDE6DF] flex items-center  justify-center">
      <div className="max-w-[800px] w-full p-[20px] bg-[#FAF8F4]">
        <Outlet />
      </div>
    </div>
  );
}