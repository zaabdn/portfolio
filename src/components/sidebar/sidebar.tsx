import { Link } from "react-router-dom";
import { dataMenuSidebar } from "@/data/menu";

const Sidebar = () => {
  return (
    <aside
      id="sidebar"
      className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform"
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
        <div
          // href="#"
          className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white"
        >
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            // className="lucide lucide-command"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <span className="ml-3 text-base font-semibold">Zainal Abidin</span>
        </div>
        <ul className="space-y-2 text-sm font-medium">
          {dataMenuSidebar.map((item) => (
            <li key={item.id}>
              <Link
                to={item.id}
                className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
              >
                <item.icon size={28} />
                <span className="ml-3 whitespace-nowrap text-lg">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex">
          <div className="flex w-full justify-between">
            <span className="text-sm font-medium text-black dark:text-white">
              zainal609@gmail.com
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-roledescription="more menu"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              className="h-5 w-5 text-black dark:text-white"
              stroke-linecap="round"
              stroke-linejoin="round"
              // className="lucide lucide-more-horizontal"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
