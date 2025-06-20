export class CreateEl {

    static cardElement = null;
    static cardBodyElement = null;

    static createElementsList(actions, href) {
        this.cardElement = document.createElement("div");
        this.cardElement.classList.add('card');

        this.cardBodyElement = document.createElement("div");
        this.cardBodyElement.classList.add('card_body', 'd-flex', 'flex-column');

        const cardTitleElement = document.createElement("div");
        cardTitleElement.classList.add('card_title');
        cardTitleElement.innerText = actions.title;

        const cardActionElement = document.createElement("div");
        cardActionElement.classList.add('card_action', 'd-flex');
        const buttonEditElement = document.createElement("a");
        buttonEditElement.classList.add('btn', 'btn-primary');
        buttonEditElement.innerText = "Редактировать";
        buttonEditElement.setAttribute('href', href + '/edit?id=' + actions.id);  // TODO будет формироваться через id

        const buttonDeleteElement = document.createElement("a");
        buttonDeleteElement.classList.add('btn', 'btn-danger');
        buttonDeleteElement.innerText = 'Удалить';
        buttonDeleteElement.setAttribute('href', href + '/delete?id='+ actions.id);

        cardActionElement.appendChild(buttonEditElement);
        cardActionElement.appendChild(buttonDeleteElement);

        this.cardBodyElement.appendChild(cardTitleElement);
        this.cardBodyElement.appendChild(cardActionElement);
        this.cardElement.appendChild(this.cardBodyElement);

        return this.cardElement;
    }

    static createElementNew(href) {
        this.cardElement = document.createElement("div");
        this.cardElement.classList.add('card', 'card_plus');
        this.cardBodyElement = document.createElement("div");
        this.cardBodyElement.classList.add('card_body', 'd-flex', 'card_plus');
        let bodyPlusElement = document.createElement("a");
        bodyPlusElement.setAttribute('href', href);
        bodyPlusElement.classList.add('card_plus-text');
        bodyPlusElement.innerText = '+';
        this.cardBodyElement.appendChild(bodyPlusElement);
        this.cardElement.appendChild(this.cardBodyElement);
        return this.cardElement;
    }

    static operationCreateOption(path) {


    }


}