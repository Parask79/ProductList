import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ProductList } from './src/ui/productList/index';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <ProductList />;
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
