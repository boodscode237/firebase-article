import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc, // create and delete
    onSnapshot, // real time get doc
    query, where,
    orderBy, serverTimestamp,
    getDoc, // read
    updateDoc // update doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCcm_tgeTsfrSK3byC2_ybThiXC_Mn98M0",
    authDomain: "fir-article-9083b.firebaseapp.com",
    projectId: "fir-article-9083b",
    storageBucket: "fir-article-9083b.appspot.com",
    messagingSenderId: "149121485260",
    appId: "1:149121485260:web:89cd4f9d2b1e7443163569"
};

initializeApp(firebaseConfig)

// initialize the application
const db = getFirestore()

// collection reference
const colRef = collection(db, 'Projects')

// queries

const q = query(colRef, orderBy('createdAt'))

// getDocs
// getDocs(colRef).then(snapshot => {
//     let projects = []
//     snapshot.docs.forEach((doc) => {
//         projects.push({...doc.data(), id: doc.id})
//     })
//     console.log(projects)
// }).catch((err) => {alert(err.message)})

// adding projects
const addProjectForm = document.querySelector('.add')
addProjectForm.addEventListener('submit', (e) =>{
    e.preventDefault() // to avoid the page to refresh. The default behaviour of submit is refreshing the page
    // addDoc is async and returns a promise that is why we use it with a then() method
    addDoc(colRef, {
        title: addProjectForm.title.value,
        technologies: addProjectForm.technologies.value,
        image: addProjectForm.image.value,
        description: addProjectForm.description.value,
        createdAt: serverTimestamp()
    })
        .then(() => {
            addProjectForm.reset() // to empty the input fields
        })
})

// delete project
/*
* in other to delete a document we need a reference to that document
* */
const deleteProjectForm = document.querySelector('.delete')
deleteProjectForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const docRef = doc(db, "Projects", deleteProjectForm.id.value)

    deleteDoc(docRef).then(() =>{
        deleteProjectForm.reset() // to empty the input fields
    })

})

// The method used up is good but we can notice that if we had
// to render the infos to the front end, we may have need to use some real time listener to that is automatically
// updates on the browser when backend has changes
// to do that

// real time collection data

onSnapshot(q, (snapshot) => {
    let projects = []
    snapshot.docs.forEach((doc) => {
        projects.push({...doc.data(), id: doc.id})
    })
    console.log(projects)
})


// get a single element on the server's side

const docRef = doc(db, 'Projects', 'rX0gwACmPxx6pkpyxOve')

// getDoc(docRef).then((doc) => {
//     console.log(doc.data(), doc.id)
// })

// update a single element in real time
onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector('.update')

updateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db, "Projects", updateForm.id.value)
    updateDoc(docRef, {
        title: 'new title',
    }).then(() => {updateForm.reset()}).catch((err) => {alert(err.message)})
})





