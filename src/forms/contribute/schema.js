import Input from '../../components/Input.vue'
import Select from '../../components/Select.vue'
const submit = () => { 
    alert("Form submitted!")
}

const schema = { 
    title: "Add Product",
    fields: [
      {type: "Text", name: "name", label: "Full Name", placeholder: "Joe Bloggs", component: Input},
      {type: "Email", name: "email", label: "Email", placeholder: "user@example.com", component: Input},
      {type: "Title", name: "title", label: "What is the title of your article?", placeholder: "Awesome micro:bit Project", component: Input},
      {type: "select", name: "type", label: "What type of article would you like to contribute?", component: Select, options: [{id: "1", title:"News"}, {id: "2", title:"Feature"}, {id: "3", title:"Make"}, {id: "4", title:"Review"}]},    ],
    submitFunction: submit
}

export {
  schema, submit
}