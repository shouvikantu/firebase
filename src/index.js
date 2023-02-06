import { initializeApp } from "@firebase/app";
import {collection, getDocs, getFirestore, addDoc, deleteDoc, doc} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBK48t3q2JXsupu2LtsoRjuUnDZqHRihLU",
    authDomain: "fir-demo-14978.firebaseapp.com",
    projectId: "fir-demo-14978",
    storageBucket: "fir-demo-14978.appspot.com",
    messagingSenderId: "190344453424",
    appId: "1:190344453424:web:32a90682878f8abb57fcf5"
  };

// initializing the fireapp
initializeApp(firebaseConfig);


//initialize database
  const db = getFirestore()

//collection reference
  const colref = collection(db , 'books');

//get collection
getDocs(colref).then((snapshot)=>{
    let books = []
    snapshot.docs.forEach(doc =>{
        books.push({...doc.data(), id:doc.id})
    })
    console.log(books)
}).catch(err =>{
    console.log(err.message)
})




//adding documents

const addingDoc = document.querySelector('.add') //referencing the html form
addingDoc.addEventListener('submit', e =>{
    e.preventDefault()

    addDoc(colref , {
        title:  addingDoc.title.value,
        author: addingDoc.title.value ,
    }).then(()=>{
        addingDoc.reset()
    })

})


//deletingg documents
const deletingDoc = document.querySelector('.delete') //referencing the form of html
deletingDoc.addEventListener('submit', e=>{
    e.preventDefault()
    const docRef = doc(db, 'books', deletingDoc.id.value)
    deleteDoc(docRef)
    .then(()=>{
        deletingDoc.reset()

})
})