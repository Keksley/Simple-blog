import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { TransformService } from '../services/transform.service';
import { renderPost } from '../templates/post.template';

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this));
    }

    async onShow() {
        this.loader.show();
        const fbData = await apiService.fetchPosts(); //await вставляем так как fetchPosts() вернёт промис и его надо "распаковать"
        const posts = TransformService.fbObjectToArray(fbData);
        const html = posts.map(post => renderPost(post, {withButton: true}))
        this.loader.hide();
        this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
    }
    onHide() {
        this.$el.innerHTML = '';
    }
}

function buttonHandler(event) {
    const $el = event.target;
    const id = $el.dataset.id;
    const title = $el.dataset.title;
    
    if(id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let candidate = favorites.find(f => f.id === id);
        if(candidate) {
            favorites = favorites.filter(f => id !== f.id);
            $el.textContent = 'Сохранить';
            $el.classList.add('button-primary');
            $el.classList.remove('button-danger');
        } else {
            favorites.push({id, title});
            $el.textContent = 'Удалить';
            $el.classList.add('button-danger');
            $el.classList.remove('button-primary');
        }
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}