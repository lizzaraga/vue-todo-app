import Vue from 'vue'
import { createNamespacedHelpers } from 'vuex'

const {mapActions, mapGetters} = createNamespacedHelpers("todo")

export default Vue.extend({
    computed:{
        ...mapGetters(['doneTodos', 'unDoneTodos', 'todos'])
    },
    methods:{
        ...mapActions(['addTodo', 'removeTodo'])
    }
})