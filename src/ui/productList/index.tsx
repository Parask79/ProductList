import React, { useEffect } from 'react';
import { Text, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { CategoryPicker } from '../components/Picker';
import {
  setSearchTerm,
  setCategoryFilter,
} from '../../redux/slice/productSlice';
import { fetchProduct } from '../../redux/fetchProductThunk';
import { Cards } from '../components/Cards';
import { style } from './style';
import { categories } from '../../constants/categories';

const ITEM_HEIGHT = 200; // Match height of your Cards component

export const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { product, loading, error, searchTerm, categoryFilter, hasMore } =
    useSelector((state: RootState) => state);

  // Filter products locally by searchTerm
  const filteredProducts = product.filter(
    item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Initial load & category change
  useEffect(() => {
    dispatch(
      fetchProduct({
        limit: 10,
        skip: 0,
        category: categoryFilter,
      }),
    );
  }, [dispatch, categoryFilter]);

  // Load more items for infinite scroll
  const loadMore = () => {
    if (!loading && hasMore) {
      dispatch(
        fetchProduct({
          limit: 10,
          skip: product.length,
          category: categoryFilter,
        }),
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* Search Input */}
        <TextInput
          placeholder="Search products..."
          value={searchTerm}
          onChangeText={text => dispatch(setSearchTerm(text))}
          style={style.searchInput}
        />

        <CategoryPicker
          selectedValue={categoryFilter}
          onValueChange={value => dispatch(setCategoryFilter(value))}
          categories={categories}
        />

        {/* Error message */}
        {error && (
          <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
        )}

        {/* Product List */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => <Cards {...item} />}
          numColumns={2}
          // Infinite scroll
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          // Optimizations
          initialNumToRender={6}
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          // Loading footer
          ListFooterComponent={
            loading ? (
              <Text style={{ textAlign: 'center' }}>Loading...</Text>
            ) : null
          }
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};
