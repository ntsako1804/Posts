import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { db } from './firebaseConfig'; // Adjust the path as necessary
import { doc, setDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { serverTimestamp } from 'firebase/firestore'; // Import serverTimestamp


const PostImageScreen = () => {
  const [caption, setCaption] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Set the selected image URI
    }
  };

  const uploadImage = async (imageUri) => {
    try {
      const filename = `image_${Date.now()}.jpg`; // Generate a unique filename
      const storage = getStorage();
      const fileImageRef = ref(storage, `images/${filename}`);

      // Fetch the image as a blob
      const response = await fetch(imageUri);
      const blob = await response.blob(); // Convert the image URI to a Blob

      // Upload the blob to Firebase Storage
      const snapshot = await uploadBytes(fileImageRef, blob);
      console.log('Uploaded a blob or file!', snapshot);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL; // Return the download URL

    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error uploading image, please try again.");
      throw error; // Rethrow the error for handling in submit
    }
  };

  const handleSubmit = async () => {
    if (!imageUri || !caption) {
      Alert.alert("Please select an image and add a caption");
      return;
    }
  
    try {
      const uploadedImageUrl = await uploadImage(imageUri);
  
      const collectionRef = doc(db, "posts", Date.now().toString()); // Update 'yourCollectionName' to 'posts'
      await setDoc(collectionRef, {
        imageUrl: uploadedImageUrl,  // Store the image URL (fixed the key name)
        caption: caption,
        createdAt: serverTimestamp(),  // Add server timestamp
      });
  
      Alert.alert("Post created successfully!");
      setCaption(''); 
      setImageUri(null);
    } catch (error) {
      console.error("Error saving post:", error);
      Alert.alert("Error saving post, please try again.");
    }
  };

  return (
    <View>
      <Button title="Pick an Image" onPress={handleImagePicker} />
      {imageUri && <Text>{`Selected Image: ${imageUri}`}</Text>}
      <TextInput
        placeholder="Add a caption..."
        value={caption}
        onChangeText={setCaption}
      />
      <Button title="Post" onPress={handleSubmit} />
    </View>
  );
};

export default PostImageScreen;
