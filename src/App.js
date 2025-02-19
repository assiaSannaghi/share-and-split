import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient } from "@tanstack/query-core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";

import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Activities from "./pages/Activities";
import NewGroup from "./pages/NewGroup";
import Balance from "./pages/Balance";
import NewActivity from "./pages/NewActivity";
import { PostProvider } from "./context/PostContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <PostProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="newGroup" element={<NewGroup />} />
            <Route path="newActivity/:groupId" element={<NewActivity />} />
            <Route path="/expenses/:groupId" element={<Activities />} />
            <Route path="/balance/:groupId" element={<Balance />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            margin: "8px",
          }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#fff",
              marginTop: "10px",
            },
          }}
        />
      </PostProvider>
    </QueryClientProvider>
  );
}

export default App;
