import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Product } from '../../redux/fetchProductThunk';

export const Cards = ({ title, description, thumbnail }: Product) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: thumbnail }}
        resizeMode="contain"
      />

      <View style={styles.footer}>
        <Text style={styles.textTitle} numberOfLines={1}>
          {title}
        </Text>
        {description ? (
          <Text style={styles.textDesc} numberOfLines={2}>
            {description}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    margin: 6,
    height: 200,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
  },
  footer: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  textDesc: {
    fontSize: 12,
    color: '#777',
  },
});
