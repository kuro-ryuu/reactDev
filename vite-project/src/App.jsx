import {Route, BrowserRouter, Routes} from 'react-router';
import Layout from './views/Layout';
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';
import Upload from './views/Upload';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Profile />} />
          <Route path="/" element={<Upload />} />
          {/* TODO: add missing routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
