import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
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
  return <RouterProvider router={router} />;
}
