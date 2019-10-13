import firebase from '../services/firestore';

const uplaodImage = async (ImageFiles: Array<File> , firebaseImageMap: string, setSatus: Function) => {
    let imageUrl;
    if (ImageFiles.length === 0) {
        console.error('No Files to upload!');
        setSatus('U heeft geen image meegegeven.')
        return imageUrl = null;
    }
    /* Get file and create file name */
    const file = ImageFiles[0];
    const currentImageName = file.name.substring(0, file.name.length - 4) + '-' + Date.now();
    /* Upload file to firebase */
    await firebase.storage().ref(`${firebaseImageMap}/${currentImageName}`).put(file);
    /* Get filename of the uploaded image */
    await firebase.storage().ref(firebaseImageMap).child(currentImageName).getDownloadURL().then(url => {
        imageUrl = url;
    })
    return imageUrl;
}

export default uplaodImage;