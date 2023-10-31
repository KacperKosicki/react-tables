import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './components/pages/Home/Home';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import TablesEdit from './components/features/TablesEdit/TablesEdit';
import { fetchTables } from './redux/tablesRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <main>
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<TablesEdit />} />
      </Routes>
      <Footer />
    </Container>
    </main>
  );
};

export default App;