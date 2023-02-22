import { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import debounce from "lodash.debounce";

import { useRepositoriesStore } from "@/zustand/profile";

const Loading = dynamic(() => import("../components/Loading"));
const Profile = dynamic(() => import("../components/Profile"));

const App = () => {
  const { loading, repositories, getRepositories } = useRepositoriesStore(
    (state) => state
  );
  const [user, setUser] = useState("pahmi1998");

  useEffect(() => {
    getRepositories(user);
  }, []);

  const handleSearch = debounce((value) => {
    if (value.length <= 0) return getRepositories();
    getRepositories(user);
    setUser(value);
  }, 1000);

  const renderContent = useMemo(() => {
    if (loading) return <Loading />;
    if (repositories.length <= 0)
      return (
        <p className="text-center text-2xl text-red-500">
          {user}'s repositories not found
        </p>
      );

    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 pb-20">
        {repositories?.map((item) => (
          <Profile key={item.id} {...item} />
        ))}
      </div>
    );
  }, [loading]);

  return (
    <>
      <div className="py-5 md:flex md:items-center justify-between">
        <h1 className="font-bold text-2xl">{user}'s repositories</h1>
        <input
          class="shadow appearance-none border rounded w-[20rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          autoFocus
          placeholder="Search user"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {renderContent}
    </>
  );
};

export default App;
