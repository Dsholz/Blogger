import { firebaseStorage } from "./firebase/firebase";
import { v4 as uuidv4 } from "uuid";

export const generateRandomAvatar = () =>
  `https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg`;

export const getImageUrl = (image) => {
  let imageUrl;
  const storageReference = firebaseStorage
    .ref()
    .child(`Post Images/${uuidv4()}`);

  return storageReference
    .put(image)
    .then(async () => {
      imageUrl = await storageReference.getDownloadURL();
      return imageUrl;
    })
    .catch((err) => {
      console.log(err);
    });
};
