import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { ThemeProvider } from "./components/ThemeContext";
import { SearchProvider } from "./components/SearchContext";
import Home from "./pages/Home";
import BlogListing from "./pages/BlogListing";
import SinglePost from "./pages/SinglePost";
import About from "./pages/About";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "blog",
        element: <BlogListing />,
      },
      {
        path: "categories",
        element: <BlogListing />, // We use the BlogListing with filters as topics for simplicity in this demo
      },
      {
        path: "blog/:slug",
        element: <SinglePost />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </ThemeProvider>
  );
}

