import {initializeApp } from "firebase/app";

import { GoogleAuthProvider , getAuth ,signInWithPopup} from "firebase/auth";

import {getFirestore , collection, getDocs ,getDoc,doc ,setDoc ,writeBatch}from  "firebase/firestore";
// import {getDatabase }from  "firebase/database";


const firebaseAppConfig = {
    apiKey: "AIzaSyAWVV6dTJIkBIbIF0Rfla4vWjetM-wP59k",
    authDomain: "crwnclothingdb-22737.firebaseapp.com",
    projectId: "crwnclothingdb-22737",
    storageBucket: "crwnclothingdb-22737.appspot.com",
    messagingSenderId: "705505858307",
    appId: "1:705505858307:web:6b80f0d865e5040a9f4f36",
    measurementId: "G-5KVDNYT2JL"
};






//initialize firebase app
const   app =   initializeApp(firebaseAppConfig); 




////GOOGLE AUTHENTICATION

export const auth = getAuth();


const provider = new GoogleAuthProvider();//this is v9's implementation
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters( { "prompt" : "select_account"} );



export const signInWithGoogle =  () => { //ny own function

    try{

        const singInResponse = signInWithPopup(auth , provider);
    
        return singInResponse;

    }catch(error){
         // Handle Errors here.
        const errorCode = error.code;
        
        console.log(errorCode + "errorcode");
        const errorMessage = error.message;
        console.log(errorMessage + "errormessage");
        // The email of the user's account used.
        const emailError = error.email;
        console.log(emailError + "emailError");
        // The AuthCredential type that was used.
        const credentialError = GoogleAuthProvider.credentialFromError(error);
        console.log(credentialError + "credential Error")
    }
}   



/// IMPLEMENTING RETRIEVING FROMMfirestore  database  part
//init firestore 

export const firestoreDatabase = getFirestore(app);
// ({ ignoreUndefinedProperties: true });
//collection Ref 
const collectionRef = collection(firestoreDatabase , "users" );
// const collectionRef = collection(firestoreDatabase , "users" , "gd8QYQx1nYNhAcDAcOqD" , "cartItems");


//get collection data 
getDocs(collectionRef).then((snapShots) => {

    // console.log(snapShots)
    let users = [];

    snapShots.docs.forEach(( doc ) => {
        
        users.push( { ...doc.data(), id : doc.id } )
    })

    // console.log(users);


}).catch(err => {
    console.log(err.message)
})
//ADD COLEE=CTIONS AND DOCUMENTS

export const addCollectionsAndDocuments = async (collectionKey , objectsToAdd) =>  {
    // Get a new write batch
    
        const batch = writeBatch(firestoreDatabase);
// const collectionRef = collection(firestoreDatabase , collectionKey);
        const objTitles  = objectsToAdd.map( obj => obj.title );
        console.log(objectsToAdd)
        console.log(objTitles)
        
        for(let i  = 0 ; i < objectsToAdd.length ; i++){
            const newDocRef = doc(firestoreDatabase,collectionKey,objTitles[i]);
            batch.set(newDocRef,objectsToAdd[i]);
        }

        

        // Commit the batch
        return await batch.commit();



        // Set the value of 'NYC'
        // const nycRef = doc(firestoreDatabase, "cities", "NYC");
        // batch.set(nycRef, {name: "New York City"});

        // Update the population of 'SF'
        // const sfRef = doc(db, "cities", "SF");
        // batch.update(sfRef, {"population": 1000000});

        // Delete the city 'LA'
        // const laRef = doc(db, "cities", "LA");
        // batch.delete(laRef);

        // Commit the batch
        // await batch.commit();

}


export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map( doc => {
        // return doc.data()
        const {title,items} = doc.data();
        
        return {
            routeName:encodeURI(title.toLowerCase()),
            title:title,
            items:items,
            id:doc.id
        }
    });

    console.log(transformedCollection,'transfromed collection');
    return transformedCollection.reduce((accumulator,collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    },{})
}

export const createUserProfileDocument = async ( userAuth , additionalData) => {

    try{
        if(!userAuth){
        return;
       }

    //TO GET A DOCUMENT 

    const userRef = doc( firestoreDatabase ,"users", `${userAuth.uid}`);

    console.log("[userRef]" , userRef);


    const snapShot = await getDoc( userRef );
    console.log("[snapShot]",snapShot);


    //TO GET A COLLECTION
    const collectionRef = collection( firestoreDatabase , `users`)  ;

    console.log("[collectionRef]",collectionRef)

    


    // const collectionSnapshot = await getDocs(collectionRef);

    // console.log("[collectionSnapshot]",collectionSnapshot);

    // console.log("[collectionSnapshot docs]",collectionSnapshot.docs);

    // console.log("[collections]",{collections:collectionSnapshot.docs.map( doc => doc.data() )})

    

    if (!snapShot.empty) {
        const { displayName , email} = userAuth;

        const date = new Date();

        const creationDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

        const createdAt = `${date}`;

        const momentId = date.getTime();
        
        // console.log({ displayName:displayName ,email:email ,createdAt :createdAt , creationDate,momentId ,...additionalData})

        const snapShotData = { 
            displayName:displayName ,
            email:email ,
            createdAt:createdAt , 
            creationDate,momentId ,
            ...additionalData
        }


        await setDoc(userRef , snapShotData);

        console.log("[setDoc DONE!]")
        
            
    }

    return userRef;
    }catch(err ){
        console.error( "failed to [createUserProfileDocument]" , err)

        console.error(" error creating user  " + err.message)
        
    }
    
    //TO GET A COLLECTION

    // const userRef = await getDocs(collection( getFirestore() , `users/fghsgdhfsg/${userAuth.uid}`) ) ;
    // console.log(userRef)

    // const snapShot = userRef.data();
    // console.log(snapShot)
    
    // console.log( await getDocs(collection( getFirestore() , "users/fghsgdhfsg/rtyk") ) );

}




