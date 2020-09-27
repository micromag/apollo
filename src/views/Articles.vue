<template>
<transition name="fade">
<div class="fixed z-10 inset-0 overflow-y-auto" v-if="open">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-600"></div>
    </div>

    <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:bg-gray-900" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-900">
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-headline">
              Delete Article
            </h3>
            <div class="mt-2">
              <p class="text-sm leading-5 text-gray-500 dark:text-gray-300">
                Are you sure you want to delete this article? The article will be permanently removed. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="deleteArticle" v-if="proposed">
            Delete
          </button>
		<button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="deleteArticle" v-else>
            Delete
          </button>
        </span>
        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white dark:bg-gray-800 dark:text-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="closeDelete">
            Cancel
          </button>
        </span>
      </div>
    </div>
  </div>
</div>
</transition>
    <h1 class="text-3xl mb-4 font-semibold">Articles</h1>		
		<div class="bg-white mb-4 shadow-lg dark:bg-gray-800">
			<nav class="flex flex-col sm:flex-row">
				<button class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none" :class="[tab === '1' ? 'text-blue-500 border-b-2 font-medium border-blue-500' : '']" @click="tab = '1'">
					Proposed
				</button>
				
				<button class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none" :class="[tab === '2' ? 'text-blue-500 border-b-2 font-medium border-blue-500' : '']" @click="tab = '2'">
					Submitted
				</button>
			</nav>
		</div>

    	<div id="app" style="overflow-x:auto;">

		<table class="w-full shadow-lg rounded-lg" v-if="tab === '1'">
			<thead class="rounded-lg">
				<tr class="text-left bg-gray-300 border-b border-grey uppercase dark:bg-gray-800 ">
			        <th class="text-sm text-gray-700 px-4 py-6 dark:text-white">Author Name</th>
			        <th class="text-sm text-gray-700 dark:text-white">Article Info</th>
			        <th class="hidden md:table-cell text-sm text-gray-700 dark:text-white">Contact Info</th>
					<th class="hidden md:table-cell text-sm text-gray-700 dark:text-white">Assigned to</th>
					<th class="hidden md:table-cell text-sm text-gray-700 dark:text-white">Status</th>
					<th class="text-sm text-gray-700 dark:text-white">Actions</th>
			        <th></th>
		      	</tr>
			</thead>
	        <tbody class="bg-white dark:bg-gray-700" v-if="proposed && proposed.length > 0">		
		      	<tr class="accordion border-b border-grey-light items-center dark:border-gray-800" v-for="item in proposed" :key="item.id" >
			        <td class="flex inline-flex items-center px-3 py-2">
			        	<span>
			        		 <img
					        class="hidden mr-1 md:mr-2 md:inline-block h-8 w-8 rounded-full object-cover"
					        :src="getAvatar(item.email)"
					        alt=""
					        />
			        	</span>
			        	<span class="py-3">
			        		 <p class="text-gray-800 text-sm dark:text-white">{{item.name}}</p>
							 <p class="text-xs text-gray-500 font-medium">{{item.modified}}</p>
			        	</span>
			        </td>
			        <td class="py-3">
			          <p class="text-sm text-gray-800 font-medium dark:text-white">{{item.title}}</p>
			          <p class="text-xs text-gray-500 font-medium">{{item.type}}</p>
			        </td>
			        <td class="hidden md:table-cell">
			          <p class="text-sm text-gray-700 font-medium dark:text-white">{{item.email}}</p>
			        </td>
					<td class="hidden md:table-cell">
			          <div class="relative inline-flex">
						<svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
						<select class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none dark:text-white dark:bg-gray-700 dark:border-gray-800" @change="updateEditor(item.id, $event, 'proposed_articles')" :value="item.editor">
							<option>Assign Editor</option>
							<option>Joshua Lowe</option>
							<option>Kerry Kidd</option>
						</select>
					  </div>
			        </td>
					<td class="hidden md:table-cell">
			    	  <div class="relative inline-flex">
						<svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
						<select class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none dark:text-white dark:bg-gray-700 dark:border-gray-800" @change="updateStatus(item.id, $event, 'proposed_articles')" :value="item.status">
							<option>Proposed</option>
							<option>Submitted</option>
						</select>
					  </div>
			        </td>
			        <td class="">
						<button class="bg-red-500 mt-2 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-center" @click="openProposedDelete(item.id)">
							<font-awesome-icon  :icon="['fas', 'trash']"/>
						</button>
			        </td>
		      	</tr>
	     </tbody>
	    </table>

		<table class="w-full shadow-lg rounded-lg" v-if="tab === '2'">
			<thead class="rounded-lg">
				<tr class="text-left bg-gray-300 border-b border-grey uppercase dark:bg-gray-800">
			        <th class="text-sm text-gray-700 px-4 py-6 dark:text-white">Author Name</th>
			        <th class="text-sm text-gray-700 dark:text-white">Article Info</th>
			        <th class="hidden md:table-cell text-sm text-gray-700 dark:text-white">Contact Info</th>
					<th class="hidden md:table-cell text-sm text-gray-700 dark:text-white">Assigned to</th>
					<th class="hidden md:table-cell text-sm text-gray-700 dark:text-white">Status</th>
					<th class="text-sm text-gray-700 dark:text-white">Actions</th>
			        <th></th>
		      	</tr>
			</thead>
	        <tbody class="bg-white dark:bg-gray-700" v-if="submitted && submitted.length > 0">		
		      	<tr class="accordion border-b border-grey-light items-center dark:border-gray-800" v-for="item in submitted" :key="item.id" >
			        <td class="flex inline-flex items-center px-3 py-2">
			        	<span>
			        		 <img
					        class="hidden mr-1 md:mr-2 md:inline-block h-8 w-8 rounded-full object-cover"
					        :src="getAvatar(item.email)"
					        alt=""
					        />
			        	</span>
			        	<span class="py-3">
			        		 <p class="text-gray-800 text-sm dark:text-white">{{item.name}}</p>
							 <p class="text-xs text-gray-500 font-medium ">{{item.modified}}</p>
			        	</span>
			        </td>
			        <td class="py-3">
			          <p class="text-sm text-gray-800 font-medium dark:text-white">{{item.title}}</p>
			          <p class="text-xs text-gray-500 font-medium">{{item.type}}</p>
			        </td>
			        <td class="hidden md:table-cell">
			          <p class="text-sm text-gray-700 font-medium dark:text-white">{{item.email}}</p>
			        </td>
					<td class="hidden md:table-cell">
			          <div class="relative inline-flex">
						<svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
						<select class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none dark:text-white dark:bg-gray-700 dark:border-gray-800" @change="updateEditor(item.id, $event, 'submitted_articles')" :value="item.editor">
							<option>Assign Editor</option>
							<option>Joshua Lowe</option>
							<option>Kerry Kidd</option>
						</select>
					  </div>
			        </td>
					<td class="hidden md:table-cell">
			    	  <div class="relative inline-flex">
						<svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
						<select class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none dark:text-white dark:bg-gray-700 dark:border-gray-800" @change="updateStatus(item.id, $event, 'submitted_articles')" :value="item.status">
							<option>Submitted</option>
							<option>Editing</option>
							<option>Edited</option>
							<option>Reviewed</option>
							<option>Published</option>
						</select>
					  </div>
			        </td>
			        <td class="">
						<button class="bg-orange-500 mr-2 hover:bg-orange-700 text-white font-bold py-2 px-3 rounded text-center" @click="editSubmitted(item.id)">
							<font-awesome-icon  :icon="['fas', 'pencil-alt']"/>
						</button>
						
						<button class="bg-red-500 mt-2 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-center" @click="openDelete(item.id)">
							<font-awesome-icon  :icon="['fas', 'trash']"/>
						</button>
			        </td>
		      	</tr>
	     </tbody>
	    </table>
	</div>
</template>

<script lang="ts">
import { db } from '../use/useFirebase'
import { setProposed, proposed, setSubmitted, submitted } from '../use/useFirestore'
import { ref } from 'vue'
import { MD5 } from '../use/md5'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Gravatar from 'vue-gravatar';
import router from '../router/router'

export default {
  name: 'Articles',
  components: {
	  Gravatar,
	  FontAwesomeIcon
  },
  setup() {
	setProposed()
	setSubmitted()

	let dropdown = ref(false)

	let open = ref(false)

	let articleID = ref()

	let proposedDelete = ref(false)

	const updateEditor = (id, event, bucket) => {
		let itemRef = db.collection(bucket).doc(id)
		return itemRef.update({
			editor: event.target.value
		})
	}

	const openDelete = (id) => {
		open.value = true
		proposedDelete.value = false
		articleID.value = id
	}

	const openProposedDelete = (id) => {
		open.value = true
		proposedDelete.value = true
		articleID.value = id
	}

	const closeDelete = (id) => {
		open.value = false
		proposedDelete.value = false
	}

	const getAvatar = (email) => {
		let hash = MD5(email)
		return "https://gravatar.com/avatar/" + hash
	}

	const updateStatus = (id, event, bucket) => {
		let itemRef = db.collection(bucket).doc(id)
		return itemRef.update({
			status: event.target.value
		})
	}

	const editSubmitted = (id) => {
		router.push({path: "/editor/" + id})
	}

	const deleteArticle = () => {
		if (proposedDelete.value === true){
			db.collection("proposed_articles").doc(articleID.value).delete()
		}
		else {
			db.collection("submitted_articles").doc(articleID.value).delete()
		}
		proposedDelete.value = false
		open.value = false
	}

	const deleteSubmitted = (id) => {
		db.collection("submitted_articles").doc(id).delete()
	}
	
	let tab = ref("1")

    return {proposed, tab, updateEditor, updateStatus, dropdown, deleteArticle, getAvatar, submitted, deleteSubmitted, editSubmitted, router, open, articleID, openDelete, closeDelete, openProposedDelete}
  },
}
</script>

