import { storage } from '../../firebaseConfig'
import { Auth } from 'firebase/auth'
import {
    type FirebaseStorage,
    type TaskState,
    getDownloadURL,
    ref as firebaseStorageRef, // to avoid conflict with `ref` import from vue
    uploadBytesResumable,
    uploadBytes,
    listAll,
} from 'firebase/storage'

type UploadFileProps = {
    path: string
    file: Blob | Uint8Array | ArrayBuffer
}
export const uploadFile = async ({ path, file }: UploadFileProps) => {
    // Upload image.
    const imageRef = firebaseStorageRef(storage, `images/${path}`)
    const uploadImage = await uploadBytes(imageRef, file)
    console.log('uploadImage:', JSON.stringify(uploadImage, null, 4))

    // Create file metadata.
    const newMetadata = {
        cacheControl: 'public,max-age=2629800000', // 1 month
        contentType: uploadImage.metadata.contentType,
    }

    //await updateMetadata(imageRef, newMetadata)

    // Get the image URL.
    const publicImageUrl = await getDownloadURL(imageRef)
    return publicImageUrl
}

type UploadLocalFileProps = {
    path: string
    //uri: Blob | Uint8Array | ArrayBuffer
    uri: string
}
export const uploadLocalFile = async ({ path, uri }: UploadLocalFileProps) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob: any = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
            resolve(xhr.response)
        }
        xhr.onerror = function (e) {
            console.log(e)
            reject(new TypeError('Network request failed'))
        }
        xhr.responseType = 'blob'
        xhr.open('GET', uri, true)
        xhr.send(null)
    })

    const fileRef = firebaseStorageRef(storage, path)
    const result = await uploadBytes(fileRef, blob)

    // We're done with the blob, close and release it
    blob.close()

    return await getDownloadURL(fileRef)
}

export const listFiles = async () => {
    // Create a reference under which you want to list
    const listRef = firebaseStorageRef(storage, 'images')

    // Find all the prefixes and items.
    const listResp = await listAll(listRef)
    return listResp.items
}
export const uploadToFirebase = async (uri: any, name: any, onProgress: any) => {
    const fetchResponse = await fetch(uri)
    const theBlob = await fetchResponse.blob()

    const imageRef = firebaseStorageRef(storage, `images/${name}`)

    const uploadTask = uploadBytesResumable(imageRef, theBlob)

    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                onProgress && onProgress(progress)
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error)
                reject(error)
            },
            async () => {
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
                resolve({
                    downloadUrl,
                    metadata: uploadTask.snapshot.metadata,
                })
            }
        )
    })
}
