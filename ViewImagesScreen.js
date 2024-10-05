import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
import { db } from './firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const ViewImagesScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <Text>{item.caption}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  post: { margin: 10, padding: 10, borderWidth: 1 },
  image: { width: '100%', height: 200 },
});

export default ViewImagesScreen;
