// To-Do List Component
const TodoList = {
    template: `
    <div>
      <div class="page-header-block">
        <div class="page-kicker">Stay organized</div>
        <h1 class="page-title">My Application Tracker</h1>
        <p class="page-subtitle">
        Keep track of your job applications, interview schedules, and follow-ups. Stay organized and never miss an important deadline.
        </p>
      </div>
      
      <div class="row">
        <div class="col-md-12">
          <div class="todo-container">
            <div class="todo-header">
              <h3>Add New Task</h3>
              <form @submit.prevent="addTodo" class="todo-form">
                <div class="row">
                  <div class="col-md-8">
                    <input 
                      type="text" 
                      class="form-control" 
                      v-model="newTodo.title"
                      placeholder="Task title (e.g., Follow up on TechNova application)"
                      required>
                  </div>
                  <div class="col-md-4">
                    <select class="form-control" v-model="newTodo.priority">
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                </div>
                <div class="row todo-entry-spacing">
                  <div class="col-md-8">
                    <textarea 
                      class="form-control" 
                      v-model="newTodo.description"
                      rows="2"
                      placeholder="Description or notes (optional)"></textarea>
                  </div>
                  <div class="col-md-4">
                    <button type="submit" class="btn btn-primary btn-block">
                      <span class="mdi mdi-plus-circle"></span> Add Task
                    </button>
                  </div>
                </div>
              </form>
            </div>
            
            <div class="todo-filters">
              <button 
                class="btn btn-sm"
                :class="filter === 'all' ? 'btn-primary' : 'btn-default'"
                @click="filter = 'all'">
                All ({{ todos.length }})
              </button>
              <button 
                class="btn btn-sm"
                :class="filter === 'active' ? 'btn-primary' : 'btn-default'"
                @click="filter = 'active'">
                Active ({{ activeTodos.length }})
              </button>
              <button 
                class="btn btn-sm"
                :class="filter === 'completed' ? 'btn-primary' : 'btn-default'"
                @click="filter = 'completed'">
                Completed ({{ completedTodos.length }})
              </button>
            </div>
            
            <div v-if="filteredTodos.length === 0" class="no-todos">
              <span class="mdi mdi-clipboard-check-outline"></span>
              <h3>No tasks found</h3>
              <p v-if="filter === 'all'">Add your first task to get started!</p>
              <p v-else>No {{ filter }} tasks at the moment.</p>
            </div>
            
            <div class="todo-list">
              <div 
                v-for="todo in filteredTodos" 
                :key="todo.id" 
                class="todo-item"
                :class="{ 
                  'completed': todo.completed,
                  'priority-high': todo.priority === 'high',
                  'priority-medium': todo.priority === 'medium',
                  'priority-low': todo.priority === 'low'
                }">
                <div class="todo-checkbox">
                  <input 
                    type="checkbox" 
                    :checked="todo.completed"
                    @change="toggleTodo(todo.id)">
                </div>
                <div class="todo-content" @click="toggleTodo(todo.id)">
                  <h4>{{ todo.title }}</h4>
                  <p v-if="todo.description">{{ todo.description }}</p>
                  <div class="todo-meta">
                    <span class="todo-priority" :class="'priority-' + todo.priority">
                      <span class="mdi mdi-flag"></span> {{ capitalizeFirst(todo.priority) }} Priority
                    </span>
                    <span class="todo-date">
                      <span class="mdi mdi-clock-outline"></span> {{ formatDate(todo.createdAt) }}
                    </span>
                  </div>
                </div>
                <div class="todo-actions">
                  <button 
                    class="btn btn-sm btn-danger" 
                    @click="deleteTodo(todo.id)"
                    title="Delete task">
                    <span class="mdi mdi-trash-can"></span>
                  </button>
                </div>
              </div>
            </div>
            
            <div v-if="todos.length > 0" class="todo-stats">
              <div class="row">
                <div class="col-md-4">
                  <div class="stat-card">
                    <div class="stat-icon tasks">
                      <span class="mdi mdi-format-list-checks"></span>
                    </div>
                    <div class="stat-info">
                      <div class="stat-value">{{ todos.length }}</div>
                      <div class="stat-label">Total Tasks</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="stat-card">
                    <div class="stat-icon completed">
                      <span class="mdi mdi-check-circle"></span>
                    </div>
                    <div class="stat-info">
                      <div class="stat-value">{{ completedTodos.length }}</div>
                      <div class="stat-label">Completed</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="stat-card">
                    <div class="stat-icon priority">
                      <span class="mdi mdi-alert-circle"></span>
                    </div>
                    <div class="stat-info">
                      <div class="stat-value">{{ highPriorityTodos.length }}</div>
                      <div class="stat-label">High Priority</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="completedTodos.length > 0" class="text-center todo-clear">
              <button class="btn btn-warning" @click="clearCompleted">
                <span class="mdi mdi-trash-can-outline"></span> Clear Completed Tasks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    data() {
        return {
            todos: [],
            newTodo: {
                title: '',
                description: '',
                priority: 'medium'
            },
            filter: 'all',
            nextId: 1
        };
    },
    computed: {
        filteredTodos() {
            if (this.filter === 'active') {
                return this.todos.filter(todo => !todo.completed);
            } else if (this.filter === 'completed') {
                return this.todos.filter(todo => todo.completed);
            }
            return this.todos;
        },
        activeTodos() {
            return this.todos.filter(todo => !todo.completed);
        },
        completedTodos() {
            return this.todos.filter(todo => todo.completed);
        },
        highPriorityTodos() {
            return this.todos.filter(todo => todo.priority === 'high' && !todo.completed);
        }
    },
    mounted() {
        // Load todos from localStorage
        const savedTodos = localStorage.getItem('jobPortalTodos');
        if (savedTodos) {
            try {
                const parsed = JSON.parse(savedTodos);
                this.todos = parsed.todos || [];
                this.nextId = parsed.nextId || 1;
            } catch (e) {
                console.error('Error loading todos:', e);
            }
        }
    },
    methods: {
        addTodo() {
            if (this.newTodo.title.trim() === '') {
                return;
            }

            const todo = {
                id: this.nextId++,
                title: this.newTodo.title,
                description: this.newTodo.description,
                priority: this.newTodo.priority,
                completed: false,
                createdAt: new Date().toISOString()
            };

            this.todos.unshift(todo);
            this.saveTodos();

            // Reset form
            this.newTodo = {
                title: '',
                description: '',
                priority: 'medium'
            };
        },
        toggleTodo(id) {
            const todo = this.todos.find(t => t.id === id);
            if (todo) {
                todo.completed = !todo.completed;
                this.saveTodos();
            }
        },
        deleteTodo(id) {
            if (confirm('Are you sure you want to delete this task?')) {
                this.todos = this.todos.filter(t => t.id !== id);
                this.saveTodos();
            }
        },
        clearCompleted() {
            if (confirm(`Remove ${this.completedTodos.length} completed task(s)?`)) {
                this.todos = this.todos.filter(t => !t.completed);
                this.saveTodos();
            }
        },
        saveTodos() {
            localStorage.setItem('jobPortalTodos', JSON.stringify({
                todos: this.todos,
                nextId: this.nextId
            }));
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-AU', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        capitalizeFirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
};
