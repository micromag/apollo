import { db } from './useFirebase'
import { ref } from 'vue'

export let proposed = ref();
export let submitted = ref();
export let markdownText = ref();
export let editingFile = ref();

export let noProposed = ref();
export let noSubmissions = ref();

export let extras = ref();

export const setProposed = () => {
    let itemList = []
 
    db.collection('proposed_articles').orderBy('created_at', "desc").onSnapshot((snapshot) => {
      itemList = []
      snapshot.forEach((doc) => {
        itemList.push({ id: doc.id, title: doc.data().title, created: doc.data().created_at, name: doc.data().name, email: doc.data().email, type: doc.data().type, age: doc.data().age, editor: doc.data().editor, status: doc.data().status, modified: doc.data().modified  })
        noProposed.value = itemList.length
      })
    
      proposed.value = itemList
      
    })
}

export const setSubmitted = () => {
  let itemList = []

  db.collection('submitted_articles').orderBy('created_at', "desc").onSnapshot((snapshot) => {
    itemList = []
    snapshot.forEach((doc) => {
      itemList.push({ id: doc.id, title: doc.data().title, created: doc.data().created_at, name: doc.data().name, email: doc.data().email, editor: doc.data().editor, status: doc.data().status, modified: doc.data().modified, type: doc.data().type  })
      noSubmissions.value = itemList.length
    })

    submitted.value = itemList
  })
}

export const getText = (firebaseId) => {
  db.collection("submitted_articles").doc(firebaseId)
    .onSnapshot(function(doc) {
        markdownText.value = doc.data().file
        editingFile.value = doc.data().title
    });
}

export const getExtras = (firebaseId) => {
  db.collection("submitted_articles").doc(firebaseId)
    .onSnapshot(function(doc) {
        extras.value = doc.data().link
    });
}