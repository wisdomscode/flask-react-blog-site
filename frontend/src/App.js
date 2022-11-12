import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./componets/Layout";
import LoginForm from "./componets/LoginForm";
import RegisterUserForm from "./componets/RegisterUserForm";
import Users from "./componets/Users";
import Blogs from "./componets/Blogs";
import Home from "./componets/Home";
import CreateArticle from "./componets/CreateArticle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="create_article" element={<CreateArticle />} />
          <Route path="users" element={<Users />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterUserForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
