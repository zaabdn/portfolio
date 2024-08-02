import { dataCareer } from "../../data/careers";

const Career = () => {
  return (
    <section className="w-full max-w-none container p-4 mx-auto bg-white dark:bg-gray-800 ">
      <h2 className="font-heading dark:text-gray-100 mb-8 text-3xl font-bold lg:text-4xl">
        Career
      </h2>

      {dataCareer.map((item, index) => (
        <div className="flex" key={item.id}>
          <div className="mr-4 flex flex-col items-center">
            <div>
              {item.isActive ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900 bg-blue-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-white dark:text-slate-200"
                  >
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-blue-800 dark:text-slate-200"
                  >
                    <path d="M12 5l0 14"></path>
                    <path d="M18 13l-6 6"></path>
                    <path d="M6 13l6 6"></path>
                  </svg>
                </div>
              )}
            </div>
            {dataCareer.length != index + 1 && (
              <div className="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
            )}
          </div>
          <div className="pt-1 pb-8 text-left">
            <p className="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">
              {item.title}
            </p>
            <p className="text-gray-600 dark:text-slate-400">{item.company}</p>
          </div>
        </div>
      ))}

      {/* <div className="flex">
        <div className="mr-4 flex flex-col items-center">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-900 bg-blue-900"></div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Career;
