import { Search, Menu } from "lucide-react";

const Navbar = ({ activeTab, setSearch, setOpenSidebar }) => {
  return (
    <div className="fixed top-0 left-0 md:left-64 right-0 bg-[#0F172A] border-b border-gray-700 px-4 md:px-8 py-4 z-40">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Left */}
        <div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenSidebar(true)}
              className="md:hidden"
            >
              <Menu size={28} className="text-white" />
            </button>

            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {activeTab}
            </h1>
          </div>

          <p className="text-gray-400 text-sm mt-1">
            Manage your daily tasks
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search todos..."
            className="w-full bg-[#1E293B] border border-gray-700 rounded-lg py-3 pl-11 pr-4 text-white outline-none focus:border-blue-500"
          />
        </div>

      </div>
    </div>
  );
};

export default Navbar;