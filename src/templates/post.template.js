export function renderPost(post, options = {}) {
    const tag = post.type === 'news'
    ? 'Новость'
    : 'Заметка';

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const candidate = favorites.find(f => f.id === post.id);
    
    const button = 
    (!candidate)
    ?`<button class="button-round button-small button-primary" data-id="${post.id}" data-title="${post.title}">
        Сохранить
    </button>`
    :`<button class="button-round button-small button-danger" data-id="${post.id}" data-title="${post.title}">
        Удалить
    </button>`

    return `
    <div class="panel">
        <div class="panel-head">
            <p class="panel-title">${post.title}</p>
            <ul class="tags">
            <li class="tag ${tag === 'Новость' ? 'tag-blue' : ''} tag-rounded">${tag}</li>
            </ul>
        </div>
        <div class="panel-body">
            <p class="multi-line">${post.fulltext}</p>
        </div>
        <div class="panel-footer w-panel-footer">
            <small>${post.date}</small>
            ${options.withButton ? button : ''}
        </div>
    </div>
    `
}
